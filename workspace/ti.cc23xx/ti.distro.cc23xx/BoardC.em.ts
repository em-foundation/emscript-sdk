import em from '@$$emscript'
export const $U = em.$declare('COMPOSITE')

import * as AlarmMgr from '@em.utils/AlarmMgr.em'
import * as BoardController from '@em.utils/BoardController.em'
import * as BusyWait from '@ti.mcu.cc23xx/BusyWait.em'
import * as ButtonT from '@em.utils/ButtonT.em'
import * as Console from '@em.lang/Console.em'
import * as Common from '@em.mcu/Common.em'
import * as ConsoleUart0 from '@ti.mcu.cc23xx/ConsoleUart0.em'
import * as Debug from '@em.lang/Debug.em'
import * as EdgeT from '@ti.mcu.cc23xx/EdgeT.em'
import * as ExtFlashDisabler from '@ti.mcu.cc23xx/ExtFlashDisabler.em'
import * as GlobalInterrupts from '@em.arch.arm/GlobalInterrupts.em'
import * as GpioT from '@ti.mcu.cc23xx/GpioT.em'
import * as Idle from '@ti.mcu.cc23xx/Idle.em'
import * as LedT from '@em.utils/LedT.em'
import * as Mcu from '@ti.mcu.cc23xx/Mcu.em'
import * as Poller from '@em.mcu/Poller.em'
import * as OneShot from '@ti.mcu.cc23xx/OneShotGpt3.em'
import * as Uptimer from '@ti.mcu.cc23xx/UptimerRtc.em'
import * as UsCounter from '@em.arch.arm/UsCounterSystick.em'
import * as WakeupTimer from '@ti.mcu.cc23xx/WakeupTimerRtc.em'

export { OneShot }

export const AppBut = $clone(ButtonT)
export const AppButEdge = $clone(EdgeT)
export const AppButPin = $clone(GpioT)
export const AppLed = $clone(LedT)
export const AppLedPin = $clone(GpioT)
export const AppOutPin = $clone(GpioT)
export const DbgA = $clone(GpioT)
export const DbgB = $clone(GpioT)
export const DbgC = $clone(GpioT)
export const DbgD = $clone(GpioT)
export const FlashCLK = $clone(GpioT)
export const FlashCS = $clone(GpioT)
export const FlashPICO = $clone(GpioT)
export const FlashPOCI = $clone(GpioT)
export const SysLed = $clone(LedT)
export const SysLedPin = $clone(GpioT)

export function em$configure(): void {
    $using(BoardController)
    $using(Console)
    $using(ExtFlashDisabler)
    AlarmMgr.WakeupTimer.$$ = WakeupTimer
    AppBut.Edge.$$ = AppButEdge
    AppButEdge.Pin.$$ = AppButPin
    AppButEdge.pin_num.$$ = AppButPin.pin_num.$$ = 9
    AppLed.Pin.$$ = AppLedPin
    AppLedPin.pin_num.$$ = 15
    AppOutPin.pin_num.$$ = 20
    BoardController.Led.$$ = SysLed
    Common.BusyWait.$$ = BusyWait
    Common.ConsoleUart.$$ = ConsoleUart0
    Common.GlobalInterrupts.$$ = GlobalInterrupts
    Common.Idle.$$ = Idle
    Common.Mcu.$$ = Mcu
    Common.Uptimer.$$ = Uptimer
    Common.UsCounter.$$ = UsCounter
    ConsoleUart0.TxPin.$$ = AppOutPin
    DbgA.pin_num.$$ = 23
    DbgB.pin_num.$$ = 25
    DbgC.pin_num.$$ = 1
    DbgD.pin_num.$$ = 2
    Debug.DbgA.$$ = DbgA
    Debug.DbgB.$$ = DbgB
    Debug.DbgC.$$ = DbgC
    Debug.DbgD.$$ = DbgD
    ExtFlashDisabler.CLK.$$ = FlashCLK
    ExtFlashDisabler.CS.$$ = FlashCS
    ExtFlashDisabler.PICO.$$ = FlashPICO
    ExtFlashDisabler.POCI.$$ = FlashPOCI
    FlashCLK.pin_num.$$ = 18
    FlashCS.pin_num.$$ = 6
    FlashPICO.pin_num.$$ = 13
    FlashPOCI.pin_num.$$ = 12
    Poller.OneShot.$$ = OneShot
    SysLed.Pin.$$ = SysLedPin
    SysLedPin.pin_num.$$ = 14
}
