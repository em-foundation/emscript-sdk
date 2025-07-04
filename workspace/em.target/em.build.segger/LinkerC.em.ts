import '@$$emscript'
export const $U = $declare('COMPOSITE')

type MemDesc = {
    orig: u32
    len: u32
}

type MemSegs = {
    dmem_flash: MemDesc
    imem_flash: MemDesc
    dmem_sram: MemDesc
    imem_sram: MemDesc
    lmem_sram: MemDesc
}

type XtraSeg = {
    name: string
    sect: string
    desc: MemDesc
}

let out = $outfile('linkcmd.ld')

function descToString(mem_desc: MemDesc): string {
    return $sprintf('ORIGIN = 0x%08x, LENGTH = 0x%08x', mem_desc.orig, mem_desc.len)
}

function genXtraMems(xtra_segs: XtraSeg[]) {
    for (const xs of xtra_segs) {
        out.addText(`    ${xs.name} : ${descToString(xs.desc)}\n`)
    }
}

function genXtraSects(xtra_segs: XtraSeg[]) {
    for (const xs of xtra_segs) {
        out.addText(`    ${xs.sect} : { KEEP(*(${xs.sect})); } > ${xs.name}\n`)

    }
}

export function genScript(mem_segs: MemSegs, xtra_segs: XtraSeg[] = []) {
    const use_sram = $property('em.build.BootFlash', false)
    if (!use_sram) {
        const stack_top = $sprintf('0x%08x', mem_segs.dmem_flash.orig + mem_segs.dmem_flash.len)
        out.addFrag(`
            |-> MEMORY {
            |->     DMEM : ${descToString(mem_segs.dmem_flash)}
            |->     IMEM : ${descToString(mem_segs.imem_flash)}
        `)
        genXtraMems(xtra_segs)
        out.addFrag(`
            |-> }
            |-> 
            |-> SECTIONS {
            |-> 
            |->      __boot_flag__ = 0;
            |-> 
            |->     .intvec : {
            |->          KEEP(*(.intvec))
            |->     } > IMEM
            |-> 
            |->     .text : {
            |->          *(.start)
            |->          *(.text .text.*)
            |->          . = ALIGN(., 4);
            |->     } > IMEM
            |-> 
            |->     .ARM.exidx : { } > IMEM
            |-> 
            |->     .const : {
            |->         *(.rodata .rodata.* .constdata .constdata.*)
            |->         . = ALIGN(., 4);
            |->     } > IMEM
            |-> 
            |->     __data_load_start__ = ALIGN(., 4);
            |-> 
            |->     .data : AT(__data_load_start__) {
            |->         *(.data .data.* .sdata .sdata.*)
            |->         . = ALIGN(., 4);
            |->     } > DMEM
            |-> 
            |->     .bss (NOLOAD): {
            |->         *(.bss .bss.*)
            |->         *(.sbss .sbss.*)
            |->         . = ALIGN(., 4);
            |->     } > DMEM
            |-> 
        `)
        genXtraSects(xtra_segs)
        out.addFrag(`
            |-> 
            |->     __bss_addr__ = ADDR(.bss);
            |->     __bss_size__ = SIZEOF(.bss) / 4;
            |->     __code_addr__ = ADDR(.text);
            |->     __data_addr__ = ADDR(.data);
            |->     __data_load__ = LOADADDR(.data);
            |->     __data_size__ = SIZEOF(.data) / 4;
            |->     __code_load__ = ~0;
            |->     __code_size__ = ~0;
            |->     __stack_top__ = ${stack_top};
            |-> }
        `)
    } else {
        // use_sram
        const stack_top = $sprintf('0x%08x', mem_segs.dmem_sram.orig + mem_segs.dmem_sram.len)
        out.addFrag(`
            |-> MEMORY {
            |->     DMEM : ${descToString(mem_segs.dmem_sram)}
            |->     IMEM : ${descToString(mem_segs.imem_sram)}
            |->     LMEM : ${descToString(mem_segs.lmem_sram)}
        `)
        genXtraMems(xtra_segs)
        out.addFrag(`
            |-> }
            |-> 
            |-> SECTIONS {
            |->  
            |->      __boot_flag__ = 0;
            |-> 
            |->     .armstart : {
            |->         KEEP(*(.start_vec))
            |->         KEEP(*(.start))
            |->     } > LMEM
            |->  
            |->     .text : {
            |->          KEEP(*(.intvec))
            |->          *(.text .text.*)
            |->         . = ALIGN(., 4);
            |->     } > IMEM AT > LMEM
            |-> 
            |->     .ARM.exidx : { } > IMEM AT > LMEM
            |->  
            |->     __const_load_start__ = (ALIGN(LOADADDR(.text) + SIZEOF(.text) + SIZEOF(.ARM.exidx), 4));
            |-> 
            |->     .const : AT(__const_load_start__) {
            |->         *(.rodata .rodata.* .constdata .constdata.*)
            |->         . = ALIGN(., 4);
            |->     } > IMEM
            |->  
            |->     __data_load_start__ = (ALIGN(LOADADDR(.const) + SIZEOF(.const), 4));
            |-> 
            |->     .data : AT(__data_load_start__) {
            |->         *(.data .data.* .sdata .sdata.*)
            |->         . = ALIGN(., 4);
            |->     } > DMEM
            |-> 
            |->     .bss (NOLOAD): {
            |->         *(.bss .bss.*)
            |->         *(.sbss .sbss.*)
            |->         . = ALIGN(., 4);
            |->     } > DMEM
        `)
        genXtraSects(xtra_segs)
        out.addFrag(`
            |->  
            |->     __bss_addr__ = ADDR(.bss);
            |->     __bss_size__ = SIZEOF(.bss) / 4;
            |->     __code_addr__ = ADDR(.text);
            |->     __data_addr__ = ADDR(.data);
            |->     __data_load__ = LOADADDR(.data);
            |->     __data_size__ = SIZEOF(.data) / 4;
            |->     __code_load__ = LOADADDR(.text);
            |->     __code_size__ = ((__data_load__ - __code_load__) / 4);
            |->     __stack_top__ = ${stack_top};
            |-> }
        `)
    }
    out.close()
}
