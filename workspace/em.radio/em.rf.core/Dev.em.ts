import '@$$emscript'
export const $U = $declare('MODULE')

export const ADDR_SIZE = 6

export class Addr extends $vector<u8> { $len = ADDR_SIZE }

export enum ConnectionStatus {
    ACTIVE, CLOSED, HANGUP, OPENING, RESTART, TIMEOUT
}

export enum Modulation {
    NONE, BLE_1M, PROP_1M, PROP_250K,
}

export type BufPtr = ptr_t<u8>
export type Profile = cb_t<[$$<Params>]>
export type Train = cb_t<[BufPtr, $$<BufPtr>]>

export class Params extends $struct {
    // bleAccAdr: u32
    ble_adv_chan_mask: u8
    ble_connectible: bool_t
    // bleCrcInit: u32
    // bleEnable: bool_t
    // bleExchBuf: BufPtr
    // bleExchEndMs: u16
    // bleTrain: Train
    // radioAckProf: Profile
    // radioAlign256: u16
    // radioChannel: u8
    // radioModulation: Modulation
    // radioNextProf: Profile
    radio_power: i8
    // radioRssiFloor: i8
    // radioTimestamp: bool_t
    // radioWhiten: bool_t
    // recvSniffMs: u16
    // recvStartMs: u16
    // recvTimeoutMs: u32
    send_count: u16
    // sendLbtFlag: bool_t
    // sendHailMs: u16
    send_interval_ms: u16
    // sendStartMs: u16
    // sendStartWindowMs: u16
}

export type RecvDoneFxn = cb_t<[ConnectionStatus]>
export type SendDoneFxn = cb_t<[]>


export namespace em$meta { }

//>> ---- em$targ ---- <<//