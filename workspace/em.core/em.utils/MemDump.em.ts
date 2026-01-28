import '@$$emscript'
export const $U = $declare('MODULE')

export namespace em$meta { }

//>> ---- em$targ ---- <<//

export function print(label: text_t, p32: ptr_t<u32>, size: u32) {
    printf`%s:\n`(label)
    const cnt = size / 4
    const wid = 4
    let nl: text_t = t$``
    for (const i of $range(cnt)) {
        if ((i % wid) == 0) {
            printf`%s  %06x: `(nl, p32);
            nl = t$``;
        } else {
            nl = t$`\n`;
        }
        printf`%08x `(p32.$$)
        p32.$inc()
    }
    printf`%s\n`(nl)
}
