import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Common from '@em.mcu/Common.em'
import * as GpioI from '@em.hal/GpioI.em'

export const DbgA = $proxy<GpioI.$I>()
export const DbgB = $proxy<GpioI.$I>()
export const DbgC = $proxy<GpioI.$I>()
export const DbgD = $proxy<GpioI.$I>()

function delay() {
    Common.BusyWait.$$.wait(1)
}

export function mark(id: u8, val: u8) {
    for (; ;) {
        pulse(id)
        if (val == 0) break
        val -= 1
    }
}

export function minus(id: u8) {
    switch (id) {
        case 0:
            DbgA.$$.set()
            break
        case 1:
            DbgB.$$.set()
            break
        case 2:
            DbgC.$$.set()
            break
        case 3:
            DbgD.$$.set()
            break
    }
}

export function plus(id: u8) {
    switch (id) {
        case 0:
            DbgA.$$.clear()
            break
        case 1:
            DbgB.$$.clear()
            break
        case 2:
            DbgC.$$.clear()
            break
        case 3:
            DbgD.$$.clear()
            break
    }
}

export function pulse(id: u8) {
    plus(id)
    delay()
    minus(id)
    delay()
}

export function reset() {
    DbgA.$$.reset()
    DbgB.$$.reset()
    DbgC.$$.reset()
    DbgD.$$.reset()
}

export function startup() {
    DbgA.$$.makeOutput()
    DbgA.$$.set()
    DbgB.$$.makeOutput()
    DbgB.$$.set()
    DbgC.$$.makeOutput()
    DbgC.$$.set()
    DbgD.$$.makeOutput()
    DbgD.$$.set()
}
