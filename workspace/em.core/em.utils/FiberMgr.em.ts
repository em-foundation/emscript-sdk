import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Common from '@em.mcu/Common.em'

export type Body = cb_t<[arg_t]>
export type Obj = ref_t<Fiber>

class Fiber extends $struct {
    link: ref_t<Fiber>
    body: Body
    arg: arg_t
    post: () => void
}

class List extends $struct {
    head: ref_t<Fiber>
    tail: ref_t<Fiber>
    empty: () => bool_t
    give: (elem: ref_t<Fiber>) => void
    take: () => ref_t<Fiber>
}
let FiberFac = $factory(Fiber.$make())

let ready_list = List.$make()

export namespace em$meta {
    export function create(body: Body, arg: arg_t = 0): Obj {
        let fiber = FiberFac.$create()
        fiber.$$.body = body
        fiber.$$.arg = arg
        return fiber
    }
}

function dispatch() {
    while (!ready_list.empty()) {
        let fiber = ready_list.take()
        Common.GlobalInterrupts.$$.enable()
        fiber.$$.body(fiber.$$.arg)
        Common.GlobalInterrupts.$$.disable()
    }
}

export function run() {
    Common.Idle.$$.wakeup()
    Common.GlobalInterrupts.$$.enable()
    while (true) {
        Common.GlobalInterrupts.$$.disable()
        dispatch()
        Common.Idle.$$.exec()
    }
}

function Fiber__post(self: ref_t<Fiber>): void {
    let key = Common.GlobalInterrupts.$$.disable()
    if (self.$$.link == $null) ready_list.give(self)
    Common.GlobalInterrupts.$$.restore(key)
}

function List__empty(self: ref_t<List>): bool_t {
    return self.$$.head == $null
}

function List__give(self: ref_t<List>, elem: ref_t<Fiber>): void {
    if (self.$$.empty()) {
        self.$$.head = elem
    } else {
        self.$$.tail.$$.link = elem
    }
    self.$$.tail = elem
    elem.$$.link = $null
}

function List__take(self: ref_t<List>): ref_t<Fiber> {
    let e = self.$$.head
    self.$$.head = e.$$.link
    e.$$.link = $null
    if (self.$$.head == $null) self.$$.tail = $null
    return e
}
