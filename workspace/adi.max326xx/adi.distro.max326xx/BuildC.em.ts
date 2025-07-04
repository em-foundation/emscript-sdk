import '@$$emscript'
export const $U = $declare('COMPOSITE')

import * as ArmStartupC from '@em.arch.arm/StartupC.em'
import * as BoardC from '@adi.distro.max326xx/BoardC.em'
import * as IsrDebug from '@em.arch.arm/IsrDebug.em'
import * as IsrEmpty from '@em.arch.arm/IsrEmpty.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as LinkerC from '@em.build.segger/LinkerC.em'
import * as REGS from '@adi.distro.max326xx/REGS.em'
import * as StartupC from '@adi.distro.max326xx/StartupC.em'
import * as TargC from '@em.lang/TargC.em'

import * as ChildProc from 'child_process'
import * as Os from 'os'

const NVIC_INTRS = [
    'PF',
    'WDT0',
    'RSV02',
    'RTC',
    'TRNG',
    'TMR0',
    'TMR1',
    'TMR2',
    'TMR3',
    'TMR4',
    'TMR5',
    'RSV11',
    'RSV12',
    'I2C0',
    'UART0',
    'UART1',
    'SPI1',
    'RSV17',
    'RSV18',
    'RSV19',
    'ADC',
    'RSV21',
    'RSV22',
    'FLC0',
    'GPIO0',
    'GPIO1',
    'GPIO2',
    'RSV27',
    'DMA0',
    'DMA1',
    'DMA2',
    'DMA3',
    'RSV32',
    'RSV33',
    'UART2',
    'RSV35',
    'I2C1',
    'RSV37',
    'RSV38',
    'BTLE_TX_DONE',
    'BTLE_RX_RCVD',
    'BTLE_RX_ENG_DET',
    'BTLE_SFD_DET',
    'BTLE_SFD_TO',
    'BTLE_GP_EVENT',
    'BTLE_CFO',
    'BTLE_SIG_DET',
    'BTLE_AGC_EVENT',
    'BTLE_RFFE_SPIM',
    'BTLE_TX_AES',
    'BTLE_RX_AES',
    'BTLE_INV_APB_ADDR',
    'BTLE_IQ_DATA_VALID',
    'WUT',
    'GPIOWAKE',
    'RSV55',
    'SPI0',
    'WDT1',
    'RSV58',
    'PT',
    'RSV60',
    'RSV61',
    'I2C2',
    'RISCV',
    'RSV64',
    'RSV65',
    'RSV66',
    'OWM',
    'RSV68',
    'RSV69',
    'RSV70',
    'RSV71',
    'RSV72',
    'RSV73',
    'RSV74',
    'RSV75',
    'RSV76',
    'RSV77',
    'RSV78',
    'RSV79',
    'RSV80',
    'RSV81',
    'ECC',
    'DVS',
    'SIMO',
    'RSV85',
    'RSV86',
    'RSV87',
    'UART3',
    'RSV89',
    'RSV90',
    'PCIF',
    'RSV92',
    'RSV93',
    'RSV94',
    'RSV95',
    'RSV96',
    'AES',
    'RSV98',
    'I2S',
    'CNN_FIFO',
    'CNN',
    'RSV102',
    'LPCMP',
]

export function em$configure() {
    $using(ArmStartupC)
    $using(BoardC)
    $using(IntrVec)
    $using(LinkerC)
    $using(REGS)
    $using(StartupC)
    $using(TargC)
    IntrVec.IsrDefault.$$dlg = $isbare() ? IsrEmpty : IsrDebug
    for (let name of NVIC_INTRS) IntrVec.em$meta.addIntr(name)
}

export function em$generate() {
    LinkerC.genScript({
        dmem_flash: { orig: 0x20000000, len: 0x00008000 },
        imem_flash: { orig: 0x10000000, len: 0x00008000 },
        dmem_sram: { orig: 0x20008000, len: 0x00008000 },
        imem_sram: { orig: 0x2001C000, len: 0x00004000 },
        lmem_sram: { orig: 0x10000000, len: 0x00008000 },
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
        |->     -D__EM_CPU_cortex_m4__ \\
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
    const openocddir = $property('em.build.OpenOCD', '').replaceAll('\\', '/')
    if (openocddir) {
        const ext = (process.platform === 'win32')
            ? '.exe'
            : ''
        const exec = `${openocddir}/openocd${ext}`
        const scriptsdir = `${openocddir}/scripts`
        const inter = 'interface/cmsis-dap.cfg'
        const targ = 'target/max32655.cfg'
        out = $outfile('load.sh', 0o755)
        out.addText(`${exec} -s ${scriptsdir} -f ${inter} -f ${targ} -c "program ./.out/main.out verify reset exit"`)
        out.close()
        out = $outfile('debug.sh', 0o755)
        out.addText(`${exec} -s ${scriptsdir} -f ${inter} -f ${targ}`)
        out.close()

    } else {
        const dst =
            process.platform === 'win32' ? findDrive('DAPLINK')
                : process.platform === 'linux' ? `/media/${Os.userInfo().username}/DAPLINK/`
                    : 'Volumes/daplink'
        out = $outfile('load.sh', 0o755)
        out.addText(`cp -f .out/main.out.hex ${dst}\n`)
        out.close()
    }
}

function findDrive(label: string): string {
    const cmd = `wmic logicaldisk where "VolumeName='${label}'" get DeviceID`
    const stdout = String(ChildProc.execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }))
    const lines = stdout.trim().split('\n')
    return lines.length < 2 ? '/dev/null' : `/${lines[1].slice(0, 1)}`
}
