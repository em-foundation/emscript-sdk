#ifndef emscript__M
#define emscript__M

#include <stddef.h>
#include <stdint.h>

namespace std {
    typedef decltype(nullptr) nullptr_t;
}
using ::std::nullptr_t;

static void em__fail();
static void em__halt();

namespace em {

    using i8 = int8_t;
    using i16 = int16_t;
    using i32 = int32_t;

    using u8 = uint8_t;
    using u16 = uint16_t;
    using u32 = uint32_t;

    using arg_t = uint32_t;

    using bool_t = bool;

    auto null = nullptr;
    auto $null = nullptr;
    typedef decltype(nullptr) null_t;

    template <typename T> struct frame_t {
        static frame_t<T> create(T arr[], u16 dim, i16 beg, u16 len) {
            auto idx = (u16)((beg < 0) ? dim + beg : beg);
            len = (len == 0) ? dim - idx : len;
            return frame_t(&arr[idx], len);
        }
        T* $start;
        u16 $len;
        constexpr frame_t(T* start, u16 len) : $start (start), $len (len) {}
        T &operator[](u16 index) { return *($start + index); }
        const T &operator[](u16 index) const { return *($start + index); }
        frame_t<T> $frame(i16 beg, u16 len = 0) { return create($start, $len, beg, len); }
        struct Iterator {
            T*current;
            constexpr Iterator(T* ptr) : current(ptr) {}
            T operator*() const { return (T)(*current); }
            Iterator &operator++() { ++current; return *this; }
            bool operator!=(const Iterator &other) const { return current != other.current; }
        };
        constexpr Iterator begin() { return Iterator($start); }
        constexpr Iterator end() { return Iterator($start + $len); }

    };

    template <typename T> struct index_t {
        T* p_;
        constexpr index_t(T* v = null) : p_ (v) {}
        constexpr index_t(u32 a) : p_((T*)a) {}
        T &operator[](u16 index) { return *(p_ + index); }
        const T &operator[](u16 index) const { return *(p_ + index); }
        operator arg_t() const { return (arg_t)(p_); }
    };

    template <typename T> struct config {
        T $$;
        constexpr config(T v) : $$(v) {}
    };

    template <typename T> struct ptr_t {
        T* p_;
        constexpr ptr_t(T* v = null) : p_ (v) {}
        constexpr ptr_t(u32 a) : p_((T*)a) {}
        T& operator*() const { return *p_; }
        T &operator[](u16 index) { return *(p_ + index); }
        const T &operator[](u16 index) const { return *(p_ + index); }
        operator arg_t() const { return (arg_t)(p_); }
        arg_t $cur() const { return (arg_t)(p_); }
        void $dec() { p_ -= 1; }
        void $inc() { p_ += 1; }
    };

    template <typename T> struct ref_t {
        T* $$;
        constexpr ref_t(T* lval = null) : $$ (lval) {}
        T& operator*() const { return *$$; }
        T* operator->() const { return $$; }
        operator arg_t() const { return (arg_t)($$); }
        explicit operator bool() const { return $$ != null; }
        bool operator==(null_t) const { return $$ == null; }
        bool operator!=(null_t) const { return $$ != null; }
    };

    template <typename T>
    constexpr ref_t<T> $ref(T& lval) { // Template the factory function and pass by reference
        return ref_t<T>(&lval);
    }    

    template <typename T, u16 N> struct table_ro {
        T $$[N];
        static constexpr u16 $len = N;
        inline const T &operator[](u16 index) const { return $$[index]; }
        const frame_t<T> $frame(i16 beg, u16 len = 0) const { return frame_t<T>::create($$, $len, beg, len); }
        operator frame_t<T>() const { return $frame(0, 0); }
    };

    template <typename T, u16 N> struct table_rw {
        T $$[N];
        static constexpr u16 $len = N;
        inline T &operator[](u16 index) { return $$[index]; }
        inline const T &operator[](u16 index) const { return $$[index]; }
        frame_t<T> $frame(i16 beg, u16 len = 0) { return frame_t<T>::create($$, $len, beg, len); }
        operator frame_t<T>() { return $frame(0, 0); }
        ptr_t<T> $ptr() { return ptr_t<T>(&$$[0]); }
    };

    template <typename T, u16 N> struct factory {
        T $$[N];
        static constexpr u16 $len = N;
        inline const T &operator[](u16 index) const { return $$[index]; }
        inline T &operator[](u16 index) { return $$[index]; }
        frame_t<T> $frame(i16 beg, u16 len = 0) { return frame_t<T>::create($$, $len, beg, len); }
        operator frame_t<T>() { return $frame(0, 0); }
        ref_t<T> $null() { return ref_t<T>(); }
        ptr_t<T> $ptr() { return ptr_t<T>(&$$[0]); }
        struct Iterator {
            T* ptr;
            constexpr Iterator(T *ptr) : ptr(ptr) {}
            ref_t<T> operator*() const { return ref_t<T>(ptr); }
            Iterator &operator++() { ++ptr; return *this; }
            bool operator!=(const Iterator &other) const { return ptr != other.ptr; }
        };
        constexpr Iterator begin() { return Iterator(&$$[0]); }
        constexpr Iterator end() { return Iterator(&$$[$len]); }
    };

    struct text_t {
        const char *str;
        em::u16 $len;
        constexpr text_t(const char *s, em::u16 l) : str(s), $len(l) {}
        const em::u8 operator[](em::u16 index) const { return str[index]; }
        operator arg_t() const { return (arg_t)(str); }
        struct Iterator {
            const char *current;
            constexpr Iterator(const char *ptr) : current(ptr) {}
            em::u8 operator*() const { return static_cast<em::u8>(*current); }
            Iterator &operator++() { ++current; return *this; }
            bool operator!=(const Iterator &other) const { return current != other.current; }
        };
        constexpr Iterator begin() const { return Iterator(str); }
        constexpr Iterator end() const { return Iterator(str + $len); }
        ptr_t<u8> $ptr() const { return ptr_t<u8>((u8*)str); }

    };
    text_t text(const char *str, u16 len) { return text_t(str, len); }

    template <typename T> using volatile_t = volatile T;

    static inline volatile u32 *$reg32(u32 addr) {
        return (volatile u32 *)addr;
    }

    static inline void fail() { em__fail(); }
    static inline void halt() { em__halt(); }
}; // namespace em

#endif // emscript__M
