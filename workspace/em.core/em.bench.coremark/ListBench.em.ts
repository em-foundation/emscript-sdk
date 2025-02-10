import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Crc from '@em.bench.coremark/Crc.em'
import * as Utils from '@em.bench.coremark/Utils.em'

export const memsize = $config<u16>(666)

export class Data extends $struct {
    val: i16
    idx: i16
}
let DataFac = $factory(Data.$make())

class Elem extends $struct {
    next: ref_t<Elem>
    data: ref_t<Data>
}
let ElemFac = $factory(Elem.$make())

type Comparator = (a: ref_t<Data>, b: ref_t<Data>) => i32

const maxElems = $config<u16>(0)

let curHead_c = $config<ref_t<Elem>>()
var curHead: ref_t<Elem>

export namespace em$meta {

    export function em$construct() {
        let itemSize = 16 + $sizeof<Data>()
        maxElems.$$ = Math.round(memsize.$$ / itemSize) - 3
        curHead = ElemFac.$create()
        curHead.$$.data = DataFac.$create()
        let p = curHead
        for (let i = 0; i < maxElems.$$ - 1; i++) {
            let q = p.$$.next = ElemFac.$create()
            q.$$.data = DataFac.$create()
            p = q
        }
        p.$$.data = DataFac.$create()
        p.$$.next = ElemFac.$null()
        curHead_c.$$ = curHead
    }

}

function find(list: ref_t<Elem>, data: ref_t<Data>): ref_t<Elem> {
    let elem = list
    if (data.$$.idx >= 0) {
        while (elem && elem.$$.data.$$.idx != data.$$.idx) {
            elem = elem.$$.next
        }
    }
    else {
        while (elem && <i16>(<u16>elem.$$.data.$$.val & 0xff) != data.$$.val) {
            elem = elem.$$.next
        }
    }
    return elem
}

function idxCompare(a: ref_t<Data>, b: ref_t<Data>): i32 {
    a.$$.val = <i16>((<u16>a.$$.val & 0xff00) | (0x00ff & <u16>(a.$$.val >> 8)))
    b.$$.val = <i16>((<u16>b.$$.val & 0xff00) | (0x00ff & <u16>(b.$$.val >> 8)))
    return a.$$.idx - b.$$.idx
}

export function kind(): Utils.Kind {
    return Utils.Kind.LIST
}

function pr(list: ref_t<Elem>, name: text_t) {
    let sz = 0
    printf`%s\n[`(name)
    for (let e = list; e != null; e = e.$$.next) {
        let pre = (sz++ % 8) == 0 ? t$`\n    ` : t$``
        printf`%s(%04x,%04x)`(pre, e.$$.data.$$.idx, <u16>e.$$.data.$$.val)
    }
    printf`\n], size = %d\n`(sz)
}

export function print() {
    pr(curHead, t$`current`)
}

function remove(item: ref_t<Elem>): ref_t<Elem> {
    let ret = item.$$.next
    let tmp = item.$$.data
    item.$$.data = ret.$$.data
    ret.$$.data = tmp
    item.$$.next = item.$$.next.$$.next
    ret.$$.next = ElemFac.$null()
    return ret
}

function reverse(list: ref_t<Elem>): ref_t<Elem> {
    let next = ElemFac.$null()
    while (list) {
        let tmp = list.$$.next
        list.$$.next = next
        next = list
        list = tmp
    }
    return next
}


export function run(arg: i16): Utils.sum_t {
    let list = curHead
    let finderIdx = <i16>arg
    let findCnt = Utils.getSeed(3)
    let found = <u16>0
    let missed = <u16>0
    let retval = <Crc.sum_t>0
    let data = Data.$make()
    data.idx = finderIdx
    for (let i = 0; i < findCnt; i++) {
        data.val = <i16>(i & 0xff)
        let elem = find(list, $ref(data))
        list = reverse(list)
        if (!elem) {
            missed += 1
            retval += <u16>(list.$$.next.$$.data.$$.val >> 8) & 0x1
        }
        else {
            found += 1
            if (<u16>elem.$$.data.$$.val & 0x1) {
                retval += (<u16>(elem.$$.data.$$.val >> 9)) & 0x1
            }
            if (elem.$$.next) {
                let tmp = elem.$$.next
                elem.$$.next = tmp.$$.next
                tmp.$$.next = list.$$.next
                list.$$.next = tmp
            }
        }
        if (data.idx >= 0) data.idx += 1
    }
    retval += found * 4 - missed
    if (finderIdx > 0) list = sort(list, valCompare)
    let remover = remove(list.$$.next)
    let finder = find(list, $ref(data))
    if (!finder) finder = list.$$.next
    while (finder) {
        retval = Crc.add16(list.$$.data.$$.val, retval)
        finder = finder.$$.next
    }
    unremove(remover, list.$$.next)
    list = sort(list, idxCompare)
    for (let e = list.$$.next; e; e = e.$$.next) {
        retval = Crc.add16(list.$$.data.$$.val, retval)
    }
    return retval
}

