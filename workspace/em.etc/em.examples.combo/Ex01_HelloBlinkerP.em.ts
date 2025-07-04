import '@$$emscript'
export const $U = $declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export const AppLed = $delegate(BoardC.AppLed)

export function em$run() {
    for (let i = 0; ; i++) {
        if (i % 10 == 0) {
            printTime(Common.Uptimer.read())
            printf` hello world %d\n`(i / 2)
        }
        Common.BusyWait.wait(500_000)
        AppLed.toggle()
    }
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
