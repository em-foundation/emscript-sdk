import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BusyWaitI from '@em.hal/BusyWaitI.em'
import * as ConsoleUartI from '@em.hal/ConsoleUartI.em'
import * as GlobalInterruptsI from '@em.hal/GlobalInterruptsI.em'
import * as IdleI from '@em.hal/IdleI.em'
import * as McuI from '@em.hal/McuI.em'
import * as UptimerI from '@em.hal/UptimerI.em'
import * as UsCounterI from '@em.hal/UsCounterI.em'

export const BusyWait = $proxy<BusyWaitI.$I>()
export const ConsoleUart = $proxy<ConsoleUartI.$I>()
export const GlobalInterrupts = $proxy<GlobalInterruptsI.$I>()
export const Idle = $proxy<IdleI.$I>()
export const Mcu = $proxy<McuI.$I>()
export const Uptimer = $proxy<UptimerI.$I>()
export const UsCounter = $proxy<UsCounterI.$I>()
