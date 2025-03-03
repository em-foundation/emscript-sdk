import em from '@$$emscript'
export const $U = em.$declare('COMPOSITE')

import * as BoardController from '@em.utils/BoardController.em'
import * as BusyWait from '@adi.mcu.max326xx/BusyWait.em'
import * as Console from '@em.lang/Console.em'
import * as Common from '@em.mcu/Common.em'
import * as ConsoleUart from '@adi.mcu.max326xx/ConsoleUart3.em'
import * as Debug from '@em.lang/Debug.em'
import * as GlobalInterrupts from '@em.arch.arm/GlobalInterrupts.em'
import * as GpioT from '@adi.mcu.max326xx/GpioT.em'
import * as Idle from '@adi.mcu.max326xx/Idle.em'
import * as LedT from '@em.utils/LedT.em'
import * as Mcu from '@adi.mcu.max326xx/Mcu.em'
import * as OneShot from '@adi.mcu.max326xx/OneShotN.em'
import * as Poller from '@em.mcu/Poller.em'
import * as Uptimer from '@adi.mcu.max326xx/UptimerRtc.em'
import * as UsCounter from '@em.arch.arm/UsCounterSystick.em'

export const AppLed = $clone(LedT)
export const AppLedPin = $clone(GpioT)
export const AppOutPin = $clone(GpioT)
export const DbgA = $clone(GpioT)
export const DbgB = $clone(GpioT)
export const DbgC = $clone(GpioT)
export const DbgD = $clone(GpioT)
export const SysLed = $clone(LedT)
export const SysLedPin = $clone(GpioT)

export function em$configure(): void {
    $using(BoardController)
    $using(Console)
    AppLed.Pin.$$ = AppLedPin
    AppLed.active_low.$$ = true
    AppLedPin.pin_num.$$ = 0x013 // P0.19
    AppOutPin.pin_num.$$ = 0x207 // P2.7
    BoardController.Led.$$ = SysLed
    Common.BusyWait.$$ = BusyWait
    Common.ConsoleUart.$$ = ConsoleUart
    Common.GlobalInterrupts.$$ = GlobalInterrupts
    Common.Idle.$$ = Idle
    Common.Mcu.$$ = Mcu
    Common.Uptimer.$$ = Uptimer
    Common.UsCounter.$$ = UsCounter
    ConsoleUart.TxPin.$$ = AppOutPin
    DbgA.pin_num.$$ = 0x106 // P1.6
    DbgB.pin_num.$$ = 0x107 // P1.7
    DbgC.pin_num.$$ = 0x108 // P1.8
    DbgD.pin_num.$$ = 0x109 // P1.9
    Debug.DbgA.$$ = DbgA
    Debug.DbgB.$$ = DbgB
    Debug.DbgC.$$ = DbgC
    Debug.DbgD.$$ = DbgD
    Poller.OneShot.$$ = OneShot
    SysLed.Pin.$$ = SysLedPin
    SysLed.active_low.$$ = true
    SysLedPin.pin_num.$$ = 0x012 // P0.18
    UsCounter.MHZ.$$ = 60
}
