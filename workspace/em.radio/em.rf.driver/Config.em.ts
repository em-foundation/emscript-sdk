import '@$$emscript'
export const $U = $declare('MODULE')

export enum Phy {
    NONE, BLE_1M, PROP_1M, PROP_250K,
}

export const phy = $config<Phy>(Phy.NONE)
export const tx_pwr = $config<i8>(0)

//>> ---- em$targ ---- <<//

export function getPhy(): Phy {
    return phy
}

export function getTxPwr(): i8 {
    return tx_pwr
}
