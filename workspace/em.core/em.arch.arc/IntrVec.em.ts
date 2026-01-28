import '@$$emscript'
export const $U = $declare('MODULE')

import * as IsrI from '@em.hal/IsrI.em'

export const IsrDefault = $proxy<IsrI.$I>()

export namespace em$meta {
    //
    const NO_VEC = '<NA>'

    const core_intrs = [
        'MemErr',
        'InstErr',
        NO_VEC,
        NO_VEC,
        NO_VEC,
        NO_VEC,
        NO_VEC,
        'SWI',
        'Trap',
        NO_VEC,
        'DivZero',
        NO_VEC,
        NO_VEC,
        NO_VEC,
        NO_VEC,
    ]

    const intr_list = new Array<string>()
    const used_list = new Array<string>()
    const used_set = new Set<string>()

    export function em$init() {
        for (let name of core_intrs) addIntr(name)
        useIntr('DEFAULT')
    }

    export function em$generate() {
        let len = intr_list.length + 1
        let out = $outfile('em.arch.arc/intr.cpp')
        out.addFrag(`
                        |-> //
                        |-> 
                        |-> typedef void( *intfunc )( void );
                        |-> 
                        |-> extern "C" void _start( void );
                        |-> extern "C" void em__start( void );
                        |-> 
                        |-> extern "C" volatile int isr$$_flag = 0;
                        |-> 
                        |-> extern "C" void isr$$_exec() {
                        |->     asm ("st.aw %r0,[%sp,-88]");
                        |->     asm ("st_s %r1,[%sp,4]");
                        |->     asm ("st_s %r2,[%sp,8]");
                        |->     asm ("st_s %r3,[%sp,12]");
                        |->     asm ("st %r4,[%sp,16]");
                        |->     asm ("st %r5,[%sp,20]");
                        |->     asm ("st %r6,[%sp,24]");
                        |->     asm ("st %r7,[%sp,28]");
                        |->     asm ("st %r8,[%sp,32]");
                        |->     asm ("st %r9,[%sp,36]");
                        |->     asm ("st %r10,[%sp,40]");
                        |->     asm ("st %r11,[%sp,44]");
                        |->     asm ("st_s %r12,[%sp,48]");
                        |->     asm ("st %r30,[%sp,52]");
                        |->     asm ("st %blink,[%sp,56]");
                        |->     asm ("st %accl,[%sp,60]");
                        |->     asm ("st %acch,[%sp,64]");
                        |->     asm ("st %lp_count,[%sp,68]");
                        |->     asm ("lr %r0,[%lp_start]");
                        |->     asm ("st_s %r0,[%sp,72]");
                        |->     //
                        |->     isr$$_flag = 1;
                        |->     asm ("ld_s %r0,[%sp,88]");
                        |->     asm ("jl_s [%r0]");
                        |->     //
                        |->     asm ("lr %r0,[%lp_end]");
                        |->     asm ("st_s %r0,[%sp,76]");
                        |->     asm ("lr %r0,[%acc0_ghi]");
                        |->     asm ("st_s %r0,[%sp,80]");
                        |->     asm ("lr %r0,[%acc0_glo]");
                        |->     asm ("st_s %r0,[%sp,84]");
                        |->     asm ("ld_s %r0,[%sp,84]");
                        |->     asm ("sr %r0,[%acc0_glo]");
                        |->     asm ("ld_s %r0,[%sp,80]");
                        |->     asm ("sr %r0,[%acc0_ghi]");
                        |->     asm ("ld_s %r0,[%sp,76]");
                        |->     asm ("sr %r0,[%lp_end]");
                        |->     asm ("ld_s %r0,[%sp,72]");
                        |->     asm ("sr %r0,[%lp_start]");
                        |->     asm ("ld_s %r0,[%sp,68]");
                        |->     asm ("ld %acch,[%sp,64]");
                        |->     asm ("mov %lp_count,%r0");
                        |->     asm ("ld %accl,[%sp,60]");
                        |->     asm ("ld %blink,[%sp,56]");
                        |->     asm ("ld %r30,[%sp,52]");
                        |->     asm ("ld_s %r12,[%sp,48]");
                        |->     asm ("ld %r11,[%sp,44]");
                        |->     asm ("ld %r10,[%sp,40]");
                        |->     asm ("ld %r9,[%sp,36]");
                        |->     asm ("ld %r8,[%sp,32]");
                        |->     asm ("ld %r7,[%sp,28]");
                        |->     asm ("ld %r6,[%sp,24]");
                        |->     asm ("ld %r5,[%sp,20]");
                        |->     asm ("ld %r4,[%sp,16]");
                        |->     asm ("ld_s %r3,[%sp,12]");
                        |->     asm ("ld_s %r2,[%sp,8]");
                        |->     asm ("ld_s %r1,[%sp,4]");
                        |->     asm ("ld.ab %r0,[%sp,88]");
                        |->     asm ("add %sp,%sp,4");
                        |->     asm ("rtie");
                        |-> }
        `)
        for (let n of used_set) {
            out.addFrag(`
                        |-> extern "C" void ${n}_isr$$( void );
                        |-> extern "C" void ${n}_isr$$__I( void ) {
                        |->     asm ("st.aw ${n}_isr$$,[%sp,-4]");
                        |->     asm ("b isr$$_exec");
                        |-> }
            `)
        }
        out.addFrag(`                        
                        |-> extern "C" const intfunc  __attribute__((section(".intvec"))) __vector_table[${len}] = {
                        |->     _start,
        `)
        for (let n of intr_list) {
            const s =
                n == NO_VEC
                    ? '0'
                    : used_set.has(n)
                        ? `(intfunc)${n}_isr$$__I`
                        : '(intfunc)DEFAULT_isr$$__I'
            out.addFrag(`
                        |->     ${s},
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
    e$`_sr((int)(&__vector_table), INT_VECTOR_BASE)`
}

export function wait() {
    while (e$`isr$$_flag == 0`) { }
    e$`isr$$_flag = 0`
}


export function DEFAULT_isr$$() {
    IsrDefault.exec()
    fail()
}
