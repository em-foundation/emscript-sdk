import * as Path from 'path'
import * as Fs from 'fs'
import * as Xml2Js from 'xml2js'

import em from '@$$emscript'

let instArr: Array<any>

let meta = em.$outfile('REGS.em.ts')
let targ = em.$outfile('REGS.hpp.txt')

function genModule(xfile: string): void {
    const modName = Path.basename(xfile, '.xml')
    targ.print(
        '#include "../../ti.cc23xx/ti.distro.cc23xx/inc/hw_%1.h"\n',
        modName.toLowerCase()
    )
    meta.genTitle(`MODULE ${modName}`)
    const mod = readXmlFile(xfile).module
    const regArr = mod.register as Array<any>
    meta.print('export interface %1_t {\n%+', modName)
    regArr.forEach((r) => {
        const reg = r.$
        meta.print('%t%1: em.$Reg\n', reg.id)
    })
    meta.print('%-}\n')
    regArr.forEach((r) => {
        const reg = r.$
        const fldArr = r.bitfield as Array<any>
        meta.genTitle(`REGISTER ${reg.id}`)
        meta.addText('/**\n')
        const desc = reg.description as string
        meta.addText(desc.replace('\n', '\n\n'))
        meta.addText('*/\n')
        fldArr.forEach((f) => {
            const fld = f.$
            meta.addText('/**\n')
            const desc = fld.description as string
            meta.addText(desc.replace('\n', '\n\n'))
            meta.addText('*/\n')
            const fldLab = `${modName}_${reg.id}_${fld.id}`
            meta.print("export const %1: any = '%2'\n", fldLab, fld.width)
            meta.print("export const %1_M: any = '%2'\n", fldLab, fld.width)
            meta.print("export const %1_S: any = '%2'\n", fldLab, fld.width)
            const enmArr = f.bitenum as Array<any>
            if (enmArr === undefined) return
            enmArr.forEach((e) => {
                const enm = e.$
                meta.addText('/**\n')
                const desc = enm.description as string
                meta.addText(desc.replace('\n', '\n\n'))
                meta.addText('*/\n')
                meta.print(
                    "export const %1_%2: any = '%3'\n\n",
                    fldLab,
                    enm.id,
                    enm.value
                )
            })
        })
    })
}

function readXmlFile(xfile: string): any {
    let xml
    Xml2Js.parseString(Fs.readFileSync(xfile).toString(), (err, res) => {
        xml = res
    })
    return xml
}

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
Fs.readdirSync('./xml').forEach((f) => genModule(`./xml/${f}`))
targ.addText('\n#endif\n')
meta.genTitle('INSTANCES')
const dev = readXmlFile('./device.xml').device
instArr = dev.router[0].subpath[0].cpu[0].instance as Array<any>
instArr.forEach((m) => {
    const instId = m.$.id as string
    const instType = Path.basename(m.$.xml as string, '.xml')
    if (Fs.existsSync(`./xml/${instType}.xml`)) {
        meta.print('export const %1 = { } as %2_t\n', instId, instType)
    }
})
meta.addText('\n')
meta.close()
targ.close()
