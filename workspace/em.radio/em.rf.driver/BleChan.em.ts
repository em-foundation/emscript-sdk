import em from '@$$emscript'
export const $U = em.$declare('MODULE')

const chan_off_map = $table<u8>('ro', 40)

export namespace em$meta {
    export function em$construct() {
        const BASE = 4
        const SPACE = 2
        for (const ch of $range(0, 11)) chan_off_map[ch] = BASE + (ch * SPACE)
        for (const ch of $range(11, 37)) chan_off_map[ch] = BASE + (ch * SPACE) + SPACE
        chan_off_map[37] = 2
        chan_off_map[38] = 26
        chan_off_map[39] = 80
    }
}

//>> ---- em$targ ---- <<//

export function getFreqOff(chan: u8): u8 {
    return chan_off_map[chan]
}