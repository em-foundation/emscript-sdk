import em from '@$$emscript'
export const $U = em.$declare('MODULE')

export enum Phy {
    NONE, BLE_1M, PROP_1M, PROP_250K,
}

export const phy = $config<Phy>()
export const tx_pwr = $config<i8>()

export namespace em$meta {
    export function em$init() {
        phy.$$ = Phy.NONE
        tx_pwr.$$ = 0
    }
}

//>> ---- em$targ ---- <<//

export function getPhy(): Phy {
    return phy.$$
}

export function getTxPwr(): i8 {
    return tx_pwr.$$
}
