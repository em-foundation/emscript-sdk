import '@$$emscript'
export const $U = $declare('MODULE')

import * as Common from '@em.mcu/Common.em'

export type Body = cb_t<[arg_t]>
export type Obj = $$<Fiber>

class Fiber extends $struct {
    link: $$<Fiber>
    body: Body
    arg: arg_t
}
interface Fiber {
    post(this: Fiber): void
}

class List extends $struct {
    head: $$<Fiber>
    tail: $$<Fiber>
}
interface List {
    empty(this: List): bool_t
    give(this: List, elem: $$<Fiber>): void
    take(this: List): $$<Fiber>
}

var fiber_tab = $table<Fiber>()

var ready_list = List.$make()

export namespace em$meta {
    export function create(body: Body, arg: arg_t = 0): Obj {
        let fiber = fiber_tab.$$add()
        fiber.$$.body = body
        fiber.$$.arg = arg
        return fiber
    }
}

function dispatch() {
    while (!ready_list.empty()) {
        let fiber = ready_list.take()
        Common.GlobalInterrupts.enable()
        fiber.$$.body(fiber.$$.arg)
        Common.GlobalInterrupts.disable()
    }
}

export function run() {
    Common.GlobalInterrupts.enable()
    while (true) {
        Common.GlobalInterrupts.disable()
        dispatch()
        Common.Idle.exec()
    }
}

Fiber.prototype.post = function (this: Fiber): void {
    let key = Common.GlobalInterrupts.disable()
    if (this.link == $null) ready_list.give($ref(this))
    Common.GlobalInterrupts.restore(key)
}

List.prototype.empty = function (this: List): bool_t {
    return this.head == $null
}

List.prototype.give = function (this: List, elem: $$<Fiber>): void {
    if (this.empty()) {
        this.head = elem
    } else {
        this.tail.$$.link = elem
    }
    this.tail = elem
    elem.$$.link = $null
}

List.prototype.take = function (this: List): $$<Fiber> {
    let e = this.head
    this.head = e.$$.link
    e.$$.link = $null
    if (this.head == $null) this.tail = $null
    return e
}
