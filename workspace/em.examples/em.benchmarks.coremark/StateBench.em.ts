import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Crc from '@em.bench.coremark/Crc.em'
import * as Utils from '@em.bench.coremark/Utils.em'

export const memsize = $config<u16>(0)

const NUM_STATES = 8

enum State {
    START,
    INVALID,
    S1,
    S2,
    INT,
    FLOAT,
    EXPONENT,
    SCIENTIFIC,
}

const intPat = $table<text_t>('ro')
const fltPat = $table<text_t>('ro')
const sciPat = $table<text_t>('ro')
const errPat = $table<text_t>('ro')

const intPatLen = $config<u16>(0)
const fltPatLen = $config<u16>(0)
const sciPatLen = $config<u16>(0)
const errPatLen = $config<u16>(0)

const StateCnt = $array($u32(), NUM_STATES)

let membuf = $table<u8>('rw')

export namespace em$meta {
    export function em$init() {
        intPat.$add(t$`5012`)
        intPat.$add(t$`1234`)
        intPat.$add(t$`-874`)
        intPat.$add(t$`+122`)
        intPatLen.$$ = intPat[0].$len
        //
        fltPat.$add(t$`35.54400`)
        fltPat.$add(t$`.1234500`)
        fltPat.$add(t$`-110.700`)
        fltPat.$add(t$`+0.64400`)
        fltPatLen.$$ = fltPat[0].$len
        //
        sciPat.$add(t$`5.500e+3`)
        sciPat.$add(t$`-.123e-2`)
        sciPat.$add(t$`-87e+832`)
        sciPat.$add(t$`+0.6e-12`)
        sciPatLen.$$ = sciPat[0].$len
        //
        errPat.$add(t$`T0.3e-1F`)
        errPat.$add(t$`-T.T++Tq`)
        errPat.$add(t$`1T3.4e4z`)
        errPat.$add(t$`34.0e-T^`)
        errPatLen.$$ = errPat[0].$len
    }

    export function em$construct() {
        for (let _ of $range(memsize.$$)) membuf.$add(0)
    }
}

function isDigit(ch: u8): bool_t {
    return ch >= c$`0` && ch <= c$`9`
}

export function kind(): Utils.Kind {
    return Utils.Kind.STATE
}

function nextState(pStr: ref_t<ptr_t<u8>>, transCnt: index_t<u32>): State {
    let str = pStr.$$
    let state = <State>State.START
    for (; str.$$ && state != State.INVALID; str.$inc()) {
        let ch = str.$$
        if (ch == c$`,`) {
            str.$inc()
            break
        }
        switch (state) {
            case State.START:
                if (isDigit(ch)) {
                    state = State.INT
                } else if (ch == c$`+` || ch == c$`-`) {
                    state = State.S1
                } else if (ch == c$`.`) {
                    state = State.FLOAT
                } else {
                    state = State.INVALID
                    transCnt[ord(State.INVALID)] += 1
                }
                transCnt[ord(State.START)] += 1
                break
            case State.S1:
                if (isDigit(ch)) {
                    state = State.INT
                    transCnt[ord(State.S1)] += 1
                } else if (ch == c$`.`) {
                    state = State.FLOAT
                    transCnt[ord(State.S1)] += 1
                } else {
                    state = State.INVALID
                    transCnt[ord(State.S1)] += 1
                }
                break
            case State.INT:
                if (ch == c$`.`) {
                    state = State.FLOAT
                    transCnt[ord(State.INT)] += 1
                } else if (!isDigit(ch)) {
                    state = State.INVALID
                    transCnt[ord(State.INT)] += 1
                }
                break
            case State.FLOAT:
                if (ch == c$`E` || ch == c$`e`) {
                    state = State.S2
                    transCnt[ord(State.FLOAT)] += 1
                } else if (!isDigit(ch)) {
                    state = State.INVALID
                    transCnt[ord(State.FLOAT)] += 1
                }
                break
            case State.S2:
                if (ch == c$`+` || ch == c$`-`) {
                    state = State.EXPONENT
                    transCnt[ord(State.S2)] += 1
                } else {
                    state = State.INVALID
                    transCnt[ord(State.S2)] += 1
                }
                break
            case State.EXPONENT:
                if (isDigit(ch)) {
                    state = State.SCIENTIFIC
                    transCnt[ord(State.EXPONENT)] += 1
                } else {
                    state = State.INVALID
                    transCnt[ord(State.EXPONENT)] += 1
                }
                break
            case State.SCIENTIFIC:
                if (!isDigit(ch)) {
                    state = State.INVALID
                    transCnt[ord(State.INVALID)] += 1
                }
                break
        }
    }
    pStr.$$ = str
    return state
}

function ord(state: State): u8 {
    return <u8>state
}

export function print() {
    let p = membuf.$ptr()
    let cnt = 0
    printf`\n%c`(c$`"`)
    while (p.$$) {
        if (cnt++ % 8 == 0) {
            printf`\n    `()
        }
        while (true) {
            let c = p.$$
            p.$inc()
            if (c == c$`,`) break
            printf`%c`(c)
        }
        printf`, `()
    }
    printf`\n%c, count = %d\n`(c$`"`, cnt)
}

export function run(arg: i16): Utils.sum_t {
    if (arg < 0x22) arg = 0x22
    let finalCnt = StateCnt.$make()
    let transCnt = StateCnt.$make()
    for (let i of $range(NUM_STATES)) finalCnt[i] = transCnt[i] = 0
    scan(finalCnt, transCnt)
    scramble(Utils.getSeed(1), arg)
    scan(finalCnt, transCnt)
    scramble(Utils.getSeed(2), arg)
    let crc = Utils.getCrc(Utils.Kind.FINAL)
    for (let i of $range(NUM_STATES)) {
        crc = Crc.addU32(finalCnt[i], crc)
        crc = Crc.addU32(transCnt[i], crc)
    }
    return crc
}

function scan(finalCnt: index_t<u32>, transCnt: index_t<u32>) {
    let str = membuf.$ptr()
    let cnt = <u32>0
    while (str.$$) {
        let state = nextState($ref(str), transCnt)
        cnt += 1
        finalCnt[ord(state)] += 1
    }
}

function scramble(seed: Utils.seed_t, step: u32) {
    for (let idx = 0; idx < memsize.$$; idx += step) {
        // TODO: use $range
        if (membuf[idx] != c$`,`) membuf[idx] ^= <u8>seed
    }
}

export function setup() {
    let seed = Utils.getSeed(1)
    let p = membuf.$ptr()
    let total = 0
    let pat = t$``
    let plen = 0
    while (total + plen + 1 < memsize.$$ - 1) {
        if (plen) {
            for (let i of $range(plen)) {
                p.$$ = pat[i]
                p.$inc()
            }
            p.$$ = c$`,`
            p.$inc()
            total += plen + 1
        }
        switch (++seed & 0x7) {
            case 0:
            case 1:
            case 2:
                pat = intPat[(seed >> 3) & 0x3]
                plen = intPatLen.$$
                break
            case 3:
            case 4:
                pat = fltPat[(seed >> 3) & 0x3]
                plen = fltPatLen.$$
                break
            case 5:
            case 6:
                pat = sciPat[(seed >> 3) & 0x3]
                plen = sciPatLen.$$
                break
            case 7:
                pat = errPat[(seed >> 3) & 0x3]
                plen = errPatLen.$$
                break
        }
    }
}
