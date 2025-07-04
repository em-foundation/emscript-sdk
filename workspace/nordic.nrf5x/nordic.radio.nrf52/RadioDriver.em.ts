import '@$$emscript'
export const $U = $declare('MODULE', RadioDriverI)

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as BleChan from '@em.rf.driver/BleChan.em'
import * as Common from '@em.mcu/Common.em'
import * as Config from '@em.rf.driver/Config.em'
import * as HfXtal from '@nordic.mcu.nrf52/HfXtal.em'
import * as Idle from '@nordic.mcu.nrf52/Idle.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as RadioDriverI from '@em.rf.core/RadioDriverI.em'

enum State {
    IDLE, SETUP, READY, RX, TX, CS, CW
}

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('RADIO')
    }
}

//>> ---- em$targ ---- <<//

var cur_state: volatile_t<State> = State.IDLE

export function em$startup() {
    HfXtal.start()
}

export function disable() {
    IntrVec.NVIC_disable(e$`RADIO_IRQn`)
    $R.RADIO.TASKS_DISABLE.$$ = 1
    HfXtal.stop()
    setState(State.IDLE)
}

export function enable() {
    switch (Config.getPhy()) {
        case Config.Phy.PROP_1M: {
            $R.RADIO.MODE.$$ = $R.RADIO_MODE_MODE_Nrf_1Mbit
            $R.RADIO.PCNF0.$$ = (8 << $R.RADIO_PCNF0_LFLEN_Pos)
            $R.RADIO.PCNF1.$$ = (240 << $R.RADIO_PCNF1_MAXLEN_Pos) | (3 << $R.RADIO_PCNF1_BALEN_Pos) | $R.RADIO_PCNF1_WHITEEN_Msk
            $R.RADIO.BASE0.$$ = 0xAAAABBBB
            $R.RADIO.PREFIX0.$$ = 0xCC
            break
        }
        case Config.Phy.BLE_1M: {
            $R.RADIO.MODE.$$ = $R.RADIO_MODE_MODE_Ble_1Mbit
            // $R.RADIO.PCNF0.$$ = (8 << $R.RADIO_PCNF0_LFLEN_Pos) | (1 << $R.RADIO_PCNF0_S0LEN_Pos) | $R.RADIO_PCNF0_S1INCL_Msk
            $R.RADIO.PCNF0.$$ = (8 << $R.RADIO_PCNF0_LFLEN_Pos) | (1 << $R.RADIO_PCNF0_S0LEN_Pos)
            $R.RADIO.PCNF1.$$ = (37 << $R.RADIO_PCNF1_MAXLEN_Pos) | (3 << $R.RADIO_PCNF1_BALEN_Pos) | $R.RADIO_PCNF1_WHITEEN_Msk
            $R.RADIO.BASE0.$$ = 0x89bed600
            $R.RADIO.PREFIX0.$$ = 0x8e
            $R.RADIO.CRCCNF.$$ = (3 << $R.RADIO_CRCCNF_LEN_Pos) | $R.RADIO_CRCCNF_SKIPADDR_Msk
            $R.RADIO.CRCPOLY.$$ = 0x65b
            $R.RADIO.CRCINIT.$$ = 0x555555
            break
        }
        default: fail()
    }
    $R.RADIO.SHORTS.$$ = $R.RADIO_SHORTS_READY_START_Msk | $R.RADIO_SHORTS_END_DISABLE_Msk
    // Common.BusyWait.wait(10) // TODO: needed for SRAM setup
    HfXtal.wait()
    setState(State.READY)
}

function setState(s: State) {
    // $['%%c:'](s)
    cur_state = s
}

export function startCw(chan: u8, power: i8) {
    setState(State.CW)
    $R.RADIO.TXPOWER.$$ = $R.RADIO_TXPOWER_TXPOWER_Pos4dBm
    $R.RADIO.FREQUENCY.$$ = 40
    $R.RADIO.TASKS_TXEN.$$ = 1
}

export function startRx(pkt: frame_t<u8>, chan: u8) {
    setState(State.RX)
    $R.RADIO.PACKETPTR.$$ = <u32>(e$`&pkt[0]`)
    $R.RADIO.FREQUENCY.$$ = BleChan.getFreqOff(chan)
    $R.RADIO.DATAWHITEIV.$$ = chan
    $R.RADIO.RXADDRESSES.$$ = $R.RADIO_RXADDRESSES_ADDR0_Msk
    $R.RADIO.INTENSET.$$ = $R.RADIO_INTENSET_END_Msk
    $R.RADIO.TASKS_RXEN.$$ = 1
    IntrVec.NVIC_enable(e$`RADIO_IRQn`)
}

export function startTx(pkt: frame_t<u8>, chan: u8) {
    setState(State.TX)
    $R.RADIO.PACKETPTR.$$ = <u32>(e$`&pkt[0]`)
    $R.RADIO.TXPOWER.$$ = $R.RADIO_TXPOWER_TXPOWER_0dBm
    $R.RADIO.FREQUENCY.$$ = BleChan.getFreqOff(chan)
    $R.RADIO.DATAWHITEIV.$$ = chan
    $R.RADIO.TXADDRESS.$$ = 0
    $R.RADIO.INTENSET.$$ = $R.RADIO_INTENSET_END_Msk
    IntrVec.NVIC_enable(e$`RADIO_IRQn`)
    $R.RADIO.TASKS_TXEN.$$ = 1
}

export function waitReady() {
    Idle.setPauseOnly(true)
    while (cur_state != State.READY) {
        Idle.exec()
    }
    Idle.setPauseOnly(false)
}

export function RADIO_isr$$() {
    // $['%%a']
    // $['%%>'](<u8>$R.RADIO.STATE.$$)
    // $['%%>'](<u16>$R.RADIO.INTENSET.$$)
    IntrVec.NVIC_clear(e$`RADIO_IRQn`)
    $R.RADIO.INTENCLR.$$ = $R.RADIO.INTENSET.$$
    $R.RADIO.EVENTS_END.$$ = 0
    setState(State.READY)
}
