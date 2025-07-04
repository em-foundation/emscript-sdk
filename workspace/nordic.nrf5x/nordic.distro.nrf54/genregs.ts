import * as Path from 'path'
import * as Fs from 'fs'

import em from '../../em.core/em.lang/emscript'

const TYPE_SET = new Set<string>([
    'CLOCK',
    'FICR',
    'GPIO',
    'GPIOTE',
    'GRTC',
    'MEMCONF',
    'POWER',
    'RADIO',
    'RRAMC',
    'REGULATORS',
    'RESET',
    'TAMPC',
    'TIMER',
    'UART',
    'UARTE',
])
const INSTS = [
    ['CLOCK', 'CLOCK'],
    ['FICR', 'FICR'],
    ['GPIOTE20', 'GPIOTE'],
    ['GRTC', 'GRTC'],
    ['MEMCONF', 'MEMCONF'],
    ['POWER', 'POWER'],
    ['P0', 'GPIO'],
    ['P1', 'GPIO'],
    ['P2', 'GPIO'],
    ['RADIO', 'RADIO'],
    ['RRAMC', 'RRAMC'],
    ['REGULATORS', 'REGULATORS'],
    ['RESET', 'RESET'],
    ['TAMPC', 'TAMPC'],
    ['TIMER20', 'TIMER'],
    ['UARTE30', 'UARTE'],
]
const INDICIES = [
    ['P', 'GPIO'],
]

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
        const m = ln.match(/==== Struct (\w+)/)
        if (m === null) continue
        let base = m[1]
        const k = base.indexOf('_')
        if (k > 0) {
            base = base.substring(0, k)
        }
        if (TYPE_SET.has(base)) {
            return m[1]
        }
    }
}

// ---- main ---- //

let src_lines = Fs.readFileSync('inc/nrf54l05_types.h', 'utf-8').split('\n')
let cur_idx = 0

meta.addText(`import em from '@$$emscript'\n`)
meta.addText(`export const $U = em.$declare('COMPOSITE')\n`)
meta.addText(`
export function em$generate() {
    let out = $outfile('nordic.distro.nrf54/REGS.hpp')
    out.addFile('../nordic.nrf5x/nordic.distro.nrf54/REGS.hpp.txt')
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
cur_idx = 0
meta.genTitle('CONSTANTS')
genConsts()
meta.genTitle('INSTANCES')
for (const [iname, itype] of INSTS) {
    meta.print('export const %1 = {} as %2_t\n', iname, itype)
}
meta.genTitle('INDICIES')
for (const [iname, itype] of INDICIES) {
    meta.print('export const %1 = [] as %2_t[]\n', iname, itype)
}
meta.close()
