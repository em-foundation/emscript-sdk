import '@$$emscript'
export const $U = $declare('INTERFACE')

export type Handler = cb_t<[]>

export interface $I {
    isPressed(): bool_t
    onPressed(handler: Handler, min_dur_ms: u16, max_dur_ms: u16): void
}
