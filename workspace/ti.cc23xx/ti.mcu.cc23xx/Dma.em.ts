import '@$$emscript'
export const $U = $declare('MODULE')

export const MODE_STOP = 0x00000000
export const MODE_BASIC = 0x00000001
export const MODE_AUTO = 0x00000002
export const MODE_PINGPONG = 0x00000003
export const MODE_MEM_SCATTER_GATHER = 0x00000004
export const MODE_PER_SCATTER_GATHER = 0x00000006
export const MODE_M = 0x00000007 // uDMA Transfer Mode
export const MODE_ALT_SELECT = 0x00000001


export const DST_INC_8 = 0x00000000
export const DST_INC_16 = 0x40000000
export const DST_INC_32 = 0x80000000
export const DST_INC_NONE = 0xC0000000
export const DST_INC_M = 0xC0000000 // Destination Address Increment
export const DST_INC_S = 30
export const SRC_INC_8 = 0x00000000
export const SRC_INC_16 = 0x04000000
export const SRC_INC_32 = 0x08000000
export const SRC_INC_NONE = 0x0c000000
export const SRC_INC_M = 0x0C000000 // Source Address Increment
export const SRC_INC_S = 26
export const SIZE_8 = 0x00000000
export const SIZE_16 = 0x11000000
export const SIZE_32 = 0x22000000
export const SIZE_M = 0x33000000 // Data Size
export const SIZE_S = 24
export const ARB_1 = 0x00000000
export const ARB_2 = 0x00004000
export const ARB_4 = 0x00008000
export const ARB_8 = 0x0000c000
export const ARB_16 = 0x00010000
export const ARB_32 = 0x00014000
export const ARB_64 = 0x00018000
export const ARB_128 = 0x0001c000
export const ARB_256 = 0x00020000
export const ARB_512 = 0x00024000
export const ARB_1024 = 0x00028000
export const ARB_M = 0x0003C000 // Arbitration Size
export const ARB_S = 14
export const NEXT_USEBURST = 0x00000008
export const XFER_SIZE_MAX = 1024
export const XFER_SIZE_M = 0x00003FF0 // Transfer size
export const XFER_SIZE_S = 4

export namespace em$meta { }

//>> ---- em$targ ---- <<//