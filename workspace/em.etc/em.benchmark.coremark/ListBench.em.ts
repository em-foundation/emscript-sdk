import '@$$emscript'
export const $U = $declare('MODULE')

import * as Crc from '@em.benchmark.coremark/Crc.em'
import * as Utils from '@em.benchmark.coremark/Utils.em'

export const memsize = $config<u16>()

export class Data extends $struct {
    val: i16
    idx: i16
}

class Elem extends $struct {
    next: $$<Elem>
    data: $$<Data>
}

var data_tab = $table<Data>()
var elem_tab = $table<Elem>()

type Comparator = (a: $$<Data>, b: $$<Data>) => i32

const maxElems = $config<u16>()

let curHead_c = $config<$$<Elem>>()
let curHead: $$<Elem>

export namespace em$meta {
    export function em$construct() {
        let itemSize = 16 + $sizeof<Data>()
        maxElems.$$val = Math.round(memsize / itemSize) - 3
        curHead = elem_tab.$$add()
        curHead.$$.data = data_tab.$$add()
        let p = curHead
        for (let _ of $range(maxElems - 1)) {
            let q = (p.$$.next = elem_tab.$$add())
            q.$$.data = data_tab.$$add()
            p = q
        }
        p.$$.data = data_tab.$$add()
        p.$$.next = elem_tab.$null()
        curHead_c.$$val = curHead
    }
}

//>> ---- em$targ ---- <<//

export function kind(): Utils.Kind {
    return Utils.Kind.LIST
}

export function print() {
    pr(curHead, t$`current`)
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
    for (let i of $range(findCnt)) {
        data.val = <i16>(i & 0xff)
        let elem = find(list, $ref(data))
        list = reverse(list)
        if (!elem) {
            missed += 1
            retval += (<u16>(list.$$.next.$$.data.$$.val >> 8)) & 0x1
        } else {
            found += 1
            if ((<u16>elem.$$.data.$$.val) & 0x1) {
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
    curHead = curHead_c
    let seed = Utils.getSeed(1)
    let ki = 1
    let kd = maxElems - 3
    let e = curHead
    e.$$.data.$$.idx = 0
    e.$$.data.$$.val = 0x8080
    for (e = e.$$.next; e.$$.next != null; e = e.$$.next) {
        let pat = (<u16>(seed ^ kd)) & 0xf
        let dat = (pat << 3) | (kd & 0x7)
        e.$$.data.$$.val = <i16>((dat << 8) | dat)
        kd -= 1
        if (ki < maxElems / 5) {
            e.$$.data.$$.idx = ki++
        } else {
            pat = <u16>(seed ^ ki++)
            e.$$.data.$$.idx = <i16>(0x3fff & (((ki & 0x7) << 8) | pat))
        }
    }
    e.$$.data.$$.idx = 0x7fff
    e.$$.data.$$.val = 0xffff
    curHead = sort(curHead, idxCompare)
}

// private

function find(list: $$<Elem>, data: $$<Data>): $$<Elem> {
    let elem = list
    if (data.$$.idx >= 0) {
        while (elem && elem.$$.data.$$.idx != data.$$.idx) {
            elem = elem.$$.next
        }
    } else {
        while (
            elem &&
            <i16>((<u16>elem.$$.data.$$.val) & 0xff) != data.$$.val
        ) {
            elem = elem.$$.next
        }
    }
    return elem
}

function idxCompare(a: $$<Data>, b: $$<Data>): i32 {
    a.$$.val = <i16>(
        (((<u16>a.$$.val) & 0xff00) | (0x00ff & (<u16>(a.$$.val >> 8))))
    )
    b.$$.val = <i16>(
        (((<u16>b.$$.val) & 0xff00) | (0x00ff & (<u16>(b.$$.val >> 8))))
    )
    return a.$$.idx - b.$$.idx
}

function pr(list: $$<Elem>, name: text_t) {
    let sz = 0
    printf`%s\n[`(name)
    for (let e = list; e != null; e = e.$$.next) {
        let pre = sz++ % 8 == 0 ? t$`\n    ` : t$``
        printf`%s(%04x,%04x)`(pre, e.$$.data.$$.idx, <u16>e.$$.data.$$.val)
    }
    printf`\n], size = %d\n`(sz)
}

function remove(item: $$<Elem>): $$<Elem> {
    let ret = item.$$.next
    let tmp = item.$$.data
    item.$$.data = ret.$$.data
    ret.$$.data = tmp
    item.$$.next = item.$$.next.$$.next
    ret.$$.next = elem_tab.$null()
    return ret
}

function reverse(list: $$<Elem>): $$<Elem> {
    let next = elem_tab.$null()
    while (list) {
        let tmp = list.$$.next
        list.$$.next = next
        next = list
        list = tmp
    }
    return next
}

function sort(list: $$<Elem>, cmp: Comparator): $$<Elem> {
    let insize = <i32>1
    let q: $$<Elem>
    let e: $$<Elem>
    while (true) {
        let p = list
        let tail = (list = elem_tab.$null())
        let nmerges = <i32>0 // count number of merges we do in this pass
        while (p) {
            nmerges++ // there exists a merge to be done
            // step `insize` places along from p
            q = p
            let psize = 0
            for (let _ of $range(insize)) {
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
                } else if (qsize == 0 || !q) {
                    // q is empty; e must come from p.
                    e = p
                    p = p.$$.next
                    psize--
                } else if (cmp(p.$$.data, q.$$.data) <= 0) {
                    // First element of p is lower (or same); e must come from p.
                    e = p
                    p = p.$$.next
                    psize--
                } else {
                    // First element of q is lower; e must come from q.
                    e = q
                    q = q.$$.next
                    qsize--
                }
                // add the next element to the merged list
                if (tail) {
                    tail.$$.next = e
                } else {
                    list = e
                }
                tail = e
            }
            // now p has stepped `insize` places along, and q has too
            p = q
        }
        tail.$$.next = elem_tab.$null()
        // If we have done only one merge, we're finished
        if (nmerges <= 1) break // allow for nmerges==0, the empty list case
        // Otherwise repeat, merging lists twice the size
        insize *= 2
    }
    return list
}

function unremove(removed: $$<Elem>, modified: $$<Elem>) {
    let tmp = removed.$$.data
    removed.$$.data = modified.$$.data
    modified.$$.data = tmp
    removed.$$.next = modified.$$.next
    modified.$$.next = removed
}

// ---- ValComparator ----

import * as Bench0 from '@em.benchmark.coremark/StateBench.em'
import * as Bench1 from '@em.benchmark.coremark/MatrixBench.em'

function valCalc(pval: $$<i16>): i16 {
    let val = <u16>pval.$$
    let optype = (<u8>(val >> 7)) & 1
    if (optype) return <i16>(val & 0x007f)
    let flag = val & 0x7
    let vtype = (val >> 3) & 0xf
    vtype |= vtype << 4
    let ret: u16
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
    Utils.setCrc(
        Utils.Kind.FINAL,
        Crc.add16(<i16>ret, Utils.getCrc(Utils.Kind.FINAL))
    )
    ret &= 0x007f
    pval.$$ = <i16>((val & 0xff00) | 0x0080 | ret) // cache the result
    return <i16>ret
}

function valCompare(a: $$<Data>, b: $$<Data>): i32 {
    let val1 = valCalc($ref(a.$$.val))
    let val2 = valCalc($ref(b.$$.val))
    return val1 - val2
}
