import em from '@$$emscript'
export const $U = em.$declare('COMPOSITE')

import * as BoardController from '@em.utils/BoardController.em'
import * as BusyWait from '@adi.mcu.max326xx/BusyWait.em'
import * as Console from '@em.lang/Console.em'
import * as Common from '@em.mcu/Common.em'
import * as ConsoleUart0 from '@adi.mcu.max326xx/ConsoleUart0.em'
import * as ConsoleUart3 from '@adi.mcu.max326xx/ConsoleUart3.em'
import * as Debug from '@em.lang/Debug.em'
import * as GlobalInterrupts from '@em.arch.arm/GlobalInterrupts.em'
import * as GpioT from '@adi.mcu.max326xx/GpioT.em'
import * as Idle from '@adi.mcu.max326xx/Idle.em'
import * as LedT from '@em.utils/LedT.em'
import * as Mcu from '@adi.mcu.max326xx/Mcu.em'
import * as OneShot from '@adi.mcu.max326xx/OneShotTmr0.em'
import * as Poller from '@em.mcu/Poller.em'
import * as Uptimer from '@adi.mcu.max326xx/UptimerRtc.em'
import * as UsCounter from '@em.arch.arm/UsCounterSystick.em'

export { OneShot }

export const AppLed = $clone(LedT)
export const AppLedPin = $clone(GpioT)
export const AppOutPin = $clone(GpioT)
export const DbgA = $clone(GpioT)
export const DbgB = $clone(GpioT)
export const DbgC = $clone(GpioT)
export const DbgD = $clone(GpioT)
export const SysLed = $clone(LedT)
export const SysLedPin = $clone(GpioT)

export const DEFAULTS = {
    /** setting applies to {app,com,sys}Led pins */ activeLowLeds: false,
    /** use UART3 for appOut if true */ useLpUart: false,
    pins: {
        appBut: <i16>-1,
        appLed: <i16>-1,
        appOut: <i16>-1,
        sysDbgA: <i16>-1,
        sysDbgB: <i16>-1,
        sysDbgC: <i16>-1,
        sysDbgD: <i16>-1,
        sysLed: <i16>-1,
    }
}

export function em$configure(): void {
    const brd = $board(DEFAULTS)
    const ConsoleUart = brd.useLpUart ? ConsoleUart3 : ConsoleUart0
    $using(BoardController)
    $using(Console)
    AppLed.Pin.$$ = AppLedPin
    AppLed.active_low.$$ = brd.activeLowLeds
    AppLedPin.pin_num.$$ = brd.pins.appLed
    AppOutPin.pin_num.$$ = brd.pins.appOut
    BoardController.Led.$$ = SysLed
    BusyWait.scalar.$$ = 5
    Common.BusyWait.$$ = BusyWait
    Common.ConsoleUart.$$ = ConsoleUart
    Common.GlobalInterrupts.$$ = GlobalInterrupts
    Common.Idle.$$ = Idle
    Common.Mcu.$$ = Mcu
    Common.Uptimer.$$ = Uptimer
    Common.UsCounter.$$ = UsCounter
    ConsoleUart.TxPin.$$ = AppOutPin
    DbgA.pin_num.$$ = brd.pins.sysDbgA
    DbgB.pin_num.$$ = brd.pins.sysDbgB
    DbgC.pin_num.$$ = brd.pins.sysDbgC
    DbgD.pin_num.$$ = brd.pins.sysDbgD
    Debug.DbgA.$$ = DbgA
    Debug.DbgB.$$ = DbgB
    Debug.DbgC.$$ = DbgC
    Debug.DbgD.$$ = DbgD
    Poller.OneShot.$$ = OneShot
    SysLed.Pin.$$ = SysLedPin
    SysLed.active_low.$$ = true
    SysLedPin.pin_num.$$ = brd.pins.sysLed
    UsCounter.MHZ.$$ = 60
}
