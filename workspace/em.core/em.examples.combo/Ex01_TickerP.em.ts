import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TickerMgr from '@em.utils/TickerMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

// app settings
const sysLedPeriodMs = 1500
const appLedPeriodMs = 2000
const printPeriodMs = 5000
const minPressTimeMs = 10
const maxPressTimeMs = 2000
const maxDividedBy = 8

// app resources
const AppLed = $delegate(BoardC.AppLed)
const AppBut = $delegate(BoardC.AppBut)
const SysLed = $delegate(BoardC.SysLed)
const AppTicker = $config<TickerMgr.Obj>()
const SysTicker = $config<TickerMgr.Obj>()
const PrintTicker = $config<TickerMgr.Obj>()

// initial state vector
let dividedBy: u32 = 1
let sysCount: u32 = 0
let appCount: u32 = 0
let lastAppCount: u32 = 0
let lastSysCount: u32 = 0
let printCount: u32 = 0
let expectedAppCount: u32
let expectedSysCount: u32
let totalErrors: u32 = 0
let printsAfterRateChange: u32 = 0

export namespace em$meta {
    export function em$construct() {
        AppTicker.$$ = TickerMgr.em$meta.create()
        SysTicker.$$ = TickerMgr.em$meta.create()
        PrintTicker.$$ = TickerMgr.em$meta.create()
    }
}

export function em$run() {
    printf`\nEx01_TickerP program startup\n\n`()
    startLedTickers()
    startPrintTicker()
    startButton()
    printStatus()
    FiberMgr.run()
}

function appTickCb() {
    appCount += 1
    em.$['%%c']
    AppLed.$$.wink(10)
}

function countError(count: u32, expectedCount: u32): bool_t {
    return (count < expectedCount || count > expectedCount + 1)
}

function onButtonPressed() {
    if (AppBut.$$.isPressed()) {
        // a long press (press time > maxPressTimeMs)
        printf`Long button press: Stopping app/sys tickers\n`()
        dividedBy = 0
        stopLedTickers()
        lastAppCount = 0
        lastSysCount = 0
    } else {
        // a short press (minPressTimeMs < press time < maxPressTimeMs)
        dividedBy = (dividedBy >= maxDividedBy || dividedBy < 1) ? 1 : dividedBy * 2
        printf`Short button press: Setting rate to %dx\n`(dividedBy)
        startLedTickers()
        printStatus()
    }
    printsAfterRateChange = 0
}

function printStatus() {
    printf`Button effects:\n... short press (>%d ms): cycle through rates (1,2,4,8x)\n... long press (>%d s): stop led tickers\n`(
        minPressTimeMs,
        maxPressTimeMs/TimeTypes.millisecondsPerSecond
    )
    printf`Current rate %dx\n`(dividedBy)
    printf`... should print every ~%ds\n`(printPeriodMs / TimeTypes.millisecondsPerSecond)
    printf`... app ticks should be %d..%d\n`(expectedAppCount, expectedAppCount + 1)
    printf`... sys ticks should be %d..%d\n`(expectedSysCount, expectedSysCount + 1)
}

function printTickCb() {
    printCount += 1
    printsAfterRateChange++
    const thisAppCount = appCount - lastAppCount
    const thisSysCount = sysCount - lastSysCount
    const thisAppError = countError(thisAppCount, expectedAppCount)
    const thisSysError = countError(thisSysCount, expectedSysCount)
    if (printsAfterRateChange > 2 && (thisAppError || thisSysError)) {
        thisAppError && totalErrors++
        thisSysError && totalErrors++
    }
    printTime(Common.Uptimer.$$.read())
    printf` Print tick {rate: %dx, ticks: {app: %d%s, sys: %d%s}, errors: %d}\n`(
        dividedBy,
        thisAppCount,
        thisAppError ? t$`*` : t$``,
        thisSysCount,
        thisSysError ? t$`*` : t$``,
        totalErrors
    )
    if (dividedBy > 0 && lastSysCount > 0 && lastSysCount == sysCount) {
        printf`No sys ticks detected since last print\n`()
        em.halt()
    }
    if (dividedBy > 0 && lastAppCount > 0 && lastAppCount == appCount) {
        printf`No app ticks detected since last print\n`()
        em.halt()
    }
    lastAppCount = appCount
    lastSysCount = sysCount
}

function printTime(rawTime: TimeTypes.RawTime) {
    const timeParts = TimeTypes.RawTimeToTimeParts(rawTime)
    printf`%dT%02d:%02d:%02d.%03d`(
        timeParts.days,
        timeParts.hours,
        timeParts.minutes,
        timeParts.seconds,
        timeParts.milliseconds
    )
}

function startButton() {
    AppBut.$$.onPressed($cb(onButtonPressed), minPressTimeMs, maxPressTimeMs)
}

function startLedTickers() {
    AppTicker.$$.$$.start(TimeTypes.Secs24p8_initMsecs(appLedPeriodMs) / dividedBy, $cb(appTickCb))
    SysTicker.$$.$$.start(TimeTypes.Secs24p8_initMsecs(sysLedPeriodMs) / dividedBy, $cb(sysTickCb))
    expectedAppCount = dividedBy * printPeriodMs / appLedPeriodMs
    expectedSysCount = dividedBy * printPeriodMs / sysLedPeriodMs
}

function startPrintTicker() {
    PrintTicker.$$.$$.start(TimeTypes.Secs24p8_initMsecs(printPeriodMs), $cb(printTickCb))
}

function stopLedTickers() {
    AppTicker.$$.$$.stop()
    SysTicker.$$.$$.stop()
    expectedAppCount = 0
    expectedSysCount = 0
}

function sysTickCb() {
    sysCount += 1
    em.$['%%d']
    SysLed.$$.wink(10)
}
