import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TickerMgr from '@em.utils/TickerMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

// app settings
const SYS_LED_PERIOD_MS = 1500
const APP_LED_PERIOD_MS = 2000
const PRINT_PERIOD_MS = 5000
const MIN_PRESS_TIME_MS = 10
const MAX_PRESS_TIME_MS = 2000
const MAX_DIVIDED_BY = 8

// app resources
const AppLed = $delegate(BoardC.AppLed)
const AppBut = $delegate(BoardC.AppBut)
const SysLed = $delegate(BoardC.SysLed)

const app_ticker = $config<TickerMgr.Obj>()
const sys_ticker = $config<TickerMgr.Obj>()
const print_ticker = $config<TickerMgr.Obj>()

export namespace em$meta {
    export function em$construct() {
        app_ticker.$$ = TickerMgr.em$meta.create()
        sys_ticker.$$ = TickerMgr.em$meta.create()
        print_ticker.$$ = TickerMgr.em$meta.create()
    }
}

// initial state vector
let divided_by = 1
let sys_count = 0
let app_count = 0
let last_app_count = 0
let last_sys_count = 0
let print_count = 0
let total_errors = 0
let prints_after_rate_change = 0

let expected_app_count: u32
let expected_sys_count: u32

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
    $['%%c']
    AppLed.$$.wink(10)
}

function countError(count: u32, expectedCount: u32): bool_t {
    return count < expectedCount || count > expectedCount + 1
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
        divided_by =
            divided_by >= MAX_DIVIDED_BY || divided_by < 1 ? 1 : divided_by * 2
        printf`Short button press: Setting rate to %dx\n`(divided_by)
        startLedTickers()
        printStatus()
    }
    prints_after_rate_change = 0
}

function printStatus() {
    printf`Button effects:\n... short press (>%d ms): cycle through rates (1,2,4,8x)\n... long press (>%d s): stop led tickers\n`(
        MIN_PRESS_TIME_MS,
        MAX_PRESS_TIME_MS / TimeTypes.MILLISECONDS_PER_SECOND
    )
    printf`Current rate %dx\n`(divided_by)
    printf`... should print every ~%ds\n`(
        PRINT_PERIOD_MS / TimeTypes.MILLISECONDS_PER_SECOND
    )
    printf`... app ticks should be %d..%d\n`(
        expected_app_count,
        expected_app_count + 1
    )
    printf`... sys ticks should be %d..%d\n`(
        expected_sys_count,
        expected_sys_count + 1
    )
}

function printTickCb() {
    print_count += 1
    prints_after_rate_change++
    let this_app_count = app_count - last_app_count
    let this_sys_count = sys_count - last_sys_count
    let this_app_error = countError(this_app_count, expected_app_count)
    let this_sys_error = countError(this_sys_count, expected_sys_count)
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
        halt()
    }
    if (divided_by > 0 && last_app_count > 0 && last_app_count == app_count) {
        printf`No app ticks detected since last print\n`()
        halt()
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
    AppBut.$$.onPressed(
        $cb(onButtonPressed),
        MIN_PRESS_TIME_MS,
        MAX_PRESS_TIME_MS
    )
}

function startLedTickers() {
    app_ticker.$$.$$.start(
        TimeTypes.Secs24p8_initMsecs(APP_LED_PERIOD_MS) / divided_by,
        $cb(appTickCb)
    )
    sys_ticker.$$.$$.start(
        TimeTypes.Secs24p8_initMsecs(SYS_LED_PERIOD_MS) / divided_by,
        $cb(sysTickCb)
    )
    expected_app_count = (divided_by * PRINT_PERIOD_MS) / APP_LED_PERIOD_MS
    expected_sys_count = (divided_by * PRINT_PERIOD_MS) / SYS_LED_PERIOD_MS
}

function startPrintTicker() {
    print_ticker.$$.$$.start(
        TimeTypes.Secs24p8_initMsecs(PRINT_PERIOD_MS),
        $cb(printTickCb)
    )
}

function stopLedTickers() {
    app_ticker.$$.$$.stop()
    sys_ticker.$$.$$.stop()
    expected_app_count = 0
    expected_sys_count = 0
}

function sysTickCb() {
    sys_count += 1
    $['%%d']
    SysLed.$$.wink(10)
}
