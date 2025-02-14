import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'

export const AppLed = $delegate(BoardC.AppLed)

const dbg_flag = $config<bool_t>(true)
const min_cnt = $config<u16>(1000)
const max_cnt = $config<u16>(1020)

export function em$run() {
    AppLed.$$.on()
    for (let cnt = min_cnt.$$; cnt < max_cnt.$$; cnt++) {
        em.$['%%d+']
        Common.BusyWait.$$.wait(500_000)
        em.$['%%d-']
        AppLed.$$.toggle()
        if (!dbg_flag.$$) continue
        if (cnt > (min_cnt.$$ + max_cnt.$$) / 2) em.halt()
        let bits11 = <u8>(cnt & 0x3)
        em.$['%%c:'](bits11)
        em.$['%%>'](bits11)
        printf`cnt = %d (0x%04x), bits11 = %d\n`(cnt, cnt, bits11)
    }
    AppLed.$$.off()
}
