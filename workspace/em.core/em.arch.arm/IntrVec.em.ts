import '@$$emscript'
export const $U = $declare('MODULE')

import * as IsrI from '@em.arch.arm/IsrI.em'

export const IsrDefault = $proxy<IsrI.$I>()

export namespace em$meta {
    //
    const NO_VEC = '<NA>'

    const core_intrs = [
        'NMI',
        'HardFault',
        NO_VEC,
        NO_VEC,
        NO_VEC,
        NO_VEC,
        NO_VEC,
        NO_VEC,
        NO_VEC,
        'SVCall',
        NO_VEC,
        NO_VEC,
        'PendSV',
        'SysTick',
    ]

    const intr_list = new Array<string>()
    const used_list = new Array<string>()
    const used_set = new Set<string>()

    export function em$init() {
        for (let name of core_intrs) addIntr(name)
    }

    export function em$generate() {
        let len = intr_list.length + 2
        let out = $outfile('em.arch.arm/intr.cpp')
        out.addFrag(`
                        |-> //
                        |-> #include <stdbool.h>
                        |-> #include <stdint.h>
                        |-> 
                        |-> typedef void( *intfunc )( void );
                        |-> typedef union { intfunc fxn; void* ptr; } intvec_elem;
                        |-> 
                        |-> extern uint32_t __stack_top__;
                        |-> extern "C" void em__start( void );
                        |-> 
                        |-> extern "C" void DEFAULT_isr$$( void );
                        |-> 
                        |-> extern "C" const intvec_elem  __attribute__((section(".intvec"))) __vector_table[${len}] = {
                        |->     { .ptr = (void*)&__stack_top__ },
                        |->     { .fxn = em__start },
        `)
        for (let n of intr_list) {
            const s =
                n == NO_VEC
                    ? '0'
                    : used_set.has(n)
                        ? `${n}_isr$$`
                        : 'DEFAULT_isr$$'
            out.addFrag(`
                        |-> /**/${s},
            `)
        }
        out.addFrag(`
                        |-> };
        `)
        out.close()
    }

    export function addIntr(name: string | null) {
        intr_list.push(name ?? NO_VEC)
    }

    export function useIntr(name: string) {
        used_list.push(name)
        used_set.add(name)
    }
}

//>> ---- em$targ ---- <<//

export function em$startup() {
    e$`SCB->VTOR = (uint32_t)(&__vector_table)`
}

export function NVIC_clear(irqN: u16) {
    e$`NVIC_ClearPendingIRQ((IRQn_Type)irqN)`
}

export function NVIC_disable(irqN: u16) {
    e$`NVIC_DisableIRQ((IRQn_Type)irqN)`
}

export function NVIC_enable(irqN: u16) {
    e$`NVIC_EnableIRQ((IRQn_Type)irqN)`
}

export function PRIMASK_get(): u32 {
    return e$`__get_PRIMASK()`
}

export function PRIMASK_set(m: u32) {
    e$`__set_PRIMASK(m)`
}

export function DEFAULT_isr$$() {
    IsrDefault.exec()
    fail()
}

function emptyIsr() { }
