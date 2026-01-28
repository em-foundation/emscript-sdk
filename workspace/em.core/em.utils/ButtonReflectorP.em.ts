import '@$$emscript'
export const $U = $declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'

const AppBut = $delegate(BoardC.AppBut)
const AppLed = $delegate(BoardC.AppLed)


export namespace em$meta { }

//>> ---- em$targ ---- <<//

export function em$run() {
    while (true) {
        if (AppBut.isPressed()) {
            AppLed.on()
            $['%%d+']
        } else {
            AppLed.off()
            $['%%d-']
        }
    }
}