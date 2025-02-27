import * as Fs from 'fs'
import * as Path from 'path'
import { sprintf } from 'sprintf-js'

const PATH = 'workspace/.emscript/props.json'
const PROPS = Fs.existsSync(PATH)
    ? JSON.parse(String(Fs.readFileSync(PATH)))
    : {}

namespace em {
    const __ARRAY__ = null
    // #region

    export function $array<T>(proto: T, len: number): em$ArrayProto<T> {
        return new em$ArrayProto(proto, len)
    }

    class em$ArrayProto<T> {
        readonly $base: T
        readonly $len: number
        constructor(proto: T, len: number) {
            this.$base = proto
            this.$len = len
        }
        $make() {
            return instantiate(this)
        }
    }
    class em$ArrayVal<T> implements frame_t<T> {
        $len: number
        private items: globalThis.Array<T>;
        [index: number]: T
        constructor(len: number, defaultVal: T) {
            this.$len = len
            this.items = new globalThis.Array(len).fill(defaultVal)
            return new globalThis.Proxy(this, {
                get(target, prop) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        return target.items[Number(prop)]
                    }
                    return (target as any)[prop]
                },
                set(target, prop, value) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        target.items[Number(prop)] = value
                        return true
                    }
                    return false
                },
            })
        }
        [Symbol.iterator](): Iterator<ref_t<T>> {
            // TODO combine with FRAME
            let idx = 0
            let items = this.items
            return {
                next(): IteratorResult<ref_t<T>> {
                    if (idx < items.length) {
                        let cur = idx
                        idx += 1
                        return { value: new em$ptr<T>(items, cur), done: false }
                    } else {
                        return { value: undefined as any, done: true }
                    }
                },
            }
        }
        $frame(beg: i16, len: u16 = 0) {
            return frame$create<T>(this.items, 0, beg, len)
        }
        $ptr(): ptr_t<T> {
            return new em$ptr<T>(this.items)
        }
    }

    // #endregion

    const __CB__ = null
    // #region

    export function $cb<A extends any[]>(
        fxn: (...args: A) => void,
        cname?: string
    ): cb_t<A> {
        return new em$cb(fxn, cname!) as unknown as cb_t<A>
    }

    export function $cb$null() {
        return new em$cb(undefined, '<undefined')
    }

    class em$cb<A extends any[]> {
        __em$class = 'em$cb'
        constructor(
            private fxn: ((...args: A) => void) | undefined,
            private cname: string
        ) {
            return new Proxy(this, {
                apply: (target, thisArg, args: A) => {
                    return this.fxn!(...args)
                },
            }) as any
        }
    }

    // class em$cb<A extends any[]> {
    //     constructor(readonly $$: (...args: A) => void) {
    //     }
    // }

    // #endregion

    const __CHAR__ = null
    // #region

    export function char_t(cs: string): u8 {
        return cs.charCodeAt(1)
    }

    export function c$(sa: TemplateStringsArray): em.u8 {
        return sa[0].charCodeAt(0)
    }

    // #endregion

    const __DEBUG__ = null
    // #region

    export const $bkpt = e$`asm volatile("asm")`

    export function fail() {}
    export function halt() {}

    export const $ = {
        '%%>': (val: any) => null as null,
        '%%a': null as null,
        '%%a+': null as null,
        '%%a-': null as null,
        '%%a:': (val: u8) => null as null,
        '%%b': null as null,
        '%%b+': null as null,
        '%%b-': null as null,
        '%%b:': (val: u8) => null as null,
        '%%c': null as null,
        '%%c+': null as null,
        '%%c-': null as null,
        '%%c:': (val: u8) => null as null,
        '%%d': null as null,
        '%%d+': null as null,
        '%%d-': null as null,
        '%%d:': (val: u8) => null as null,
    }

    // #endregion

    const __FACTORY__ = null
    // #region

    class em$oref<T> implements ref_t<T> {
        __em$class = 'em$oref'
        constructor(
            private arr: T[],
            private idx: u16,
            private cname: string
        ) {
            return new globalThis.Proxy(this, {
                get(target, prop) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        return target.arr[idx + Number(prop)]
                    }
                    return (target as any)[prop]
                },
                set(target, prop, value) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        target.arr[idx + Number(prop)] = value
                        return true
                    }
                    return false
                },
            })
        }
        get $$() {
            return this.arr[this.idx]
        }
        set $$(v: T) {
            this.arr[this.idx] = v
        }
    }

    class em$factory<T extends $struct> {
        [index: number]: T
        private $$em$config: string = 'factory'
        private elems: T[] = []
        constructor(
            private proto: T,
            private cname: string
        ) {
            return new globalThis.Proxy(this, {
                get(target, prop) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        return target.elems[Number(prop)]
                    }
                    return (target as any)[prop]
                },
            })
        }
        get $len(): u16 {
            return this.elems.length
        }
        $add(e: T) {
            this.elems.push(e)
        }
        $create(): ref_t<T> {
            this.$add(clone(this.proto))
            return new em$oref<T>(this.elems, this.elems.length - 1, this.cname)
        }
        $frame(beg: i16, len: u16 = 0) {
            return frame$create<T>(this.elems, 0, beg, len)
        }
        $null(): ref_t<T> {
            return new em$oref<T>(this.elems, -1, this.cname)
        }
        $ptr(): ptr_t<T> {
            return new em$ptr<T>(this.elems)
        }
        [Symbol.iterator](): Iterator<ref_t<T>> {
            // TODO combine with ARRAY
            let idx = 0
            let items = this.elems
            return {
                next(): IteratorResult<ref_t<T>> {
                    if (idx < items.length) {
                        let cur = idx
                        idx += 1
                        return { value: new em$ptr<T>(items, cur), done: false }
                    } else {
                        return { value: undefined as any, done: true }
                    }
                },
            }
        }
        // [Symbol.iterator](): Iterator<T> {  // TODO combine with ARRAY
        //     let idx = 0
        //     let items = this.elems
        //     return {
        //         next(): IteratorResult<T> {
        //             if (idx < items.length) {
        //                 let cur = idx
        //                 idx += 1
        //                 return { value: items[cur], done: false }
        //             }
        //             else {
        //                 return { value: undefined as any, done: true }
        //             }
        //         }
        //     }
        // }
    }

    export type factory_t<T extends $struct> = em$factory<T>

    export function $factory<T extends $struct>(
        proto: T,
        __cname?: string
    ): factory_t<T> {
        const handler = {
            get(targ: any, prop: string | symbol) {
                const idx = Number(prop)
                if (!isNaN(idx)) return targ.elems[idx]
                switch (prop) {
                    default:
                        return targ[prop]
                }
            },
            set(targ: any, prop: string | symbol, val: any) {
                const idx = Number(prop)
                if (isNaN(idx)) return false
                targ.elems[idx] = val
                return true
            },
        }
        return new globalThis.Proxy(new em$factory(proto, __cname!), handler)
    }

    // #endregion

    const __FRAME__ = null
    // #region

    class em$ptr<T> implements ptr_t<T> {
        [index: number]: T
        __em$class = 'em$ptr'
        constructor(
            private arr: T[],
            private idx: u16 = 0
        ) {
            return new globalThis.Proxy(this, {
                get(target, prop) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        return target.arr[idx + Number(prop)]
                    }
                    return (target as any)[prop]
                },
                set(target, prop, value) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        target.arr[idx + Number(prop)] = value
                        return true
                    }
                    return false
                },
            })
        }
        get $$() {
            return this.arr[this.idx]
        }
        set $$(v: T) {
            this.arr[this.idx] = v
        }
        $cur() {
            return this.idx
        }
        $dec() {
            this.idx -= 1
        }
        $inc() {
            this.idx += 1
        }
    }

    class em$ref<T> implements ref_t<T> {
        $$: T
        __em$class = 'em$ref'
        constructor(lval: T) {
            this.$$ = lval
        }
    }

    export function $ref<T>(lval: T): ref_t<T> {
        return new em$ref<T>(lval)
    }

    class em$frame<T> implements frame_t<T> {
        private items: T[]
        $start: u16
        $len: number;
        [index: number]: T
        constructor(arr: T[], start: u16, len: u16 = 0) {
            this.items = arr
            this.$start = start
            this.$len = len
            return new globalThis.Proxy(this, {
                get(target, prop) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        return target.items[start + Number(prop)]
                    }
                    return (target as any)[prop]
                },
                set(target, prop, value) {
                    if (typeof prop === 'string' && !isNaN(Number(prop))) {
                        target.items[start + Number(prop)] = value
                        return true
                    }
                    return false
                },
            })
        }
        [Symbol.iterator](): Iterator<ref_t<T>> {
            // TODO combine with ARRAY
            let idx = this.$start
            let items = this.items
            return {
                next(): IteratorResult<ref_t<T>> {
                    if (idx < items.length) {
                        let cur = idx
                        idx += 1
                        return { value: new em$ptr<T>(items, cur), done: false }
                    } else {
                        return { value: undefined as any, done: true }
                    }
                },
            }
        }
        $frame(beg: i16, len: u16 = 0): frame_t<T> {
            return frame$create<T>(this.items, this.$start, beg, len)
        }
    }

    function frame$create<T>(
        arr: T[],
        start: u16,
        beg: i16,
        len: u16
    ): frame_t<T> {
        start = beg < 0 ? arr.length + beg : start + beg
        len = len == 0 ? arr.length - start : len
        return new em$frame<T>(arr, start, len)
    }

    const __PARAM__ = null
    // #region

    class em$config_t<T> {
        private $$em$config: string = 'config'
        private val: T | null = null
        constructor(val?: T) {
            this.val = val === undefined ? null : val
        }
        get $$(): T {
            return this.val!
        }
        set $$(v: T) {
            this.val = v
        }
    }
    export function $config<T>(val?: T): em$config_t<T> & Boxed<T> {
        return new em$config_t<T>(val)
    }

    // #endregion

    const __PROXY__ = null
    // #region

    class em$proxy_t<I extends object> {
        private $$em$config: string = 'proxy'
        private bound: boolean = false
        private prx: I = isa<I>()
        private dunit: Unit | null = null
        get $$(): I {
            return this.prx
        }
        set $$(delegate: I) {
            this.prx = delegate
            this.bound = true
            if ('em$_U' in delegate) this.dunit = delegate.em$_U as Unit
        }
    }
    export function $proxy<I extends object>(): em$proxy_t<I> & Boxed<I> {
        return new em$proxy_t<I>()
    }

    export function $delegate<U extends object>(unit: U): em$proxy_t<U> {
        const prx = new em$proxy_t<U>()
        prx.$$ = unit
        return prx
    }

    // #endregion

    const __REF__ = null
    // #region

    export function ref<T>(): em$RefProto<T> {
        return new em$RefProto<T>()
    }

    export class em$RefProto<T> implements Sized {
        readonly $alignof: u16 = 4
        readonly $sizeof: u16 = 4
        constructor(public target: em$RefVal<T> | null = null) {}
    }

    export class em$RefVal<T> implements Sized {
        readonly $alignof: u16 = 4
        readonly $sizeof: u16 = 4
        constructor(public target: T | null) {}
    }

    // #endregion

    const __SCALAR__ = null
    // #region

    export type bool_t = boolean & { __bool?: never }
    export type i8 = number & { __i8?: never }
    export type i16 = number & { __i16?: never }
    export type i32 = number & { __i32?: never }
    export type u8 = number & { __u8?: never }
    export type u16 = number & { __u16?: never }
    export type u32 = number & { __u32?: never }

    export class em$Scalar<T> {
        $memory: MemInfo
        $cname: string
        private $val: T
        constructor(name: string, val: T, sz: number) {
            this.$cname = `em::${name}`
            this.$val = val
            this.$memory = { size: sz, align: sz }
        }
        get $alignof(): number {
            return this.$memory.align
        }
        get $sizeof(): number {
            return this.$memory.size
        }
        get $$(): T {
            return this.$val
        }
        set $$(val: T) {
            this.$val = val
        }
    }
    export function $bool(
        val: bool_t = false
    ): Contained<bool_t> & em$Scalar<bool_t> {
        return new em$Scalar('boot_t', val, 1)
    }
    export function $i8(val: i8 = 0): Contained<i8> & em$Scalar<i8> {
        return new em$Scalar('i8', val, 1)
    }
    export function $i16(val: i16 = 0): Contained<i16> & em$Scalar<i16> {
        return new em$Scalar('i16', val, 2)
    }
    export function $i32(val: i32 = 0): Contained<i32> & em$Scalar<i32> {
        return new em$Scalar('i32', val, 4)
    }
    export function $u8(val: u8 = 0): Contained<u8> & em$Scalar<u8> {
        return new em$Scalar('u8', val, 1)
    }
    export function $u16(val: u16 = 0): Contained<u16> & em$Scalar<u16> {
        return new em$Scalar('u16', val, 2)
    }
    export function $u32(val: u32 = 0): Contained<u32> & em$Scalar<u32> {
        return new em$Scalar('u32', val, 4)
    }

    // #endregion

    const __STRUCT__ = null
    // #region

    export type struct_t<T extends { [key: string]: any }> = T

    export abstract class $struct {
        static $make<T extends $struct>(this: { new (): T }): T {
            console.log('*** bad call to $make()')
            return new this()
        }
    }
    // #endregion

    const __TABLE__ = null
    // #region

    type TableAccess = 'ro' | 'rw'

    class em$table_t<T> {
        private $$em$config: string = 'table'
        private elems: T[] = []
        constructor(readonly access: TableAccess) {}
        get $len(): u16 {
            return this.elems.length
        }
        $add(e: T) {
            this.elems.push(e)
        }
        $frame(beg: i16, len: u16 = 0) {
            return frame$create<T>(this.elems, 0, beg, len)
        }
        $ptr(): ptr_t<T> {
            return new em$ptr<T>(this.elems)
        }
        [Symbol.iterator](): Iterator<T> {
            // TODO combine with ARRAY
            let idx = 0
            let items = this.elems
            return {
                next(): IteratorResult<T> {
                    if (idx < items.length) {
                        let cur = idx
                        idx += 1
                        return { value: items[cur], done: false }
                    } else {
                        return { value: undefined as any, done: true }
                    }
                },
            }
        }
    }
    export function $table<T>(access: TableAccess = 'rw'): table_t<T> {
        const handler = {
            get(targ: any, prop: string | symbol) {
                if (typeof prop == 'symbol') return targ[prop]
                const idx = Number(prop)
                if (!isNaN(idx)) return targ.elems[idx]
                switch (prop) {
                    default:
                        return targ[prop]
                }
            },
            set(targ: any, prop: string | symbol, val: any) {
                const idx = Number(prop)
                if (isNaN(idx)) return false
                targ.elems[idx] = val
                return true
            },
        }
        return new globalThis.Proxy(new em$table_t(access), handler)
    }

    // #endregion

    const __TEXT__ = null
    // #region

    export function t$(sa: TemplateStringsArray): em$text_t & index_t<u8> {
        return text(sa[0])
    }

    export type text_t = em$text_t & index_t<u8>

    class em$text_t {
        private str: string
        constructor(str: string) {
            this.str = str
        }
        private get $$() {
            return this.str
        }
        get $len() {
            return this.str.length
        }
        $ptr(): ptr_t<u8> {
            return new em$ptr<u8>(
                globalThis.Array.from(this.str + '\0', (ch) => ch.charCodeAt(0))
            )
        }
        [Symbol.iterator](): Iterator<u8> {
            let idx = 0
            let str = this.str
            return {
                next(): IteratorResult<u8> {
                    if (idx < str.length) {
                        let cur = idx
                        idx += 1
                        return { value: str.charCodeAt(cur), done: false }
                    } else {
                        return { value: undefined as any, done: true }
                    }
                },
            }
        }
    }
    function text(str: string): text_t {
        const handler = {
            get(targ: any, prop: string | symbol) {
                const idx = Number(prop)
                if (!isNaN(idx)) return targ.$$.charCodeAt(idx)
                switch (prop) {
                    default:
                        return targ[prop]
                }
            },
        }
        return new globalThis.Proxy(new em$text_t(str), handler)
    }

    // #endregion

    const __TRAITS__ = null
    // #region

    export type arg_t =
        | bool_t
        | i8
        | i16
        | i32
        | text_t
        | u8
        | u16
        | u32
        | cb_t<any>
        | ptr_t<any>
        | ref_t<any>

    export interface cb_t<A extends any[] = []> {
        (...args: A): void
    }

    export interface frame_t<T> extends index_t<T> {
        $len: u16
        $frame(beg: i16, len: u16): frame_t<T>
        [Symbol.iterator](): Iterator<ref_t<T>>
    }

    export interface ref_t<T> {
        $$: T
        __em$class: string
    }

    export interface ptr_t<T> extends ref_t<T>, index_t<T> {
        $cur(): u32
        $dec(): void
        $inc(): void
    }

    export type table_t<T> = em$table_t<T> & index_t<T>

    export type volatile_t<T> = T

    export interface $Reg {
        $$: number
        $: $Reg[]
    }

    export let $reg32: index_t<u32>

    export type ArrayLike<T> = index_t<T> & { $len: u16 }

    export type index_t<T> = { [index: number]: T }

    export interface Boxed<T> {
        $$: T
    }

    type Contained<T> = Boxed<T> & Sized

    interface MemInfo {
        size: number
        align: number
    }

    interface Factory {
        alignof: number
        sizeof: number
    }

    export type Sized = {
        $alignof: number
        $sizeof: number
    }

    // #endregion

    const __UNIT__ = null
    // #region

    export function $declare(kind: UnitKind, inherits?: { $U: Unit }): Unit {
        return undefined as unknown as Unit
    }

    export function __$declare(path: string, kind: UnitKind): Unit {
        if (path === undefined) return new Unit('$$anon', kind)
        const uid = `${Path.basename(Path.dirname(path!))}/${Path.basename(path!, '.em.ts')}`
        const unit = new Unit(uid, kind)
        unit_map.set(uid, unit)
        return unit
    }

    export function $clone<M extends { $clone(): any }>(
        mod: M
    ): ReturnType<M['$clone']> {
        return mod.$clone()
    }

    export function $implements<I extends { $U: Unit }>(iunit: I) {}

    export function $using<U extends object>(unit: U) {
        if ('$U' in unit) (unit['$U'] as Unit).used()
    }

    type UnitKind = 'MODULE' | 'INTERFACE' | 'COMPOSITE' | 'TEMPLATE'

    export class Unit {
        private _used: boolean = false
        constructor(
            readonly uid: string,
            readonly kind: UnitKind
        ) {}
        used() {
            this._used = true
        }
    }

    export function $units(): ReadonlyArray<UnitDesc> {
        return globalThis.Array.from(unit_map.values())
    }

    interface UnitDesc {
        readonly uid: string
        readonly kind: UnitKind
    }

    let unit_map = new Map<string, Unit>()

    // #endregion

    const __UTILS__ = null
    // #

    export function e$(sa: TemplateStringsArray): any {
        return 0
    }

    export function $property<T>(name: string, defval: T): T {
        const val = PROPS[name]
        if (val === undefined) return defval
        if (typeof defval === 'boolean') return Boolean(val) as T
        if (typeof defval === 'number') return Number(val) as T
        return val
    }

    export function* $range(
        stop: number,
        start: number = 0,
        step: number = 1
    ): Iterable<number> {
        if (step > 0) {
            for (let i = start; i < stop; i += step) yield i
        } else {
            for (let i = start; i > stop; i += step) yield i
        }
    }

    export function $sizeof<T>(required?: undefined) {
        return 0
    }

    class em$BoxedVal<T> {
        $$: T
        constructor(v: T) {
            this.$$ = v
        }
    }

    export type Unbox<T> =
        T extends em$RefProto<infer RefType>
            ? em$RefVal<Unbox<RefType>> // Force correct wrapping in `em$RefVal`
            : T extends { $$: infer U }
              ? U // Boxed scalar case
              : T extends em$ArrayProto<infer Proto>
                ? em$ArrayVal<Unbox<Proto>> // Array case
                : T extends Record<string, any>
                  ? { [K in keyof T]: Unbox<T[K]> } // Struct-like case
                  : T

    export function instantiate<T extends object>(proto: T): Unbox<T> {
        if (proto instanceof em$RefProto) {
            return new em$RefVal(null as any) as Unbox<T> // Explicit type cast
        }
        if ('$$' in proto) {
            // Boxed scalar case
            return (proto as { $$: any }).$$ as Unbox<T>
        }
        if (proto instanceof em$ArrayProto) {
            // Array case
            const len = (proto as { $len: number }).$len
            const elementProto = (proto as { $base: any }).$base
            const defaultVal = instantiate(elementProto)
            return new em$ArrayVal<Unbox<typeof elementProto>>(
                len,
                defaultVal
            ) as Unbox<T>
        }
        if (proto instanceof em$RefProto) {
            return new em$RefVal<T>(null) as unknown as Unbox<T>
        }
        throw new Error('Unsupported proto type.')
    }

    export function clone<T extends object>(obj: T): T {
        if (obj === null || typeof obj !== 'object') {
            return obj
        }
        if (globalThis.Array.isArray(obj)) {
            return obj.map((e) => clone(e)) as unknown as T
        }
        const cobj = Object.create(
            Object.getPrototypeOf(obj),
            Object.getOwnPropertyDescriptors(obj)
        )
        for (const key of Object.keys(cobj)) {
            cobj[key] = clone(cobj[key])
        }
        return cobj
    }

    export function isa<T extends object>(): T {
        return new globalThis.Proxy({} as T, {
            get(_, prop: string) {
                return (...args: any[]) => {
                    return undefined // Adjust this for specific return types if necessary
                }
            },
        })
    }

    export function printf(
        sa: TemplateStringsArray
    ): (
        a1?: arg_t,
        a2?: arg_t,
        a3?: arg_t,
        a4?: arg_t,
        a5?: arg_t,
        a6?: arg_t
    ) => void {
        function fn(
            a1?: arg_t,
            a2?: arg_t,
            a3?: arg_t,
            a4?: arg_t,
            a5?: arg_t,
            a6?: arg_t
        ) {
            console.log(sprintf(sa[0], a1, a2, a3, a4, a5, a6))
        }
        return fn
    }

    export function* range(min: number, max: number): Iterable<number> {
        for (let i = min; i < max; i++) {
            yield i
        }
    }

    export function memoryof(obj: any): MemInfo {
        if (obj === null || typeof obj !== 'object') {
            return { size: Number.NaN, align: Number.NaN }
        }
        if (obj instanceof em.em$Scalar) {
            return obj.$memory
        }
        if (obj instanceof em$ArrayProto) {
            let mi = memoryof(obj.$base)
            mi.size *= obj.$len
            return mi
        }
        let res = { size: 0, align: 0 }
        const align = (sz: number, al: number): number => {
            return (sz + al - 1) & ~(al - 1)
        }
        for (const [key, val] of Object.entries(obj as object)) {
            const mi = memoryof(val)
            if (Number.isNaN(mi.size))
                throw new Error(`*** memoryof: unsized field '${key}' `)
            if (mi.align > res.align) res.align = mi.align
            res.size = align(res.size, mi.align) + mi.size
        }
        res.size = align(res.size, res.align)
        return res
    }

    export function alignof(proto: object): number {
        return memoryof(proto).align
    }

    export function sizeof(proto: object): number {
        return memoryof(proto).size
    }

    export function $outfile(path: string, mode?: Fs.Mode): em$OutFile {
        return new em$OutFile(path, mode)
    }
    export class em$OutFile {
        static readonly TAB = 4
        private col: number
        private text: Array<string>
        constructor(
            readonly path: string,
            readonly mode?: Fs.Mode
        ) {
            this.col = 0
            this.path = path
            this.text = []
            this.mode = mode
        }
        addFile(path: string) {
            this.addText(String(Fs.readFileSync(path)))
        }
        addFrag(frag: string) {
            this.addText(frag.replaceAll(/^\s+\|-> /gm, '').trim())
            this.addText('\n')
        }
        addText(...text: string[]) {
            text.forEach((t) => this.text.push(t))
        }
        clearText(): string {
            let res = this.getText()
            this.col = 0
            this.text = []
            return res
        }
        close() {
            Fs.mkdirSync(Path.dirname(this.path), { recursive: true })
            Fs.writeFileSync(this.path, this.getText(), { mode: this.mode })
        }
        genTitle(msg: string) {
            this.print('\n// -------- %1 -------- //\n\n', msg)
        }
        getText(): string {
            return this.text.join('')
        }
        print(fmt: string, a0?: any, a1?: any, a2?: any, a3?: any) {
            let res = ''
            let idx = 0
            while (idx < fmt.length) {
                const c = fmt.charAt(idx++)
                if (c != '%') {
                    res += c
                    continue
                }
                switch (fmt.charAt(idx++)) {
                    case '%':
                        res += '%'
                        continue
                    case 't':
                        res += ' '.repeat(this.col)
                        continue
                    case '+':
                        this.col += em$OutFile.TAB
                        continue
                    case '-':
                        this.col && (this.col -= em$OutFile.TAB)
                        continue
                    case '1':
                        res += a0
                        continue
                    case '2':
                        res += a1
                        continue
                    case '3':
                        res += a2
                        continue
                    case '4':
                        res += a3
                        continue
                }
            }
            this.addText(res)
        }
    }

    // #endregion
}

