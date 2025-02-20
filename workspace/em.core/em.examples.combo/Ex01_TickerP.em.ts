import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TickerMgr from '@em.utils/TickerMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

// app settings
const sys_led_period_ms = 1500
const app_led_period_ms = 2000
const print_period_ms = 5000
const min_press_time_ms = 10
const max_press_time_ms = 2000
const max_divided_by = 8

// app resources
const AppLed = $delegate(BoardC.AppLed)
const AppBut = $delegate(BoardC.AppBut)
const SysLed = $delegate(BoardC.SysLed)
const AppTicker = $config<TickerMgr.Obj>()
const SysTicker = $config<TickerMgr.Obj>()
const PrintTicker = $config<TickerMgr.Obj>()

// initial state vector
var divided_by: u32 = 1
var sys_count: u32 = 0
var app_count: u32 = 0
var last_app_count: u32 = 0
var last_sys_count: u32 = 0
var print_count: u32 = 0
var expected_app_count: u32
var expected_sys_count: u32
var total_errors: u32 = 0
var prints_after_rate_change: u32 = 0

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
    app_count += 1
    em.$['%%c']
    AppLed.$$.wink(10)
}

function countError(count: u32, expectedCount: u32): bool_t {
    return (count < expectedCount || count > expectedCount + 1)
}

function onButtonPressed() {
    if (AppBut.$$.isPressed()) {
        // a long press (press time > max_press_time_ms)
        printf`Long button press: Stopping app/sys tickers\n`()
        divided_by = 0
        stopLedTickers()
        last_app_count = 0
        last_sys_count = 0
    } else {
        // a short press (min_press_time_ms < press time < max_press_time_ms)
        divided_by = (divided_by >= max_divided_by || divided_by < 1) ? 1 : divided_by * 2
        printf`Short button press: Setting rate to %dx\n`(divided_by)
        startLedTickers()
        printStatus()
    }
    prints_after_rate_change = 0
}

function printStatus() {
    printf`Button effects:\n... short press (>%d ms): cycle through rates (1,2,4,8x)\n... long press (>%d s): stop led tickers\n`(
        min_press_time_ms,
        max_press_time_ms / TimeTypes.millisecondsPerSecond
    )
    printf`Current rate %dx\n`(divided_by)
    printf`... should print every ~%ds\n`(print_period_ms / TimeTypes.millisecondsPerSecond)
    printf`... app ticks should be %d..%d\n`(expected_app_count, expected_app_count + 1)
    printf`... sys ticks should be %d..%d\n`(expected_sys_count, expected_sys_count + 1)
}

function printTickCb() {
    print_count += 1
    prints_after_rate_change++
    const this_app_count = app_count - last_app_count
    const this_sys_count = sys_count - last_sys_count
    const this_app_error = countError(this_app_count, expected_app_count)
    const this_sys_error = countError(this_sys_count, expected_sys_count)
    if (prints_after_rate_change > 2 && (this_app_error || this_sys_error)) {
        this_app_error && total_errors++
        this_sys_error && total_errors++
    }
    printTime(Common.Uptimer.$$.read())
    printf` Print tick {rate: %dx, ticks: {app: %d%s, sys: %d%s}, errors: %d}\n`(
        divided_by,
        this_app_count,
        this_app_error ? t$`*` : t$``,
        this_sys_count,
        this_sys_error ? t$`*` : t$``,
        total_errors
    )
    if (divided_by > 0 && last_sys_count > 0 && last_sys_count == sys_count) {
        printf`No sys ticks detected since last print\n`()
        em.halt()
    }
    if (divided_by > 0 && last_app_count > 0 && last_app_count == app_count) {
        printf`No app ticks detected since last print\n`()
        em.halt()
    }
    last_app_count = app_count
    last_sys_count = sys_count
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
    AppBut.$$.onPressed($cb(onButtonPressed), min_press_time_ms, max_press_time_ms)
}

function startLedTickers() {
    AppTicker.$$.$$.start(TimeTypes.Secs24p8_initMsecs(app_led_period_ms) / divided_by, $cb(appTickCb))
    SysTicker.$$.$$.start(TimeTypes.Secs24p8_initMsecs(sys_led_period_ms) / divided_by, $cb(sysTickCb))
    expected_app_count = divided_by * print_period_ms / app_led_period_ms
    expected_sys_count = divided_by * print_period_ms / sys_led_period_ms
}

function startPrintTicker() {
    PrintTicker.$$.$$.start(TimeTypes.Secs24p8_initMsecs(print_period_ms), $cb(printTickCb))
}

function stopLedTickers() {
    AppTicker.$$.$$.stop()
    SysTicker.$$.$$.stop()
    expected_app_count = 0
    expected_sys_count = 0
}

function sysTickCb() {
    sys_count += 1
    em.$['%%d']
    SysLed.$$.wink(10)
}
