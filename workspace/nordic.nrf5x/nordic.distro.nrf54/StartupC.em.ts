import '@$$emscript'
export const $U = $declare('COMPOSITE')

export function em$generate() {
    let out = $outfile('nordic.distro.nrf54/startup.cpp')
    out.addFrag(`
        |-> #include <stdbool.h>
        |-> #include <stdint.h>
        |-> 
        |-> #include "../em.arch.arm/intr.cpp"
        |-> #include "../em.arch.arm/startup.cpp"
        |-> 
        |-> extern void em_main();
        |-> 
        |-> extern "C" bool __is_warm() {
        |->     return false;
        |-> }
        |-> 
    `)
    out.close()
}