declare global {
    type arg_t = em.arg_t
    type bool_t = em.bool_t
    type cb_t<A extends any[] = []> = em.cb_t<A>
    type frame_t<T> = em.frame_t<T>
    type index_t<T> = em.index_t<T>
    type i8 = em.i8
    type i16 = em.i16
    type i32 = em.i32
    type ptr_t<T> = em.ptr_t<T>
    type ref_t<T> = em.ref_t<T>
    type struct_t<T extends { [key: string]: any }> = em.struct_t<T>
    type u8 = em.u8
    type u16 = em.u8
    type u32 = em.u32
    type text_t = em.text_t
    type volatile_t<T> = em.volatile_t<T>
    const $: typeof em.$
    const $array: typeof em.$array
    const $bkpt: typeof em.$bkpt
    const $bool: typeof em.$bool
    const $cb: typeof em.$cb
    const $cb$null: typeof em.$cb$null
    const $clone: typeof em.$clone
    const $delegate: typeof em.$delegate
    const $factory: typeof em.$factory
    const $implements: typeof em.$implements
    const $i8: typeof em.$i8
    const $i16: typeof em.$i16
    const $i32: typeof em.$i32
    const $null: any
    const $outfile: typeof em.$outfile
    const $config: typeof em.$config
    const $property: typeof em.$property
    const $proxy: typeof em.$proxy
    const $range: typeof em.$range
    const $ref: typeof em.$ref
    const $sizeof: typeof em.$sizeof
    const $struct: typeof em.$struct
    const $table: typeof em.$table
    const $u8: typeof em.$u8
    const $u16: typeof em.$u16
    const $u32: typeof em.$u32
    const $using: typeof em.$using
    const fail: typeof em.fail
    const halt: typeof em.halt
    const printf: typeof em.printf
    const c$: typeof em.c$
    const e$: typeof em.e$
    const t$: typeof em.t$
}

Object.assign(globalThis, {
    $: em.$,
    $array: em.$array,
    $bkpt: em.$bkpt,
    $bool: em.$bool,
    $cb: em.$cb,
    $cb$null: em.$cb$null,
    $clone: em.$clone,
    $delegate: em.$delegate,
    $factory: em.$factory,
    $implements: em.$implements,
    $i8: em.$i8,
    $i16: em.$i16,
    $i32: em.$i32,
    $null: null as any,
    $outfile: em.$outfile,
    $config: em.$config,
    $property: em.$property,
    $proxy: em.$proxy,
    $range: em.$range,
    $ref: em.$ref,
    $sizeof: em.$sizeof,
    $struct: em.$struct,
    $table: em.$table,
    $using: em.$using,
    $u8: em.$u8,
    $u16: em.$u16,
    $u32: em.$u32,
    fail: em.fail,
    halt: em.halt,
    printf: em.printf,
    c$: em.c$,
    e$: em.e$,
    t$: em.t$,
})

export default em
