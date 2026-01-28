import '@$$emscript'
export const $U = $declare('COMPOSITE')

import * as ArmStartupC from '@em.arch.arm/StartupC.em'
import * as BoardC from '@nordic.distro.nrf54/BoardC.em'
import * as IsrDefault from '@em.arch.arm/IsrEmpty.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as LinkerC from '@em.build.segger/LinkerC.em'
import * as REGS from '@nordic.distro.nrf54/REGS.em'
import * as StartupC from '@nordic.distro.nrf54/StartupC.em'
import * as TargC from '@em.lang/TargC.em'

const NVIC_INTRS = <Array<string>>[
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'SWI00',
    'SWI01',
    'SWI02',
    'SWI03',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'SPU00',
    'MPC00',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'AAR00_CCM00',
    'ECB00',
    'CRACEN',
    null,                           /*Reserved */
    'SERIAL00',
    'RRAMC',
    'VPR00',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'CTRLAP',
    null,                           /*Reserved */
    'CM33SS',
    'TIMER00',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'SPU10',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'TIMER10',
    null,                           /*Reserved */
    'EGU10',
    null,                           /*Reserved */
    null,                           /*Reserved */
    'RADIO_0',
    'RADIO_1',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'SPU20',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'SERIAL20',
    'SERIAL21',
    'SERIAL22',
    'EGU20',
    'TIMER20',
    'TIMER21',
    'TIMER22',
    'TIMER23',
    'TIMER24',
    null,                         /*Reserved */
    'PDM20',
    'PDM21',
    'PWM20',
    'PWM21',
    'PWM22',
    'SAADC',
    'NFCT',
    'TEMP',
    null,                           /*Reserved */
    null,                           /*Reserved */
    'GPIOTE20_0',
    'GPIOTE20_1',
    'TAMPC',
    'I2S20',
    null,                           /*Reserved */
    null,                           /*Reserved */
    'QDEC20',
    'QDEC21',
    'GRTC_0',
    'GRTC_1',
    'GRTC_2',
    'GRTC_3',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'SPU30',
    null,                           /*Reserved */
    null,                           /*Reserved */
    null,                           /*Reserved */
    'SERIAL30',
    'CLOCK_POWER',
    'COMP_LPCOMP',
    null,                           /*Reserved */
    'WDT30',
    'WDT31',
    null,                           /*Reserved */
    null,                           /*Reserved */
    'GPIOTE30_0',
    'GPIOTE30_1',
]

export function em$configure() {
    $using(ArmStartupC)
    $using(BoardC)
    $using(IntrVec)
    $using(LinkerC)
    $using(REGS)
    $using(StartupC)
    $using(TargC)
    IntrVec.IsrDefault.$$dlg = IsrDefault
    for (let name of NVIC_INTRS) IntrVec.em$meta.addIntr(name)
}

export function em$generate() {
    LinkerC.genScript({
        dmem_flash: { orig: 0x20000000, len: 0x00008000 },
        imem_flash: { orig: 0x00000000, len: 0x00008000 },
        dmem_sram: { orig: 0x20000000, len: 0x00008000 },
        imem_sram: { orig: 0x20008000, len: 0x00008000 },
        lmem_sram: { orig: 0x00000000, len: 0x00008000 },
    })
    let opt = $property('em.build.Optimize', 'Oz')
    let tools = $property('em.build.ToolsHome', '')
    let fpu = $property('em.build.FPU', '')
    let fpuabi = fpu ? 'hard' : 'soft'
    let fpudef = fpu ? '1' : '0'
    let libarch = fpu ? 'v8mml_fpv5_sp_d16_hard' : 'v6m'
    let libflav = opt == 'Oz' && !fpu ? 'small' : 'balanced'
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
        |->     -D__FPU_PRESENT=${fpudef} \\
        |->     -D__FPU_USED=${fpudef} \\
        |->     --std=c++14 \\
        |->     -triple thumbv6m-none-eabi \\
        |->     -target-cpu cortex-m33 \\
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
        |->     -target-feature +strict-align -mfloat-abi ${fpuabi} -target-abi aapcs -fno-signed-char -fnative-half-type -fnative-half-arguments-and-returns \\
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
        |->     $TOOLS/lib/libc_${libarch}_t_le_eabi_${libflav}.a \\
        |->     $TOOLS/lib/strops_${libarch}_t_le_eabi_${libflav}.a \\
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
    out.addText(`${exec} -CommandFile ../nordic.nrf5x/nordic.distro.nrf54/jlink-cmds`)
    out.close()
}
