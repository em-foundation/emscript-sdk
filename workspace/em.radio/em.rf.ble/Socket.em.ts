import '@$$emscript'
export const $U = $declare('MODULE')

import * as Dev from '@em.rf.core/Dev.em'
import * as Poller from '@em.mcu/Poller.em'
import * as RadioDriverI from '@em.rf.core/RadioDriverI.em'
import * as Registry from '@em.rf.core/Registry.em'
import * as Types from '@em.rf.ble/Types.em'

export const RadioDriver = $proxy<RadioDriverI.$I>()

export namespace em$meta {
    export function em$construct() {
        RadioDriver.em$meta.bindHandler($cb(radioHandler))
    }
}

//>> ---- em$targ ---- <<//

const ALL_ADV_CHANS = 0x7
const NUM_ADV_CHANS = 3

enum State {
    ADV_PAUSE, ADV_SCAN, CONN, CONN_PAUSE, EXCH, IDLE
}

var rx_buf = $table<u8>()
var tx_buf = $table<u8>()

export namespace em$meta {
    export function em$init() {
        for (const _ of $range(40)) {
            rx_buf.$$add(0)
            tx_buf.$$add(0)
        }
    }
}

var adv_con_flag: bool_t
var adv_count: u16
var adv_inter: u16
var adv_mask: u8
var adv_power: i8
var cur_adv_chan: u8
var cur_state: State = State.IDLE
var recv_done: Dev.RecvDoneFxn

export function recvMsg(on_done: Dev.RecvDoneFxn) {
    recv_done = on_done
    if (cur_state == State.IDLE) {
        const params = Registry.getParams()
        adv_con_flag = params.$$.ble_connectible
        adv_count = params.$$.send_count
        adv_mask = params.$$.ble_adv_chan_mask ? params.$$.ble_adv_chan_mask : ALL_ADV_CHANS
        adv_inter = params.$$.send_interval_ms
        adv_power = params.$$.radio_power
        cur_adv_chan = 0
        setState(State.ADV_PAUSE)
        controller()
    }

}

function controller() {
    while (true) {
        switch (cur_state) {
            case State.ADV_PAUSE: {
                radioOff()
                Poller.pause(adv_inter)
                radioOn()
                setState(State.ADV_SCAN)
                break
            }
            case State.ADV_SCAN: {
                if (cur_adv_chan == NUM_ADV_CHANS) {
                    cur_adv_chan = 0
                    setState(State.ADV_PAUSE)
                    continue
                }
                const idx = cur_adv_chan++
                if (!(adv_mask & (1 << idx))) continue
                doAdvScan(Types.ADV_CHAN + idx)
                return
            }
        }
    }
}

function doAdvScan(chan: u8) {
}

function radioHandler() {
    controller()
}

function radioOff() {
    RadioDriver.disable()
}

function radioOn() {
    RadioDriver.enable()
}

function setState(s: State) {
    cur_state = s
}