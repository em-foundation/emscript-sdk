import '@$$emscript'
export const $U = $declare('MODULE')

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

export type RtcThresh = u32
export type Secs24p8 = u32
export type Secs30p2 = u32

export function RawTime_ZERO(): RawTime {
    let raw_time = RawTime.$make()
    raw_time.secs = raw_time.subs = 0
    return raw_time
}

export function RawSubsToMsecs(subs: u32): u32 {
    const scale = 8
    return ((subs >> 16) * (1_000 / scale)) / (65536 / scale)
}

export function RawSubsToUsecs(subs: u32): u32 {
    const scale = 64
    return ((subs >> 16) * (1_000_000 / scale)) / (65536 / scale)
}

export function RawTimeToSecs24p8(raw_time: RawTime): Secs24p8 {
    return (raw_time.secs << 8) | (raw_time.subs >> 24)
}

export function RawTimeToSecs30p2(raw_time: RawTime): Secs30p2 {
    return (raw_time.secs << 2) | (raw_time.subs >> 30)
}

export function RawTimeToTimeParts(raw_time: RawTime): TimeParts {
    let time_parts = TimeParts.$make()
    time_parts.days = raw_time.secs / SECONDS_PER_DAY
    time_parts.hours = (raw_time.secs % SECONDS_PER_DAY) / SECONDS_PER_HOUR
    time_parts.minutes = (raw_time.secs % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
    time_parts.seconds = raw_time.secs % SECONDS_PER_MINUTE
    time_parts.milliseconds = RawSubsToMsecs(raw_time.subs)
    return time_parts
}

export function Secs24p8_initMsecs(msecs: u32): Secs24p8 {
    return (msecs * 32) / 125
}

export function Secs24p8_ZERO(): Secs24p8 {
    return 0
}

export function Secs24p8ToUsecs(s24p8: Secs24p8): u64 {
    const scale = 64
    return (s24p8 * (1_000_000 / scale)) / (256 / scale)
}

export function Secs30p2_initMsecs(msecs: u32): Secs30p2 {
    return msecs / 250
}

export function Secs30p2_ZERO(): Secs30p2 {
    return 0
}

export function Secs30p2ToUsecs(s30p2: Secs30p2): u64 {
    return s30p2 * 250_000
}

export function UsecsToRawSubs(usecs: u32): u32 {
    const scale = 64
    return (usecs * (65536 / scale) / (1_000_000 / scale)) << 16
}