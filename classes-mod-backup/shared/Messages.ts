@Message
export class powerUpdate {
    @MsgPrimitive
        powerCnt: uint32 = 0;
}

@Message
export class resetFrame {
    @MsgPrimitive
        powerCnt: uint32 = 0;
}