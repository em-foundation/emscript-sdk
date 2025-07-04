import '@$$emscript'
export const $U = $declare('COMPOSITE')

import * as ArmStartupC from '@em.arch.arm/StartupC.em'
import * as BoardC from '@nordic.distro.nrf52/BoardC.em'
import * as IsrEmpty from '@em.arch.arm/IsrEmpty.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as LinkerC from '@em.build.segger/LinkerC.em'
import * as REGS from '@nordic.distro.nrf52/REGS.em'
import * as StartupC from '@nordic.distro.nrf52/StartupC.em'
import * as TargC from '@em.lang/TargC.em'

const NVIC_INTRS = <Array<string>>[
    'POWER_CLOCK',
    'RADIO',
    'UARTE0_UART0                                                           ',
    'SPIM0_SPIS0_TWIM0_TWIS0_SPI0_TWI0',
    'SPIM1_SPIS1_TWIM1_TWIS1_SPI1_TWI1',
    'NFCT',
    'GPIOTE',
    'SAADC',
    'TIMER0',
    'TIMER1',
    'TIMER2',
    'RTC0',
    'TEMP',
    'RNG',
    'ECB',
    'CCM_AAR',
    'WDT',
    'RTC1',
    'QDEC',
    'COMP_LPCOMP',
    'SWI0_EGU0',
    'SWI1_EGU1',
    'SWI2_EGU2',
    'SWI3_EGU3',
    'SWI4_EGU4',
    'SWI5_EGU5',
    'TIMER3',
    'TIMER4',
    'PWM0',
    'PDM',
    'MWU',
    'PWM1',
    'PWM2',
    'SPIM2_SPIS2_SPI2',
    'RTC2',
    'I2S',
    'FPU',
]

export function em$configure() {
    $using(ArmStartupC)
    $using(BoardC)
    $using(IntrVec)
    $using(LinkerC)
    $using(REGS)
    $using(StartupC)
    $using(TargC)
    IntrVec.IsrDefault.$$dlg = IsrEmpty
    for (let name of NVIC_INTRS) IntrVec.em$meta.addIntr(name)
}

export function em$generate() {
    LinkerC.genScript({
        dmem_flash: { orig: 0x20000000, len: 0x00008000 },
        imem_flash: { orig: 0x00000000, len: 0x00008000 },
        dmem_sram: { orig: 0x20000000, len: 0x00008000 },
        imem_sram: { orig: 0x00808000, len: 0x00008000 },
        lmem_sram: { orig: 0x00000000, len: 0x00008000 },
    })
    let opt = $property('em.build.Optimize', 'Oz')
    let tools = $property('em.build.ToolsHome', '')
    let libflav = opt == 'Oz' ? 'small' : 'balanced'
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
        |->     -D__EM_CPU_cortex_m33__ \\
        |->     -D__EM_MCU_null__ \\
        |->     -D__EM_LANG__=1 \\
        |->     -D__GNUC__ \\
        |->     --std=c++14 \\
        |->     -triple thumbv6m-none-eabi \\
        |->     -target-cpu cortex-m4 \\
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
    const ext = (process.platform === 'win32') ? '.exe' : 'Exe'
    out = $outfile('load.sh', 0o755)
    const exec = `${tools}/segger-jlink/JLink${ext}`
    out.addText(`${exec} -CommandFile ../nordic.nrf5x/nordic.distro.nrf52/jlink-cmds`)
    out.close()
}
