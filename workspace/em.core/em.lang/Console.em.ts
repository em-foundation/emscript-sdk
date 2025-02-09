import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Common from '@em.mcu/Common.em'

export function putbuf(buf: frame_t<u8>) {
    for (let p of buf) putch(p.$$)
}

export function putch(ch: u8) {
    Common.ConsoleUart.$$.put(ch)
}

export function puts(sp: ptr_t<u8>) {
    while (sp.$$) {
        putch(sp.$$)
        sp.$inc()
    }
}

export function wrC(data: u8) {
    putch(data)
}

export function wrU8(data: u8) {
    putch(0x81)
    putch(data)
}

export function wrU16(data: u16) {
    putch(0x82)
    let b = <u8>((data >> 8) & 0xFF)
    putch(b)
    b = <u8>((data >> 0) & 0xFF)
    putch(b)
}

export function wrU32(data: u32) {
    putch(0x84)
    let b = <u8>((data >> 24) & 0xFF)
    putch(b)
    b = <u8>((data >> 16) & 0xFF)
    putch(b)
    b = <u8>((data >> 8) & 0xFF)
    putch(b)
    b = <u8>((data >> 0) & 0xFF)
    putch(b)
}

// private

e$`static inline void wr(em::u8 data) { wrU8(data); }`
e$`static inline void wr(em::i8 data) { wrU8((em::u8)data); }`
e$`static inline void wr(em::u16 data) { wrU16(data); }`
e$`static inline void wr(em::i16 data) { wrU16((em::u16)data); }`
e$`static inline void wr(em::u32 data) { wrU32(data); }`
e$`static inline void wr(em::i32 data) { wrU32((em::u32)data); }`

const Args = $array($u32(), 6)
const NumBuf = $array($u8(), 10)

function c2d(ch: u8): u8 { return ch - c$`0` }

function formatNum(buf: frame_t<u8>, num: u32, base: u8, width: i8, pad: u8): frame_t<u8> {
    let HEXDIGS = t$`0123456789ABCDEF`
    let idx = buf.$len
    for (; ;) {
        width -= 1
        idx -= 1
        buf[idx] = HEXDIGS[(num % base)]
        num /= base
        if (num == 0) break
    }
    while (width > 0) {
        width -= 1
        idx -= 1
        buf[idx] = pad
    }
    return buf.$frame(idx, 0)
}

function isDigit(ch: u8): bool_t {
    return ch >= c$`0` && ch <= c$`9`
}

export function print(fmt: text_t, a1: arg_t = 0, a2: arg_t = 0, a3: arg_t = 0, a4: arg_t = 0, a5: arg_t = 0, a6: arg_t = 0) {
    let args = Args.$make()
    let num_buf = NumBuf.$make()
    args[0] = <u32>a1
    args[1] = <u32>a2
    args[2] = <u32>a3
    args[3] = <u32>a4
    args[4] = <u32>a5
    args[5] = <u32>a6
    let argp = args.$ptr()
    let idx = 0
    while (idx < fmt.$len) {
        let width = 0
        let pad = c$` `
        let ch = fmt[idx++]
        if (ch != c$`%`) {
            putch(ch)
            continue
        }
        ch = fmt[idx++]
        if (ch == c$`0`) {
            pad = ch
            ch = fmt[idx++]
        }
        while (isDigit(ch)) {
            width = width * 10 + c2d(ch)
            ch = fmt[idx++]
        }
        if (ch == c$`d`) {
            let dn = <i32>argp.$$
            argp.$inc()
            if (dn < 0) {
                putch(c$`-`)
                dn = -dn
            }
            let nb = formatNum(num_buf, <u32>dn, 10, width, pad)
            putbuf(nb)
        }
        else if (ch == c$`x`) {
            let xn = <u32>argp.$$
            argp.$inc()
            let nb = formatNum(num_buf, xn, 16, width, pad)
            putbuf(nb)
        }
        else if (ch == c$`c`) {
            let cn = argp.$$
            argp.$inc()
            putch(cn)
        }
        else if (ch == c$`s`) {
            let sp = <ptr_t<u8>><unknown>argp.$$
            argp.$inc()
            puts(sp)
        }
        else {
            putch(ch)
        }
    }
}