export function setup() {
    curHead = curHead_c.$$
    let seed = Utils.getSeed(1)
    let ki = 1
    let kd = maxElems.$$ - 3
    let e = curHead
    e.$$.data.$$.idx = 0
    e.$$.data.$$.val = 0x8080
    for (e = e.$$.next; e.$$.next != null; e = e.$$.next) {
        let pat = <u16>(seed ^ kd) & 0xf
        let dat = (pat << 3) | (kd & 0x7)
        e.$$.data.$$.val = <i16>((dat << 8) | dat)
        kd -= 1
        if (ki < (maxElems.$$ / 5)) {
            e.$$.data.$$.idx = ki++
        }
        else {
            pat = <u16>(seed ^ ki++)
            e.$$.data.$$.idx = <i16>(0x3fff & (((ki & 0x7) << 8) | pat))
        }
    }
    e.$$.data.$$.idx = 0x7fff
    e.$$.data.$$.val = 0xffff
    curHead = sort(curHead, idxCompare)
}

function sort(list: ref_t<Elem>, cmp: Comparator): ref_t<Elem> {
    let insize = <i32>1
    let q: ref_t<Elem>
    let e: ref_t<Elem>
    for (; ;) {
        let p = list
        let tail = list = ElemFac.$null()
        let nmerges = <i32>0  // count number of merges we do in this pass
        while (p) {
            nmerges++  // there exists a merge to be done
            // step `insize` places along from p
            q = p
            let psize = 0
            for (let i = 0; i < insize; i++) {
                psize++
                q = q.$$.next
                if (!q) break
            }
            // if q hasn't fallen off end, we have two lists to merge
            let qsize = insize
            // now we have two lists; merge them
            while (psize > 0 || (qsize > 0 && q)) {
                // decide whether next element of merge comes from p or q
                if (psize == 0) {
                    // p is empty; e must come from q
                    e = q
                    q = q.$$.next
                    qsize--
                }
                else if (qsize == 0 || !q) {
                    // q is empty; e must come from p.
                    e = p
                    p = p.$$.next
                    psize--
                }
                else if (cmp(p.$$.data, q.$$.data) <= 0) {
                    // First element of p is lower (or same); e must come from p.
                    e = p
                    p = p.$$.next
                    psize--
                }
                else {
                    // First element of q is lower; e must come from q.
                    e = q
                    q = q.$$.next
                    qsize--
                }
                // add the next element to the merged list
                if (tail) {
                    tail.$$.next = e
                }
                else {
                    list = e
                }
                tail = e
            }
            // now p has stepped `insize` places along, and q has too
            p = q
        }
        tail.$$.next = ElemFac.$null()
        // If we have done only one merge, we're finished
        if (nmerges <= 1) break  // allow for nmerges==0, the empty list case
        // Otherwise repeat, merging lists twice the size
        insize *= 2
    }
    return list
}

function unremove(removed: ref_t<Elem>, modified: ref_t<Elem>) {
    let tmp = removed.$$.data
    removed.$$.data = modified.$$.data
    modified.$$.data = tmp
    removed.$$.next = modified.$$.next
    modified.$$.next = removed
}

// ---- ValComparator ----

import * as Bench0 from '@em.bench.coremark/StateBench.em'
import * as Bench1 from '@em.bench.coremark/MatrixBench.em'

function valCalc(pval: ref_t<i16>): i16 {
    let val = <u16>pval.$$
    let optype = <u8>(val >> 7) & 1
    if (optype) return <i16>(val & 0x007f)
    let flag = val & 0x7
    let vtype = (val >> 3) & 0xf
    vtype |= vtype << 4
    var ret: u16
    switch (flag) {
        case 0:
            ret = Bench0.run(<i16>vtype)
            Utils.bindCrc(Bench0.kind(), ret)
            break
        case 1:
            ret = Bench1.run(<i16>vtype)
            Utils.bindCrc(Bench1.kind(), ret)
            break
        default:
            ret = val
            break
    }
    let newcrc = Crc.add16(<i16>ret, Utils.getCrc(Utils.Kind.FINAL))
    Utils.setCrc(Utils.Kind.FINAL, Crc.add16(<i16>ret, Utils.getCrc(Utils.Kind.FINAL)))
    ret &= 0x007f
    pval.$$ = <i16>((val & 0xff00) | 0x0080 | ret)   // cache the result
    return <i16>ret
}

function valCompare(a: ref_t<Data>, b: ref_t<Data>): i32 {
    let val1 = valCalc($ref(a.$$.val))
    let val2 = valCalc($ref(b.$$.val))
    return val1 - val2
}
