import * as Path from 'path'
import * as Fs from 'fs'

import em from '../../em.core/em.lang/emscript'

const TYPE_MAP = new Map<string, string>([
    ['CLOCK', 'CLOCK'],
    ['GPIOTE', 'GPIOTE'],
    ['NVMC', 'NVMC'],
    ['P0', 'GPIO'],
    ['POWER', 'POWER'],
    ['RADIO', 'RADIO'],
    ['RTC0', 'RTC'],
    ['TIMER0', 'TIMER'],
    ['UART0', 'UART'],
    ['UICR', 'UICR'],
])

const TYPE_SET = new Set<string>(TYPE_MAP.values())

let meta = em.$outfile('REGS.em.ts')

function genConsts() {
    while (true) {
        const ln = nextLine()
        if (ln === null) break
        const m = ln.match(/\s*#define\s+(\w+)\s+\((.+?)\)/)
        if (!m) continue
        let base = m[1]
        const k = base.indexOf('_')
        if (k > 0) {
            base = base.substring(0, k)
        }
        if (!TYPE_SET.has(base)) continue
        meta.print("export const %1: any = '%2'\n", m[1], m[2])
    }
}

function nextLine(): string | null {
    return cur_idx == src_lines.length ? null : src_lines[cur_idx++]
}

function scanFields(): Array<[string, string, string]> {
    let res = new Array<[string, string, string]>()
    while (true) {
        const ln = nextLine()
        if (ln?.match(/\s*typedef struct/) || ln?.startsWith('  struct')) {
            break
        }
    }
    while (true) {
        const ln = nextLine()
        if (ln?.match(/\s*}/)) {
            break
        }
        const m = ln?.match(/(\w+)\s+(\w+)\s+(\w+)(\[(\d+)\])?;/)
        if (!m) continue
        const fname = m[3]
        const ftype = (m[2] == 'uint32_t') ? '$Reg' : m[2].replace('NRF_', '').replace('_Type', '_t')
        const fdim = m[5] ?? ''
        res.push([fname, ftype, fdim])
    }
    return res
}

function scanStruct(): string | null {
    while (true) {
        const ln = nextLine()
        if (ln === null) return null
        let m = ln.match(/====\s+(\w+)/)
        if (m === null) {
            m = ln.match(/\@brief\s+(\w+).+\(Unspecified\)/)
            if (m === null) continue
        }
        const tk = m![1]
        if (TYPE_MAP.has(tk)) {
            return TYPE_MAP.get(tk)!
        }
        let base = tk
        const k = tk.indexOf('_')
        if (k > 0) {
            base = tk.substring(0, k)
        }
        if (TYPE_SET.has(base)) {
            console.log(ln)
            return tk
        }
    }
}

// ---- main ---- //

let src_lines = Fs.readFileSync('inc/nrf52.h', 'utf-8').split('\n')
let cur_idx = 0

meta.addText(`import em from '@$$emscript'\n`)
meta.addText(`export const $U = em.$declare('COMPOSITE')\n`)
meta.addText(`
export function em$generate() {
    let out = $outfile('nordic.distro.nrf52/REGS.hpp')
    out.addFile('../nordic.nrf5x/nordic.distro.nrf52/REGS.hpp.txt')
    out.close()
}
`)

while (true) {
    const sname = scanStruct()
    if (sname === null) break
    meta.genTitle(sname)
    meta.print('export interface %1_t {\n%+', sname)
    for (const [fname, ftype, fdim] of scanFields()) {
        if (fdim) {
            meta.print('%t%1: dim_t<%2, %3>\n', fname, ftype, fdim)

        } else {
            meta.print('%t%1: %2\n', fname, ftype)
        }
    }
    meta.print('%-}\n')
}
src_lines = Fs.readFileSync('inc/nrf52_bitfields.h', 'utf-8').split('\n')
cur_idx = 0
meta.genTitle('CONSTANTS')
genConsts()
meta.genTitle('INSTANCES')
for (const [ti, tn] of TYPE_MAP) {
    meta.print('export const %1 = {} as %2_t\n', ti, tn)
}
// meta.genTitle('INDICIES')
// for (const [iname, itype] of INDICIES) {
//     meta.print('export const %1 = [] as %2_t[]\n', iname, itype)
// }
meta.close()
