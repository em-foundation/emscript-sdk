import em from '@$$emscript'
export const $U = em.$declare('MODULE')

export namespace em$meta {

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
        $U.used()
        for (let name of core_intrs) addIntr(name)
    }

    export function em$generate() {
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
                        |-> extern "C" const intvec_elem  __attribute__((section(".intvec"))) __vector_table[35] = {
                        |->     { .ptr = (void*)&__stack_top__ },
                        |->     { .fxn = em__start },
        `)
        for (let n of intr_list) {
            const s = n == NO_VEC ? '0' : used_set.has(n) ? `${n}_isr$$` : 'DEFAULT_isr$$'
            out.addFrag(`
                        |-> /**/${s},
            `)
        }
        out.addFrag(`
                        |-> };
        `)
        out.close()
    }

    export function addIntr(name: string) {
        intr_list.push(name)
    }

    export function useIntr(name: string) {
        used_list.push(name)
        used_set.add(name)
    }
}

export function em$startup() {
    e$`SCB->VTOR = (uint32_t)(&__vector_table)`
}

export function NVIC_clear(irqN: u8) {
    e$`NVIC_ClearPendingIRQ((IRQn_Type)irqN)`
}

export function NVIC_disable(irqN: u8) {
    e$`NVIC_DisableIRQ((IRQn_Type)irqN)`
}

export function NVIC_enable(irqN: u8) {
    e$`NVIC_EnableIRQ((IRQn_Type)irqN)`
}

export function PRIMASK_get(): u32 {
    return e$`__get_PRIMASK()`
}

export function PRIMASK_set(m: u32) {
    e$`__set_PRIMASK(m)`
}

export function DEFAULT_isr$$() {
    $['%%b:'](3)
    let vnum = <u32>e$`__get_IPSR()`
    $['%%>'](vnum)
    let fp = <ptr_t<u32>>(e$`__get_MSP()`)
    $['%%>'](fp.$cur())
    for (let _ of $range(8)) {
        $['%%b']
        $['%%>'](fp.$$)
        fp.$inc()
    }
    fail()
}
