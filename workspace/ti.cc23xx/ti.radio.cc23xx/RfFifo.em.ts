import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@ti.distro.cc23xx/REGS.em'

import * as Common from '@em.mcu/Common.em'

export namespace em$meta { }

//>> ---- em$targ ---- <<//

export function prepareRX() {
    $R.LRFDPBE.FCMD.$$ = $R.LRFDPBE_FCMD_DATA_RXFIFO_RESET >> $R.LRFDPBE_FCMD_DATA_S
    let rxcfg = $R.LRFDPBE.FCFG0.$$
    rxcfg &= ~(<u32>($R.LRFDPBE_FCFG0_RXADEAL_M | $R.LRFDPBE_FCFG0_RXACOM_M))
    $R.LRFDPBE.FCFG0.$$ = rxcfg
    $R.LRFDPBE.RXFSRP.$$ = 256
}

export function prepareTX() {
    $R.LRFDPBE.FCMD.$$ = ($R.LRFDPBE_FCMD_DATA_TXFIFO_RESET >> $R.LRFDPBE_FCMD_DATA_S)
    let txcfg = $R.LRFDPBE.FCFG0.$$
    txcfg &= ~(<u32>$R.LRFDPBE_FCFG0_TXADEAL_M)
    txcfg |= $R.LRFDPBE_FCFG0_TXACOM_M
    $R.LRFDPBE.FCFG0.$$ = txcfg
}

export function readPkt(pkt: frame_t<u8>): u8 {
    let addr = <u32>($R.LRFD_BUFRAM_BASE + <u32>(($R.LRFDPBE.FCFG3.$$ << 2)))
    var word = $reg32[addr]
    // printf`w = %08x\n`(word)
    addr += 4
    word = $reg32[addr]
    // printf`w = %08x\n`(word)
    addr += 4
    word >>= 16
    // TODO: per-PHY length field
    const sz = <u8>(word & 0xff) + 1
    // printf`h = %04x, sz = %d\n`(word, sz)
    let cnt: u8 = 2
    for (const i of $range(sz)) {
        if (cnt == 0) {
            cnt = 4
            word = $reg32[addr]
            // em.print("w[{d}] = {x:0>8}\n", .{ i, word })
            addr += 4
        }
        pkt[i] = <u8>(word & 0xff)
        word >>= 8
        cnt -= 1
    }
    return sz
}



export function writePkt(pkt: frame_t<u8>) {
    prepareTX()
    const sz = <u8>pkt.$len
    let word = <u32>(0x02030000 | (sz + 4))
    let addr = <u32>($R.LRFD_BUFRAM_BASE + ($R.LRFDPBE.FCFG1.$$ << 2))
    $reg32[addr] = word
    // printf`[%08x] = %08x\n`(addr, word)
    addr += 4
    word = <u32>0x00000001
    let mask: u32 = 0x00ff0000
    let shift: u8 = 16
    for (const b of pkt) {
        if (mask == 0) {
            mask = 0x000000ff
            shift = 0
            $reg32[addr] = word
            // printf`[%08x] = %08x\n`(addr, word)
            addr += 4
            word = 0x00000000
        }
        word = (word & ~mask) | (<u32>b.$$ << shift)
        mask <<= 8
        shift += 8
    }
    $reg32[addr] = word
    // printf`[%08x] = %08x\n`(addr, word)
    writeFifoPtr(addr + 4, ($R.LRFDPBE_BASE + $R.LRFDPBE_O_TXFWP))

}

function writeFifoPtr(value: u32, regAddr: u32) {
    const key = Common.GlobalInterrupts.disable()
    $reg16[$R.LRFD_BUFRAM_BASE + $R.PBE_COMMON_RAM_O_FIFOCMDADD] = <u16>((($R.LRFDPBE_BASE + $R.LRFDPBE_O_FSTAT) & 0x0FFF) >> 2)
    // delay
    $reg16[$R.LRFD_BUFRAM_BASE + $R.PBE_COMMON_RAM_O_FIFOCMDADD]
    $reg16[$R.LRFD_BUFRAM_BASE + $R.PBE_COMMON_RAM_O_FIFOCMDADD]
    $reg32[regAddr] = value
    $reg16[$R.LRFD_BUFRAM_BASE + $R.PBE_COMMON_RAM_O_FIFOCMDADD] = <u16>((($R.LRFDPBE_BASE + $R.LRFDPBE_O_FCMD) & 0x0FFF) >> 2)
    Common.GlobalInterrupts.restore(key)
}
