import * as Path from 'path'
import * as Fs from 'fs'

import em from '../../em.core/em.lang/emscript'

const INST_MAP = new Map<string, [number]>([
    ['LGPT', [3]],
    ['UART', [0]]
])

let meta = em.$outfile('REGS.em.ts')
let targ = em.$outfile('REGS.hpp.txt')

meta.addText(`import em from '@$$emscript'\n`)
meta.addText(`export const $U = em.$declare('COMPOSITE')\n`)
meta.addText(`
export function em$generate() {
    let out = $outfile('ti.distro.cc23xx/REGS.hpp')
    out.addFile('../ti.cc23xx/ti.distro.cc23xx/REGS.hpp.txt')
    out.close()
}
`)

targ.addText('#ifndef __REGS_M\n')
targ.addText('#define __REGS_M\n\n')
targ.addText('#include "../../ti.cc23xx/ti.distro.cc23xx/inc/cc23x0r5.h"\n')
targ.addText('#include "../../em.core/em.arch.arm/inc/core_cm0plus.h"\n')
targ.addText('#include "../../ti.cc23xx/ti.distro.cc23xx/driverlib/hapi.h"\n')
targ.addText('#include "../../ti.cc23xx/ti.distro.cc23xx/inc/hw_memmap.h"\n\n')

for (const file of Fs.readdirSync('./inc')) {
    targ.addText(`#include "../../ti.cc23xx/ti.distro.cc23xx/inc/${file}"\n`)
    let in_type = false
    let tname = ''
    const src_lines = Fs.readFileSync(`inc/${file}`, 'utf-8').split('\n')
    for (const ln of src_lines) {
        const m = ln.match(/^#define (\w+)\s+(\w+)/)
        if (m == null) continue
        let segs = m[1].split('_O_')
        if (segs.length < 2) {
            if (in_type) {
                in_type = false
                meta.print('%-}\n')
            }
            continue
        }
        if (!in_type) {
            in_type = true
            tname = segs[0]
            meta.genTitle(`${tname} TYPE`)
            meta.print('export interface %1_t {\n%+', segs[0])
        }
        meta.print('%t%1: $Reg // offset %2\n', segs[1], m[2])
    }
    for (const ln of src_lines) {
        const m = ln.match(/^#define (\w+)\s+(\w+)/)
        if (m == null) continue
        meta.print("export const %1: any = '%2'\n", m[1], m[2])
    }
    if (!tname) continue
    meta.genTitle(`${tname} INSTANCES`)
    const id_arr = INST_MAP.get(tname)
    if (id_arr) {
        for (const id of id_arr) {
            meta.print('export const %1%2 = { } as %1_t\n', tname, id)
        }
    } else {
        meta.print('export const %1 = { } as %1_t\n', tname)
    }
}
targ.addText('\n#endif\n')
meta.close()
targ.close()
