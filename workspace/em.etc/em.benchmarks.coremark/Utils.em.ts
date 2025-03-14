import em from '@$$emscript'
export const $U = em.$declare('MODULE')

export const NUM_SEEDS = 5

export enum Kind {
    FINAL,
    LIST,
    MATRIX,
    STATE,
    ZZZ_,
}

export type seed_t = em.u16
export type sum_t = em.u16

let crc_tab = $table<sum_t>('rw')
const seed_tab = $table<seed_t>('ro')

export namespace em$meta {
    export function em$init() {
        for (let _ of $range(Kind.ZZZ_)) crc_tab.$add(0)
        for (let _ of $range(NUM_SEEDS)) seed_tab.$add(0)
    }

    export function bindSeed(idx: u8, val: seed_t) {
        seed_tab[idx - 1] = val
    }
}

export function bindCrc(kind: Kind, crc: sum_t) {
    if (crc_tab[kind] == 0) crc_tab[kind] = crc
}

export function getCrc(kind: Kind): sum_t {
    return crc_tab[kind]
}

export function getSeed(idx: u8): seed_t {
    let seed: volatile_t<seed_t> = seed_tab[idx - 1]
    return seed
}

export function setCrc(kind: Kind, crc: sum_t) {
    crc_tab[kind] = crc
}
