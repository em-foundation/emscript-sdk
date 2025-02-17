import em from '@$$emscript'
export const $U = em.$declare('COMPOSITE')

import * as ArmStartupC from '@em.arch.arm/StartupC.em'
import * as BoardC from '@ti.distro.cc23xx/BoardC.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as LinkerC from '@ti.distro.cc23xx/LinkerC.em'
import * as REGS from '@ti.distro.cc23xx/REGS.em'
import * as StartupC from '@ti.distro.cc23xx/StartupC.em'
import * as TargC from '@em.lang/TargC.em'

const nvic_intrs = [
    'CPUIRQ0',
    'CPUIRQ1',
    'CPUIRQ2',
    'CPUIRQ3',
    'CPUIRQ4',
    'GPIO_COMB',
    'LRFD_IRQ0',
    'LRFD_IRQ1',
    'DMA_DONE_COMB',
    'AES_COMB',
    'SPI0_COMB',
    'UART0_COMB',
    'I2C0_IRQ',
    'LGPT0_COMB',
    'LGPT1_COMB',
    'ADC0_COMB',
    'CPUIRQ16',
    'LGPT2_COMB',
    'LGPT3_COMB',
]

export function em$configure() {
    $using(ArmStartupC)
    $using(BoardC)
    $using(IntrVec)
    $using(LinkerC)
    $using(REGS)
    $using(StartupC)
    $using(TargC)
    for (let name of nvic_intrs) IntrVec.em$meta.addIntr(name)
}

export function em$generate() {
    const opt = $property('em.build.Optimize', 'Oz')
    const tools = $property('em.build.ToolsHome', '')
    const libflav = opt == 'Oz' ? 'small' : 'balanced'
    let out = $outfile('build.sh', 0o755)
    out.addFrag(`
        |-> #!/bin/sh
        |-> 
        |-> set -e
        |-> 
        |-> TOOLS=${tools}/segger-arm
        |-> CC=$TOOLS/bin/segger-cc
        |-> LD=$TOOLS/gcc/arm-none-eabi/bin/ld
        |-> OBJCOPY=$TOOLS/gcc/arm-none-eabi/bin/objcopy
        |-> OBJDUMP=$TOOLS/gcc/arm-none-eabi/bin/objdump
        |-> 
        |-> OUT=.out
        |-> 
        |-> rm -rf $OUT
        |-> mkdir $OUT
        |-> 
        |-> 
        |-> CFLAGS="\\
        |->     -D__EM_ARCH_arm__ \\
        |->     -D__EM_BOOT__=0 \\
        |->     -D__EM_BOOT_FLASH__=0 \\
        |->     -D__EM_COMPILER_segger__ \\
        |->     -D__EM_CPU_cortex_m0plus__ \\
        |->     -D__EM_MCU_null__ \\
        |->     -D__EM_LANG__=1 \\
        |->     --std=c++14 \\
        |->     -triple thumbv6m-none-eabi \\
        |->     -target-cpu cortex-m0plus \\
        |->     -ffunction-sections \\
        |->     -fdata-sections \\
        |->     -fno-threadsafe-statics \\
        |->     -Wno-deprecated-register \\
        |->     -Wno-invalid-noreturn \\
        |->     -Wno-macro-redefined \\
        |->     -Wno-switch \\
        |->     -Wno-uninitialized \\
        |->     -Wno-c99-designator \\
        |->     -Wno-c++20-designator \\
        |->     -Wpointer-to-int-cast \\
        |->     -target-feature +strict-align -target-feature +soft-float -target-feature +soft-float-abi -msoft-float -target-abi aapcs -mfloat-abi soft -fno-signed-char -fnative-half-type -fnative-half-arguments-and-returns \\
        |-> "
        |-> 
        |-> CINCS="\\
        |->     -I . \\
        |->     -I $TOOLS/include \\
        |-> "
        |-> 
        |-> COPTS="\\
        |->     -${opt} \\
        |-> "
        |-> 
        |-> LFLAGS="\\
        |->     -eem__start \\
        |->     -N \\
        |->     --gc-sections \\
        |-> "
        |-> 
        |-> LIBS="
        |->     $TOOLS/lib/libc_v6m_t_le_eabi_${libflav}.a \\
        |->     $TOOLS/lib/strops_v6m_t_le_eabi_${libflav}.a \\
        |-> "
        |-> 
        |-> $CC -c $CFLAGS $CINCS $COPTS -x c++ main.cpp -o $OUT/main.obj
        |-> $LD $LFLAGS -Map=$OUT/main.map -T linkcmd.ld -o $OUT/main.out $OUT/main.obj $LIBS
        |-> $OBJCOPY -O ihex $OUT/main.out $OUT/main.out.hex
        |-> $OBJDUMP -h -d --demangle $OUT/main.out >$OUT/main.out.dis
        |-> $OBJDUMP -t --demangle $OUT/main.out | tail -n +5 | sed -e 's/[FO] /  /' | sed -e 's/df /   /' >$OUT/main.out.sym
        |-> sort -k1 $OUT/main.out.sym > $OUT/main.out.syma
        |-> sort -k5 $OUT/main.out.sym > $OUT/main.out.symn
        |-> $OBJDUMP -h $OUT/main.out

    `)
    out.close()
    //
    const dslite = process.platform === 'win32'
        ? 'dslite.bat'
        : process.platform === 'linux'
            ? 'dslite-Cortex_M0P.sh'
            : 'dslite.sh'
    out = $outfile('load.sh', 0o755)
    out.addText(`${tools}/ti-uniflash/${dslite} -c ../ti.cc23xx/ti.distro.cc23xx/CC2340R5.ccxml .out/main.out\n`)
    out.close()
}

declare global {
    const $R: typeof REGS
}

Object.assign(globalThis, {
    $R: REGS
})
