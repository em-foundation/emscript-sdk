import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Crc from '@em.bench.coremark/Crc.em'
import * as Utils from '@em.bench.coremark/Utils.em'

export const memsize = $config<u16>(0)

type matdat_t = i16
type matres_t = i32

const dimN = $config<u8>(0)

var matA = $table<matdat_t>('rw')
var matB = $table<matdat_t>('rw')
var matC = $table<matres_t>('rw')

export namespace em$meta {

    export function em$construct() {
        let i = 0
        let j = 0
        while (j < memsize.$$) {
            i += 1
            j = i * i * 2 * 4
        }
        dimN.$$ = i - 1
        for (let i = 0; i < dimN.$$ * dimN.$$; i++) {
            matA.$add(0)
            matB.$add(0)
            matC.$add(0)
        }
    }
}

export function kind(): Utils.Kind {
    return Utils.Kind.MATRIX
}

export function print() {
    prDat(t$`A`, matA.$frame(0))
    prDat(t$`B`, matB.$frame(0))
    prRes(t$`C`)
}

export function run(arg: arg_t): Utils.sum_t {
    let crc = <Crc.sum_t>0
    let val = <matdat_t>arg
    let clipval = enlarge(val)
    //
    addVal(val)
    mulVal(val)
    crc = Crc.add16(sumDat(clipval), crc)
    //
    mulVec()
    crc = Crc.add16(sumDat(clipval), crc)
    //
    mulMat()
    crc = Crc.add16(sumDat(clipval), crc)
    //
    mulMatBix()
    crc = Crc.add16(sumDat(clipval), crc)
    //
    addVal(-val)
    return Crc.add16(<i16>crc, Utils.getCrc(Utils.Kind.FINAL))
}

export function setup() {
    let s32 = <u32>Utils.getSeed(1) | (<u32>Utils.getSeed(2) << 16)
    let sd = <matdat_t>s32
    if (sd == 0) sd = 1
    let order = <matdat_t>1
    for (let i = 0; i < dimN.$$; i++) {
        for (let j = 0; j < dimN.$$; j++) {
            sd = <matdat_t>((order * sd) % 65536)
            let val = <matdat_t>(sd + order)
            val = clip(val, false)
            matB[i * dimN.$$ + j] = val
            val += order
            val = clip(val, true)
            matA[i * dimN.$$ + j] = val
            order += 1
        }
    }
}

// private

function addVal(val: matdat_t) {
    for (let i = 0; i < dimN.$$; i++) {
        for (let j = 0; j < dimN.$$; j++) {
            matA[i * dimN.$$ + j] += val
        }
    }
}

function bix(res: matres_t, lower: u8, upper: u8): matres_t {
    let r = <u32>res
    let l = <u32>lower
    let u = <u32>upper
    return <matres_t>((r >> l) & (~(0xffffffff << u)))
}

function clip(d: matdat_t, b: bool_t): matdat_t {
    let x = <u16>d
    return <matdat_t>(x & (b ? 0x0ff : 0x0ffff))
}

function enlarge(val: matdat_t): matdat_t {
    let v = <u16>val
    return <matdat_t>(0xf000 | v)
}

function mulVal(val: matdat_t) {
    for (let i = 0; i < dimN.$$; i++) {
        for (let j = 0; j < dimN.$$; j++) {
            matC[i * dimN.$$ + j] = <matres_t>(matA[i * dimN.$$ + j]) * <matres_t>val
        }
    }
}

function mulMat() {
    for (let i = 0; i < dimN.$$; i++) {
        for (let j = 0; j < dimN.$$; j++) {
            matC[i * dimN.$$ + j] = 0
            for (let k = 0; k < dimN.$$; k++) {
                matC[i * dimN.$$ + j] += <matres_t>matA[i * dimN.$$ + k] * <matres_t>matB[k * dimN.$$ + j]
            }
        }
    }
}

function mulMatBix() {
    for (let i = 0; i < dimN.$$; i++) {
        for (let j = 0; j < dimN.$$; j++) {
            matC[i * dimN.$$ + j] = 0
            for (let k = 0; k < dimN.$$; k++) {
                let tmp = <matres_t>matA[i * dimN.$$ + k] * <matres_t>matB[k * dimN.$$ + j]
                matC[i * dimN.$$ + j] += bix(tmp, 2, 4) * bix(tmp, 5, 7)
            }
        }
    }
}

function mulVec() {
    for (let i = 0; i < dimN.$$; i++) {
        matC[i] = 0
        for (let j = 0; j < dimN.$$; j++) {
            matC[i] += <matres_t>matA[i * dimN.$$ + j] * <matres_t>matB[j]
        }
    }
}

function prDat(lab: text_t, mat: frame_t<matdat_t>) {
    printf`\n%s:\n    `(lab)
    for (let i = 0; i < dimN.$$; i++) {
        let sep = t$``
        for (let j = 0; j < dimN.$$; j++) {
            printf`%s%d`(sep, mat[i * dimN.$$ + j])
            sep = t$`,`
        }
        printf`\n    `()
    }
}

function prRes(lab: text_t) {
    printf`\n%s:\n    `(lab)
    for (let i = 0; i < dimN.$$; i++) {
        let sep = t$``
        for (let j = 0; j < dimN.$$; j++) {
            printf`%s%d`(sep, matC[i * dimN.$$ + j])
            sep = t$`,`
        }
        printf`\n    `()
    }
}


function sumDat(clipval: matdat_t): matdat_t {
    let cur = <matres_t>0
    let prev = <matres_t>0
    let tmp = <matres_t>0
    let ret = <matdat_t>0
    for (let i = 0; i < dimN.$$; i++) {
        for (let j = 0; j < dimN.$$; j++) {
            cur = matC[i * dimN.$$ + j]
            tmp += cur
            if (tmp > clipval) {
                ret += 10
                tmp = 0
            }
            else {
                ret += (cur > prev) ? 1 : 0
            }
            prev = cur
        }
    }
    return ret
}
