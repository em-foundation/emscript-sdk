import '@$$emscript'
export const $U = $declare('MODULE')

// TODO: Trim*

export const EventNone = (0 << 0)   /*!< No events */
export const EventOpDone = (1 << 0)   /*!< The PBE operation has finished */
export const EventPingRsp = (1 << 1)   /*!< When receiving a CMD_PING, PBE responds with a PINGRSP. */
export const EventRxCtrl = (1 << 2)   /*!< LL control packet received correctly */
export const EventRxCtrlAck = (1 << 3)   /*!< LL control packet received with CRC OK, not to be ignored, then acknowledgement sent */
export const EventRxNok = (1 << 4)   /*!< Packet received with CRC error */
export const EventRxIgnored = (1 << 5)   /*!< Packet received, but may be ignored by MCU */
export const EventRxEmpty = (1 << 6)   /*!< Empty packet received */
export const EventRxBufFull = (1 << 7)   /*!< Packet received which did not fit in the RX FIFO and was not to be discarded.  */
export const EventRxOk = (1 << 8)   /*!< Packet received with CRC OK and not to be ignored by the MCU */
export const EventTxCtrl = (1 << 9)   /*!< Transmitted LL control packet */
export const EventTxCtrlAckAck = (1 << 10)  /*!< Acknowledgement received on a transmitted LL control packet, and acknowledgement transmitted for that packet */
export const EventTxRetrans = (1 << 11)  /*!< Packet retransmitted with same SN */
export const EventTxAck = (1 << 12)  /*!< Acknowledgement transmitted, or acknowledgement received on a transmitted packet. */
export const EventTxDone = (1 << 13)  /*!< Packet transmitted */
export const EventTxCtrlAck = (1 << 14)  /*!< Acknowledgement received on a transmitted LL control packet */
export const EventOpError = (1 << 15)  /*!< Something went awfully wrong, the reason is indicated in RAM-based register BLE_ENDCAUSE. */
export const EventRxfifo = (1 << 16)  /*!< Event from fifo, triggered when crossing threshold. Normal use for rxfifo is to generate IRQ when crossing threshold upwards (filling fifo). But downwards is also possible to configure, could be use case for using both fifos for TX or both for RX */
export const EventTxfifo = (1 << 17)  /*!< Event from fifo, triggered when crossing threshold. Normal use for txfifo is to generate IRQ when crossing threshold downwards (emptying fifo). But upwards is also possible to configure, could be use case for using both fifos for TX or both for RX */
export const EventLossOfLock = (1 << 18)  /*!< LOSS_OF_LOCK event */
export const EventLock = (1 << 19)  /*!< LOCK event */
export const EventRfesoft0 = (1 << 20)  /*!< RFESOFT0 event */
export const EventRfesoft1 = (1 << 21)  /*!< RFESOFT1 event */
export const EventRfedone = (1 << 22)  /*!< RFEDONE event */
export const EventMdmsoft0 = (1 << 23)  /*!< MDMSOFT event */
export const EventMdmsoft1 = (1 << 24)  /*!< MDMSOFT1 event */
export const EventMdmsoft2 = (1 << 25)  /*!< MDMSOFT event */
export const EventMdmout = (1 << 26)  /*!< MDMOUT event */
export const EventMdmin = (1 << 27)  /*!< MDMIN event */
export const EventMdmdone = (1 << 28)  /*!< MDMDONE event */
export const EventSystim0 = (1 << 29)  /*!< SYSTIM0 event */
export const EventSystim1 = (1 << 30)  /*!< SYSTIM1 event */
export const EventSystim2 = (1 << 31)  /*!< SYSTIM2 event */




export interface PowerTableEntry {
    power: {
        fraction: u8,
        dBm: u8,
    },
    tempCoeff: u8,
    value: {
        bits: {
            reserved: u16,
            ib: u16,
            gain: u16,
            mode: u16,
            noIfampRfLdoBypass: u16,
        },
        raw: u16,
    },
}

export declare const POWER_TABLE: frame_t<PowerTableEntry>

export namespace em$meta {
    export function em$construct() {
        $U.auxH()
    }
}

//>> ---- em$targ ---- <<//
