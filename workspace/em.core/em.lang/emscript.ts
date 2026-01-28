import * as Fs from 'fs'
import * as Path from 'path'
import { sprintf } from 'sprintf-js'
import * as Yaml from 'js-yaml'

const PATH = 'workspace/.emscript/props.json'
const PROPS = Fs.existsSync(PATH)
    ? JSON.parse(String(Fs.readFileSync(PATH)))
    : {}

namespace em {

    const __BOARDS__ = null
    // #region

    function deepAssign<T extends object>(target: T, source: Partial<T>): T {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                target[key] = deepAssign(
                    (target[key] as object) ?? {},
                    source[key] as object
                ) as T[typeof key]
            } else {
                target[key] = source[key] as T[typeof key]
            }
        }
        return target
    }

    export function $board<T extends Object>(proto: T): T {
        const path = Path.join($property('em.lang.Distro', '').replace('://', '/'), 'em-boards')
        const brd: string = $property('em.lang.BoardKind', '')
        const yobj = Yaml.load(String(Fs.readFileSync(path))) as Object
        const bobj = (yobj as Record<string, Object>)[brd] as T
        let res = clone(proto) as T
        return deepAssign(res, bobj)
    }

    export function $isbare(): boolean {
        const brd: string = $property('em.lang.BoardKind', '')
        return brd == '<bare-metal>'
    }

    // #endregion

    const __CB__ = null
    // #region

    export interface cb_t<A extends any[] = []> {
        (...args: A): void
    }

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

    // #endregion

    const __CHAR__ = null
    // #region

    export function c$(sa: TemplateStringsArray): em.u8 {
        return sa[0].charCodeAt(0)
    }

    // #endregion

    const __CONFIG__ = null
    // #region

    type em$config_t<T> = T & { $$val: T }

    export function $config<T>(initval?: T, $type?: never, $uid?: never): em$config_t<T> {
        const has_uid = $uid !== undefined
        const t = has_uid ? ($type as unknown as string) : (initval as string)
        const u = has_uid ? ($uid as unknown as string) : ($type as unknown as string)
        let curval = has_uid ? initval : (undefined as T)
        let prx = new Proxy({} as any, {
            get(_, prop) {
                if (prop === '$$val') return curval
                if (prop === '_$$init') return () => { curval = curval ?? defaultAux(t, u) }
                if (prop === '$$em$config') return 'param'
                if (prop === Symbol.toPrimitive) return () => curval
                if (prop === 'valueOf') return () => curval
                if (prop === 'toString') return () => String(curval)
                return (curval as any)[prop]
            },
            set(_, prop, val) {
                if (prop === '$$val') {
                    curval = val
                    return true
                }
                if (typeof curval === 'object' && curval !== null) {
                    return Reflect.set(curval, prop, val)
                }
                return false
            }
        })
        return prx
    }

    // #endregion

    const __DEBUG__ = null
    // #region

    export const $bkpt = e$`asm volatile("asm")`

    export function fail() { }
    export function halt() { }

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

    const __FRAME__ = null
    // #region

    export interface frame_t<T> extends index_t<T> {
        $len: u16
        $frame(beg: i16, len: u16): frame_t<T>
        [Symbol.iterator](): Iterator<ptr_t<T>>
    }

    class em$frame<T> implements frame_t<T> {
        __em$class = 'em$frame'
        __$type: string
        private items: T[]
        $start: u16
        $len: number;
        [index: number]: T
        constructor(arr: T[], start: u16, len: u16, $type: string = '') {
            this.items = arr
            this.$start = start
            this.$len = len
            this.__$type = $type
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
        [Symbol.iterator](): Iterator<ptr_t<T>> {
            let idx = this.$start
            let items = this.items
            return {
                next(): IteratorResult<ptr_t<T>> {
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

    export function $frame<T>(arr: T[], $type?: never): frame_t<T> {
        return new em$frame<T>(arr, 0, 0, <string>($type as unknown))
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

    // #endregion

    const __PROXY__ = null
    // #region

    type em$proxy_t<I> = I & { $$dlg: I }

    export function $delegate<U extends object>(unit: U): em$proxy_t<U> {
        const prx = $proxy<U>()
        prx.$$dlg = unit
        return prx
    }

    export function $proxy<I extends object>(unit?: I): em$proxy_t<I> {
        let bound = false
        let del = isa<I>()
        let dunit: Unit | null = null
        let prx = new Proxy({} as any, {
            get(_, prop) {
                if (prop === 'bound') return bound
                if (prop === '$$dlg') return del
                if (prop === '$$em$config') return 'proxy'
                if (prop === 'toString') return () => dunit?.uid
                return (del as any)[prop]
            },
            set(_, prop, val) {
                if (prop === '$$dlg') {
                    bound = true
                    del = val
                    dunit = '$U' in del ? (del.$U as Unit) : null
                    return true
                }
                return false
            }
        })
        return prx
    }

    // #endregion

    const __PTR__ = null
    // #region

    export interface ref_t<T> {
        $$: T
        __em$class: string
    }

    export type $$<T> = ref_t<T>

    export type index_t<T> = { [index: number]: T }

    export interface ptr_t<T> extends ref_t<T>, index_t<T> {
        $cur(): u32
        $dec(): void
        $inc(): void
    }

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

    class em$ptr<T> implements ptr_t<T> {
        [index: number]: T
        __em$class = 'em$ptr'
        constructor(private arr: T[], private idx: u16 = 0) {
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

    type eref_t<T> = T & { $test: bool_t }

    function em$eref<T>(arr: T[], idx: i16, cn: string): eref_t<T> {
        let _e = (idx >= 0 && idx < arr.length) ? arr[idx] : null
        let prx = new Proxy({} as any, {
            get(_, prop) {
                if (prop === '$test') return _e !== null
                if (prop === '$cname') return cn
                if (prop === '$idx') return idx
                if (prop === '__em$class') return 'em$eref'
                return (_e as any)[prop]
            },
            set(_, prop, val) {
                if (typeof _e === 'object' && _e !== null) {
                    return Reflect.set(_e, prop, val)
                }
                return false
            }
        })
        return prx
    }

    // #endregion

    const __REG__ = null
    // #region

    export interface $Reg {
        $$: number
        $h: number
        $: $Reg[]
    }

    export let $reg16: index_t<u16>
    export let $reg32: index_t<u32>

    // #endregion

    const __RTT__ = null
    // #region

    const typeDefaults: ReadonlyMap<string, any> = new Map<string, any>([
        ['bool_t', false],
        ['cb_t', $cb$null()],
        ['i8', 0],
        ['i16', 0],
        ['i32', 0],
        ['i64', 0],
        ['ptr_t', null],
        ['ref_t', null],
        ['u8', 0],
        ['u16', 0],
        ['u32', 0],
        ['u64', 0],
    ])

    function defaultAux(type: string, uid: string): any {
        if (type === 'unknown') {
            return undefined
        }
        if (type.match(/^\w+$/)) {
            const val = typeDefaults.get(type)
            if (val !== undefined) {
                return val
            }
            type = `@${uid}:${type}`
        }
        let tn: string | undefined
        while (true) {
            const m = type.match(/^\@(.+)\:(\w+)$/)
            if (!m) break
            uid = m[1]
            tn = m[2]
            type = $$tdefs.get(type.slice(1)) ?? 'unknown'
        }
        if (type.match(/^\w+$/)) {
            return defaultAux(type, uid)
        }
        if (type.startsWith('[')) {

        }
        if (type.match(/^\[|\{/) && tn) {
            const uobj = $$units.get(uid)!
            if (tn in uobj) {
                return uobj[tn].$make()
            }
        }
        return undefined
    }

    export function $default<T>($type?: never, $uid?: never): T {
        return defaultAux($type as unknown as string, $uid as unknown as string) as T
    }

    const typeSizes: ReadonlyMap<string, number> = new Map([
        ['bool_t', 1],
        ['cb_t', 4],
        ['i8', 1],
        ['i16', 2],
        ['i32', 4],
        ['i64', 8],
        ['ptr_t', 4],
        ['ref_t', 4],
        ['u8', 1],
        ['u16', 2],
        ['u32', 4],
        ['u64', 8],
    ])

    function sizeofAux(type: string, uid: string, align: number): [number, number] {
        if (type.match(/^\w+$/)) {
            const sz = typeSizes.get(type)
            if (sz) {
                return [sz, sz]
            }
            type = `@${uid}:${type}`
        }
        let tn: string | undefined
        while (true) {
            const m = type.match(/^\@(.+)\:(\w+)$/)
            if (!m) break
            uid = m[1]
            tn = m[2]
            type = $$tdefs.get(type.slice(1)) ?? 'unknown'
        }
        if (type.match(/^\w+$/)) {
            return sizeofAux(type, uid, align)
        }
        if (type.startsWith('[') && tn) {
            const uobj = $$units.get(uid)!
            if (tn in uobj) {
                const [sz, al] = sizeofAux(type.slice(1), uid, align)
                return [(new uobj[tn]).$len * sz, al]
            }
        }
        if (type.startsWith('{')) {
            let size = 0
            let d = 0
            for (const ft of type.slice(1).split(',')) {
                const [sz, al] = sizeofAux(ft, uid, align)
                d = size % al
                if (d != 0) {
                    size += al - d
                }
                size += sz
                align = Math.max(al, align)
            }
            d = size % align
            if (d != 0) {
                size += align - d
            }
            return [size, align]
        }
        return [Number.NaN, align]
    }

    export function $sizeof<T>($type?: never, $uid?: never): u16 {
        const [sz, al] = sizeofAux($type as unknown as string, $uid as unknown as string, -1)
        return sz
    }

    // #endregion

    const __SCALAR__ = null
    // #region

    export type bool_t = boolean & { __bool?: never }
    export type f32 = number & { __f32?: never }
    export type i8 = number & { __i8?: never }
    export type i16 = number & { __i16?: never }
    export type i32 = number & { __i32?: never }
    export type i64 = number & { __i64?: never }
    export type u8 = number & { __u8?: never }
    export type u16 = number & { __u16?: never }
    export type u32 = number & { __u32?: never }
    export type u64 = number & { __u64?: never }

    export type arg_t =
        | bool_t
        | f32
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

    export type volatile_t<T> = T

    // #endregion

    const __STRUCT__ = null
    // #region

    export abstract class $struct {
        static $make<T extends $struct>(this: { new(): T }): T {
            console.log('*** bad call to $make()')
            return new this()
        }
        static $$ = $struct.prototype
    }
    // #endregion

    const __TABLE__ = null
    // #region

    export type table_t<T> = em$table_t<T> & index_t<T>

    type TableAccess = 'ro' | 'rw'

    class em$table_t<T> {
        private $$em$config: string = 'table'
        private elems: T[] = []
        constructor(readonly access: TableAccess, readonly cname: string, readonly $t: string, readonly $u: string) { }
        get $len(): u16 {
            return this.elems.length
        }
        $$add(e?: T): ref_t<T> {
            e = e ?? defaultAux(this.$t, this.$u) as T
            this.elems.push(e)
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
        $ref(idx: u16): ref_t<T> {
            return new em$oref<T>(this.elems, idx, this.cname)
        }
        [Symbol.iterator](): Iterator<ref_t<T>> {
            // TODO combine with ARRAY
            let idx = 0
            let elems = this.elems
            let cn = this.cname
            return {
                next(): IteratorResult<ref_t<T>> {
                    if (idx < elems.length) {
                        let cur = idx
                        idx += 1
                        return { value: new em$oref<T>(elems, idx, cn), done: false }
                    } else {
                        return { value: undefined as any, done: true }
                    }
                },
            }
        }
    }
    export function $table<T>(access?: never, cname?: never, $type?: never, $uid?: never): table_t<T> {
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
        const acc = access as unknown as TableAccess
        const cn = cname as unknown as string
        const $t = $type as unknown as string
        const $u = $uid as unknown as string
        return new globalThis.Proxy(new em$table_t(acc, cn, $t, $u), handler)
    }

    // #endregion

    const __TEXT__ = null
    // #region

    export type text_t = em$text_t & index_t<u8>

    export function t$(sa: TemplateStringsArray): text_t {
        return text(sa[0])
    }

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

    export function $implements<I extends { $U: Unit }>(iunit: I) { }

    export function $using<U extends object>(unit: U) {
        if ('$U' in unit) (unit['$U'] as Unit).used()
    }

    type UnitKind = 'MODULE' | 'INTERFACE' | 'COMPOSITE' | 'TEMPLATE'

    export class Unit {
        private _aux_c: boolean = false
        private _aux_h: boolean = false
        private _used: boolean = false
        constructor(
            readonly uid: string,
            readonly kind: UnitKind
        ) { }
        auxC() { this._aux_c = true }
        auxH() { this._aux_h = true }
        used(b?: boolean) {
            this._used = b ?? true
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
    // #region

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

    export function $range(stop: number): Iterable<number>
    export function $range(start: number, stop: number, step?: number): Iterable<number>
    export function* $range(
        a: number,
        b?: number,
        c?: number
    ): Iterable<number> {
        const start = (b === undefined) ? 0 : a
        const stop = (b === undefined) ? a : b
        const step = (c === undefined) ? 1 : c
        if (step > 0) {
            for (let i = start; i < stop; i += step) yield i
        } else {
            for (let i = start; i > stop; i += step) yield i
        }
    }

    function clone<T extends object>(obj: T): T {
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

    const __VECTOR__ = null
    // #region

    export type dim_t<T, N extends number> = T[]

    export class $vector<T> implements frame_t<T> {
        __em$class = 'em$vector'
        $len: u16
        [index: number]: T
        private _elem_rtt: string
        private items: globalThis.Array<T>
        static $make<T>(this: { new(): T }): T {
            const handler = {
                get(targ: any, prop: string | symbol) {
                    if (typeof prop == 'symbol') return targ[prop]
                    const idx = Number(prop)
                    if (!isNaN(idx)) return targ.items[idx]
                    switch (prop) {
                        default:
                            return targ[prop]
                    }
                },
                set(targ: any, prop: string | symbol, val: any) {
                    const idx = Number(prop)
                    if (isNaN(idx)) return false
                    targ.items[idx] = val
                    return true
                },
            }
            let o = new this() as any
            o.items = Array.from({ length: o.$len })
            const [t, u] = (o._elem_rtt as string).split('|')
            for (let i = 0; i < o.$len; i++) {
                o.items[i] = defaultAux(t, u)
            }
            return new globalThis.Proxy(o, handler)
        }
        [Symbol.iterator](): Iterator<ptr_t<T>> {
            // TODO combine with FRAME
            let idx = 0
            let items = this.items
            return {
                next(): IteratorResult<ptr_t<T>> {
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
}

declare global {
    type arg_t = em.arg_t
    type bool_t = em.bool_t
    type cb_t<A extends any[] = []> = em.cb_t<A>
    type dim_t<T, N extends number> = em.dim_t<T, N>
    type frame_t<T> = em.frame_t<T>
    type f32 = em.f32
    type index_t<T> = em.index_t<T>
    type i8 = em.i8
    type i16 = em.i16
    type i32 = em.i32
    type i64 = em.i64
    type ptr_t<T> = em.ptr_t<T>
    type ref_t<T> = em.ref_t<T>
    type ref2_t<T> = T & { $obj: T }
    type eref_t<T> = T & {}
    type u8 = em.u8
    type u16 = em.u8
    type u32 = em.u32
    type u64 = em.u64
    type text_t = em.text_t
    type volatile_t<T> = em.volatile_t<T>
    type $$<T> = em.$$<T>
    type $Reg = em.$Reg
    const $: typeof em.$
    const $bkpt: typeof em.$bkpt
    const $board: typeof em.$board
    const $cb: typeof em.$cb
    const $cb$null: typeof em.$cb$null
    const $clone: typeof em.$clone
    const $config: typeof em.$config
    const $declare: typeof em.$declare
    const $default: typeof em.$default
    const $delegate: typeof em.$delegate
    const $frame: typeof em.$frame
    const $implements: typeof em.$implements
    const $isbare: typeof em.$isbare
    const $null: any
    const $outfile: typeof em.$outfile
    const $property: typeof em.$property
    const $proxy: typeof em.$proxy
    const $range: typeof em.$range
    const $ref: typeof em.$ref
    const $reg16: typeof em.$reg16
    const $reg32: typeof em.$reg32
    const $sizeof: typeof em.$sizeof
    const $sprintf: typeof sprintf
    const $struct: typeof em.$struct
    const $table: typeof em.$table
    const $using: typeof em.$using
    const $vector: typeof em.$vector
    const fail: typeof em.fail
    const halt: typeof em.halt
    const printf: typeof em.printf
    const c$: typeof em.c$
    const e$: typeof em.e$
    const t$: typeof em.t$
    const $$tdefs: Map<string, string>
    const $$units: Map<string, any>
    const __$declare: typeof em.__$declare
}

Object.assign(globalThis, {
    $: em.$,
    $bkpt: em.$bkpt,
    $board: em.$board,
    $cb: em.$cb,
    $cb$null: em.$cb$null,
    $clone: em.$clone,
    $config: em.$config,
    $declare: em.$declare,
    $default: em.$default,
    $delegate: em.$delegate,
    $frame: em.$frame,
    $implements: em.$implements,
    $isbare: em.$isbare,
    $null: null as any,
    $outfile: em.$outfile,
    $property: em.$property,
    $proxy: em.$proxy,
    $range: em.$range,
    $ref: em.$ref,
    $sizeof: em.$sizeof,
    $sprintf: sprintf,
    $struct: em.$struct,
    $table: em.$table,
    $using: em.$using,
    $vector: em.$vector,
    fail: em.fail,
    halt: em.halt,
    printf: em.printf,
    c$: em.c$,
    e$: em.e$,
    t$: em.t$,
    __$declare: em.__$declare,
})

export default em
