#include <stdint.h>

#include <../em.core/em.lang/emscript.hpp>

struct LRF_Trim0 {
    uint16_t pa0;
    uint16_t atstRefH;
};

struct LRF_Trim1 {
    uint16_t lna;
    uint16_t ifampRfLdo;
    struct {    // length: 2B
        uint16_t zero0          : 8;
        uint16_t voutTrim       : 7;
        uint16_t zero1          : 1;
    } divLdo;
    struct {    // length: 2B
        uint16_t zero0          : 8;
        uint16_t voutTrim       : 7;
        uint16_t zero1          : 1;
    } tdcLdo;
};

struct LRF_Trim2 {
    uint16_t dcoLdo0;
    uint16_t ifadcAldo;
    uint16_t ifadcDldo;
    struct {    // length: 2B
        uint16_t zero0          : 3;
        uint16_t tailresTrim    : 4;
        uint16_t zero1          : 9;
    } dco;
};

struct LRF_Trim_Variant {
    uint16_t ifadcQuant;
    uint16_t ifadc0;
    uint16_t ifadc1;
    uint16_t ifadclf;
};

struct LRF_Trim_tempLdoRtrim {
    uint16_t rtrimMinOffset : 2;
    uint16_t rtrimMaxOffset : 2;
    uint16_t divLdoMinOffset: 2;
    uint16_t divLdoMaxOffset: 2;
    uint16_t tdcLdoMinOffset: 2;
    uint16_t tdcLdoMaxOffset: 2;
    uint16_t tThrl          : 2;
    uint16_t tThrh          : 2;
};

struct  LRF_Trim_tempRssiAgc {
    int32_t rssiTcomp      : 4;
    int32_t magnTcomp      : 4;
    int32_t magnOffset     : 4;
    int32_t rfu            : 4;
    int32_t agcThrTcomp    : 4;
    int32_t agcThrOffset   : 4;
    int32_t lowGainOffset  : 4;
    int32_t highGainOffset : 4;
};

struct LRF_Trim3 {
    struct {    // length: 4B
        LRF_Trim_tempLdoRtrim tempLdoRtrim;
        uint8_t hfxtPdError;
        uint8_t res;
    } lrfdrfeExtTrim1;                  /* Revision >= 4 only */
    // Trim values for synth divider 0
    LRF_Trim_tempRssiAgc lrfdrfeExtTrim0;
};

struct LRF_Trim4 {
    int8_t   rssiOffset;
    uint8_t  trimCompleteN;
    uint16_t demIQMC0;
    uint16_t res1;
    uint8_t  ifamprfldo[2];
};

struct LRF_TrimDef {
    uint8_t             revision;           /* Revision of appTrims */
    uint8_t             nToolsClientOffset;
    uint8_t             reserved[2];
    LRF_Trim0           trim0;
    LRF_Trim1           trim1;
    LRF_Trim2           trim2;
    LRF_Trim_Variant    trimVariant[2];
    LRF_Trim3           trim3;
    LRF_Trim4           trim4;
};

const auto LRF_TRIMS = (LRF_TrimDef *volatile)0x4E000330;

namespace ti_radio_cc23xx_LRF {

struct PowerTableEntry  {
    struct {
        uint8_t fraction: 1;
        int8_t dBm: 7;
    } power;
    uint8_t tempCoeff;
    union {
        struct {
            uint16_t reserved: 5;
            uint16_t ib: 6;
            uint16_t gain: 3;
            uint16_t mode: 1;
            uint16_t noIfampRfLdoBypass: 1;
        } bits;
        uint16_t raw;
    } value;
};

const PowerTableEntry POWER_TABLE_ENTRIES[] = {
    { .power = { .fraction = 0, .dBm = -20 }, .tempCoeff = 0, .value = { .bits = { .reserved = 0, .ib = 18, .gain = 0, .mode = 0, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = -16 }, .tempCoeff = 0, .value = { .bits = { .reserved = 0, .ib = 20, .gain = 1, .mode = 0, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = -12 }, .tempCoeff = 5, .value = { .bits = { .reserved = 0, .ib = 17, .gain = 3, .mode = 0, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = -8 }, .tempCoeff = 12, .value = { .bits = { .reserved = 0, .ib = 17, .gain = 4, .mode = 0, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = -4 }, .tempCoeff = 25, .value = { .bits = { .reserved = 0, .ib = 17, .gain = 5, .mode = 0, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 0 }, .tempCoeff = 40, .value = { .bits = { .reserved = 0, .ib = 19, .gain = 6, .mode = 0, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 1 }, .tempCoeff = 65, .value = { .bits = { .reserved = 0, .ib = 30, .gain = 6, .mode = 0, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 2 }, .tempCoeff = 41, .value = { .bits = { .reserved = 0, .ib = 39, .gain = 4, .mode = 1, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 3 }, .tempCoeff = 43, .value = { .bits = { .reserved = 0, .ib = 31, .gain = 5, .mode = 1, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 4 }, .tempCoeff = 50, .value = { .bits = { .reserved = 0, .ib = 37, .gain = 5, .mode = 1, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 5 }, .tempCoeff = 55, .value = { .bits = { .reserved = 0, .ib = 27, .gain = 6, .mode = 1, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 6 }, .tempCoeff = 75, .value = { .bits = { .reserved = 0, .ib = 38, .gain = 6, .mode = 1, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 7 }, .tempCoeff = 80, .value = { .bits = { .reserved = 0, .ib = 25, .gain = 7, .mode = 1, .noIfampRfLdoBypass = 0 } } },
    { .power = { .fraction = 0, .dBm = 8 }, .tempCoeff = 180, .value = { .bits = { .reserved = 0, .ib = 63, .gain = 7, .mode = 1, .noIfampRfLdoBypass = 0 } } },
};

const auto POWER_TABLE_$len = sizeof(POWER_TABLE_ENTRIES) / sizeof(PowerTableEntry);

const auto POWER_TABLE = em::frame_t<const PowerTableEntry>(POWER_TABLE_ENTRIES, POWER_TABLE_$len);


};
