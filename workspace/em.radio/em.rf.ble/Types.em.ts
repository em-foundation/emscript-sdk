import '@$$emscript'
export const $U = $declare('MODULE')

import * as Dev from '@em.rf.core/Dev.em'

export const ADV_CHAN = 37
export const ADV_CHAN_MAX = 39

export const ADV_IND = 0x00
export const ADV_DIRECT_IND = 0x01
export const ADV_NONCONN_IND = 0x02
export const ADV_SCAN_REQ = 0x03
export const ADV_SCAN_RSP = 0x04
export const ADV_CONNECT_IND = 0x05
export const ADV_SCAN_IND = 0x06
export const ADV_EXT_IND = 0x07

export const MAN_ID_LO = 0x4C
export const MAN_ID_HI = 0x0B

export class AdvHdr extends $struct {
    advType: u8
    pduLen: u8
    advA: Dev.Addr
    flagsLen: u8
    flagsCode: u8
    flagsVal: u8
    manLen: u8
    manCode: u8
    manIdLo: u8
    manIdHi: u8
    // addData: (ptr: ptr_t<u8>, len: u8) => void
    init: (advType: u8) => void
    // isMine: () => bool_t
}

const ADV_LEG_INIT = $config<AdvHdr>()

export namespace em$meta {
    export function em$construct() {
        ADV_LEG_INIT.$$val.flagsLen = 2
        ADV_LEG_INIT.$$val.flagsCode = 0x1
        ADV_LEG_INIT.$$val.flagsVal = 0x6 // BR_EDR_NOT_SUPPORTED | LE_GENERAL_DISC_MODE
        ADV_LEG_INIT.$$val.manLen = 3
        ADV_LEG_INIT.$$val.manCode = 0xff
        ADV_LEG_INIT.$$val.manIdLo = MAN_ID_LO
        ADV_LEG_INIT.$$val.manIdHi = MAN_ID_HI
        ADV_LEG_INIT.$$val.advA[0] = 0xaa
        ADV_LEG_INIT.$$val.advA[1] = 0xaa
        ADV_LEG_INIT.$$val.advA[2] = 0xbb
        ADV_LEG_INIT.$$val.advA[3] = 0xbb
        ADV_LEG_INIT.$$val.advA[4] = 0xcc
        ADV_LEG_INIT.$$val.advA[5] = 0xcc
    }
}

//>> ---- em$targ ---- <<//

function AdvHdr__init(self: $$<AdvHdr>, adv_type: u8): void {
    const src = $ref(ADV_LEG_INIT)
    e$`memcpy(self, src, sizeof (AdvHdr))`
    self.$$.advType = adv_type
}

var adv_hdr: AdvHdr

export function em$run() {
    adv_hdr.init(ADV_IND)
    printf`%x\n`(adv_hdr.advA[2])
}