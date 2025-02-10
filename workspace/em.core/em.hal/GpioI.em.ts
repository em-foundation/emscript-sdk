import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

export namespace em$meta {
    export declare function pinId(): i16
}

export interface $I {
    clear(): void
    functionSelect(select: u8): void
    get(): bool_t
    isInput(): bool_t
    isOutput(): bool_t
    makeInput(): void
    makeOutput(): void
    pinId(): i16
    reset(): void
    set(): void
    setInternalPulldown(enable: bool_t): void
    setInternalPullup(enable: bool_t): void
    toggle(): void
}
