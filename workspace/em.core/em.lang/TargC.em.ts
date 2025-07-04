import '@$$emscript'
export const $U = $declare('COMPOSITE')

export function em$generate() {
    let out = $outfile('emscript.hpp')
    out.addFile('../em.core/em.lang/emscript.hpp')
    out.close()
}
