import '@$$emscript'
export const $U = $declare('COMPOSITE')

import * as AlarmMgr from '@em.utils/AlarmMgr.em'
import * as BoardController from '@em.utils/BoardController.em'
import * as BusyWait from '@em.utils/BusyWait.em'
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
import * as OneShot from '@ti.mcu.cc23xx/OneShotGpt3.em'
import * as Poller from '@em.mcu/Poller.em'
import * as RadioDriver from '@ti.radio.cc23xx/RadioDriver.em'
import * as Rtc from '@ti.mcu.cc23xx/Rtc.em'
import * as Uptimer from '@em.utils/UptimerRtc.em'
import * as UsCounter from '@em.arch.arm/UsCounterSystick.em'

export { OneShot, RadioDriver }

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

export const DEFAULTS = {
    /** setting applies to {app,com,sys}Led pins */ activeLowLeds: false,
    pins: {
        appBut: <i16>-1,
        appLed: <i16>-1,
        appOut: <i16>-1,
        extFlashCS: <i16>-1,
        extFlashCLK: <i16>-1,
        extFlashPICO: <i16>-1,
        extFlashPOCI: <i16>-1,
        sysDbgA: <i16>-1,
        sysDbgB: <i16>-1,
        sysDbgC: <i16>-1,
        sysDbgD: <i16>-1,
        sysLed: <i16>-1,
    }
}

export function em$configure(): void {
    if ($isbare()) return
    const brd = $board(DEFAULTS)
    $using(BoardController)
    $using(Console)
    $using(ExtFlashDisabler)
    AlarmMgr.Rtc.$$dlg = Rtc
    AppBut.Edge.$$dlg = AppButEdge
    AppButEdge.Pin.$$dlg = AppButPin
    AppButEdge.pin_num.$$val = AppButPin.pin_num.$$val = brd.pins.appBut
    AppLed.Pin.$$dlg = AppLedPin
    AppLedPin.pin_num.$$val = brd.pins.appLed
    AppOutPin.pin_num.$$val = brd.pins.appOut
    BoardController.Led.$$dlg = SysLed
    BusyWait.scalar.$$val = 6
    Common.BusyWait.$$dlg = BusyWait
    Common.ConsoleUart.$$dlg = ConsoleUart0
    Common.GlobalInterrupts.$$dlg = GlobalInterrupts
    Common.Idle.$$dlg = Idle
    Common.Mcu.$$dlg = Mcu
    Common.Uptimer.$$dlg = Uptimer
    Common.UsCounter.$$dlg = UsCounter
    ConsoleUart0.TxPin.$$dlg = AppOutPin
    DbgA.pin_num.$$val = brd.pins.sysDbgA
    DbgB.pin_num.$$val = brd.pins.sysDbgB
    DbgC.pin_num.$$val = brd.pins.sysDbgC
    DbgD.pin_num.$$val = brd.pins.sysDbgD
    Debug.DbgA.$$dlg = DbgA
    Debug.DbgB.$$dlg = DbgB
    Debug.DbgC.$$dlg = DbgC
    Debug.DbgD.$$dlg = DbgD
    ExtFlashDisabler.CLK.$$dlg = FlashCLK
    ExtFlashDisabler.CS.$$dlg = FlashCS
    ExtFlashDisabler.PICO.$$dlg = FlashPICO
    ExtFlashDisabler.POCI.$$dlg = FlashPOCI
    FlashCLK.pin_num.$$val = brd.pins.extFlashCLK
    FlashCS.pin_num.$$val = brd.pins.extFlashCS
    FlashPICO.pin_num.$$val = brd.pins.extFlashPICO
    FlashPOCI.pin_num.$$val = brd.pins.extFlashPOCI
    Poller.OneShot.$$dlg = OneShot
    SysLed.Pin.$$dlg = SysLedPin
    SysLedPin.pin_num.$$val = brd.pins.sysLed
    Uptimer.Rtc.$$dlg = Rtc
}
