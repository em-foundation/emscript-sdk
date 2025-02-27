import em from '@$$emscript'
export const $U = em.$declare('MODULE')

export const HOURS_PER_DAY = 24
export const MINUTES_PER_HOUR = 60
export const SECONDS_PER_MINUTE = 60
export const SECONDS_PER_HOUR = MINUTES_PER_HOUR * SECONDS_PER_MINUTE
export const SECONDS_PER_DAY = HOURS_PER_DAY * SECONDS_PER_HOUR
export const MILLISECONDS_PER_SECOND = 1000

export class RawTime extends $struct {
    secs: u32
    subs: u32
}

export class TimeParts extends $struct {
    days: u32
    hours: u32
    minutes: u32
    seconds: u32
    milliseconds: u32
}

export type Secs24p8 = u32

export function RawTime_ZERO(): RawTime {
    let raw_time = RawTime.$make()
    raw_time.secs = raw_time.subs = 0
    return raw_time
}

export function RawSubsToMsecs(subs: u32): u32 {
    return ((subs >> 16) * 1000) / 65536
}

export function Secs24p8_initMsecs(msecs: u32): Secs24p8 {
    return (msecs * 32) / 125
}

export function Secs24p8_ZERO(): Secs24p8 {
    return 0
}

export function RawTimeToTimeParts(rawTime: RawTime): TimeParts {
    let time_parts = TimeParts.$make()
    time_parts.days = rawTime.secs / SECONDS_PER_DAY
    time_parts.hours = (rawTime.secs % SECONDS_PER_DAY) / SECONDS_PER_HOUR
    time_parts.minutes = (rawTime.secs % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
    time_parts.seconds = rawTime.secs % SECONDS_PER_MINUTE
    time_parts.milliseconds = RawSubsToMsecs(rawTime.subs)
    return time_parts
}
