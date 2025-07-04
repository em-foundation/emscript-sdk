import '@$$emscript'
export const $U = $declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TickerMgr from '@em.utils/TickerMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

// app settings
const MAX_DIVIDED_BY = 8
const MAX_PRESS_TIME_MS = 2000
const MIN_PRESS_TIME_MS = 10
const TICKER_APP_PERIOD_MS = 3000
const TICKER_PRINT_PERIOD_MS = 5000
const TICKER_RATE_CHANGE_PERIOD_MS = 1 * TimeTypes.SECONDS_PER_MINUTE * TimeTypes.MILLISECONDS_PER_SECOND
const TICKER_SYS_PERIOD_MS = 2000

// app resources
const AppBut = $delegate(BoardC.AppBut)
const AppLed = $delegate(BoardC.AppLed)
const SysLed = $delegate(BoardC.SysLed)

const ticker_app = $config<TickerMgr.Obj>()
const ticker_sys = $config<TickerMgr.Obj>()
const ticker_print = $config<TickerMgr.Obj>()
const ticker_rate_change = $config<TickerMgr.Obj>()

export namespace em$meta {
    export function em$construct() {
        ticker_app.$$val = TickerMgr.em$meta.create()
        ticker_sys.$$val = TickerMgr.em$meta.create()
        ticker_print.$$val = TickerMgr.em$meta.create()
        ticker_rate_change.$$val = TickerMgr.em$meta.create()
    }
}

// initial state vector
let count_app = 0
let count_print = 0
let count_sys = 0
let divided_by = 1
let expected_count_app: u32
let expected_count_sys: u32
let last_count_app = 0
let last_count_sys = 0
let prints_after_rate_change = 0
let total_errors = 0

export function em$run() {
    printf`\nEx03_HelloBlinkerTickerButtonP program startup\n\n`()

    //quick sanity checks
    if (TimeTypes.Secs30p2_initMsecs(TICKER_APP_PERIOD_MS / MAX_DIVIDED_BY) == 0) {
        printf`ERROR:  TICKER_APP_PERIOD_MS too short\n`()
        halt()
    }
    if (TimeTypes.Secs30p2_initMsecs(TICKER_SYS_PERIOD_MS / MAX_DIVIDED_BY) == 0) {
        printf`ERROR:  TICKER_SYS_PERIOD_MS too short\n`()
        halt()
    }
    if (TimeTypes.Secs30p2_initMsecs(TICKER_PRINT_PERIOD_MS) <= TimeTypes.Secs30p2_initMsecs(TICKER_APP_PERIOD_MS) ||
        TimeTypes.Secs30p2_initMsecs(TICKER_PRINT_PERIOD_MS) <= TimeTypes.Secs30p2_initMsecs(TICKER_SYS_PERIOD_MS)) {
        printf`ERROR:  TICKER_PRINT_PERIOD_MS too short\n`()
        halt()
    }

    startLedTickers()
    startPrintTicker()
    startRateChangeTicker()
    startButton()
    printStatus()
    FiberMgr.run()
}

function countError(count: u32, expectedCount: u32): bool_t {
    return count < expectedCount || count > expectedCount + 1
}

function onButtonPressed() {
    if (AppBut.isPressed()) {
        // a long press (press time > max_press_time_ms)
        printf`Long button press: Stopping app/sys tickers\n`()
        divided_by = 0
        stopLedTickers()
        last_count_app = 0
        last_count_sys = 0
        prints_after_rate_change = 0
    } else {
        // a short press (min_press_time_ms < press time < max_press_time_ms)
        rotateRate(true)
    }
}

function printStatus() {
    printf`Button effects:\n... short press (>%d ms): cycle through rates (1,2,4,8x)\n... long press (>%d s): stop led tickers\n`(
        MIN_PRESS_TIME_MS,
        MAX_PRESS_TIME_MS / TimeTypes.MILLISECONDS_PER_SECOND
    )
    printf`Current rate %dx\n`(divided_by)
    printf`... should print every ~%ds\n`(
        TICKER_PRINT_PERIOD_MS / TimeTypes.MILLISECONDS_PER_SECOND
    )
    printf`... app ticks should be %d..%d\n`(
        expected_count_app,
        expected_count_app + 1
    )
    printf`... sys ticks should be %d..%d\n`(
        expected_count_sys,
        expected_count_sys + 1
    )
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

function rotateRate(fromButton: bool_t) {
    divided_by = divided_by >= MAX_DIVIDED_BY || divided_by < 1 ? 1 : divided_by * 2
    const from = fromButton ? t$`Short button press` : t$`Rate change ticker`
    printf`%s: Setting rate to %dx\n`(from, divided_by)
    startLedTickers()
    printStatus()
    prints_after_rate_change = 0
}

function startButton() {
    AppBut.onPressed(
        $cb(onButtonPressed),
        MIN_PRESS_TIME_MS,
        MAX_PRESS_TIME_MS
    )
}

function startLedTickers() {
    const app_period = TimeTypes.Secs30p2_initMsecs(TICKER_APP_PERIOD_MS / divided_by)
    const sys_period = TimeTypes.Secs30p2_initMsecs(TICKER_SYS_PERIOD_MS / divided_by)
    const print_period = TimeTypes.Secs30p2_initMsecs(TICKER_PRINT_PERIOD_MS)
    ticker_app.$$.start(app_period, $cb(tickCbApp))
    ticker_sys.$$.start(sys_period, $cb(tickCbSys))
    expected_count_app = print_period / app_period
    expected_count_sys = print_period / sys_period
}

function startPrintTicker() {
    ticker_print.$$.start(
        TimeTypes.Secs30p2_initMsecs(TICKER_PRINT_PERIOD_MS),
        $cb(tickCbPrint)
    )
}

function startRateChangeTicker() {
    ticker_rate_change.$$.start(
        TimeTypes.Secs30p2_initMsecs(TICKER_RATE_CHANGE_PERIOD_MS),
        $cb(tickCbRateChange)
    )
}

function stopLedTickers() {
    ticker_app.$$.stop()
    ticker_sys.$$.stop()
    expected_count_app = 0
    expected_count_sys = 0
}

function tickCbApp() {
    count_app += 1
    AppLed.wink(10)
}

function tickCbPrint() {
    count_print += 1
    prints_after_rate_change++
    let this_count_app = count_app - last_count_app
    let this_count_sys = count_sys - last_count_sys
    let this_app_error = countError(this_count_app, expected_count_app)
    let this_sys_error = countError(this_count_sys, expected_count_sys)
    if (prints_after_rate_change > 2 && (this_app_error || this_sys_error)) {
        this_app_error && total_errors++
        this_sys_error && total_errors++
    }
    printTime(Common.Uptimer.read())
    printf` Print tick {rate: %dx, ticks: {app: %d%s, sys: %d%s}, errors: %d}\n`(
        divided_by,
        this_count_app,
        this_app_error ? t$`*` : t$``,
        this_count_sys,
        this_sys_error ? t$`*` : t$``,
        total_errors
    )
    if (divided_by > 0 && last_count_sys > 0 && last_count_sys == count_sys) {
        printf`No sys ticks detected since last print\n`()
        halt()
    }
    if (divided_by > 0 && last_count_app > 0 && last_count_app == count_app) {
        printf`No app ticks detected since last print\n`()
        halt()
    }
    last_count_app = count_app
    last_count_sys = count_sys
}

function tickCbRateChange() {
    rotateRate(false)
}

function tickCbSys() {
    count_sys += 1
    SysLed.wink(10)
}
