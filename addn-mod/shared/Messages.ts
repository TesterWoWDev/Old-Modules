export const creatureNameMessageID = 1;
export class creatureNameMessage {
    isName: uint32 = 1;
    entry: string = "name";

    constructor(isName: uint32, entry: string) {
        this.isName = isName;
        this.entry = entry;
    }

    read(read: TSPacketRead): void {
        this.isName = read.ReadUInt32();
        this.entry = read.ReadString();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(creatureNameMessageID, 2000);
        packet.WriteUInt32(this.isName);
        packet.WriteString(this.entry);
        return packet;
    }
}

export const itemLootMessageID = 2;
export class itemLootMessage {
    size: uint32 = 0;
    entryID: uint32 = 0;
    arr: TSArray<TSArray<double>> = [<TSArray<double>>[1, 1, 1, 1]];
    constructor() {
        this.size = 0;
        this.entryID = 0;
        this.arr = <TSArray<TSArray<double>>>[<TSArray<double>>[1, 1, 1, 1]];
    }
    read(read: TSPacketRead): void {
        this.arr.pop();
        this.size = read.ReadUInt32();
        this.entryID = read.ReadUInt32();
        for (let i = 0; i < this.size; i++) {
            let id = read.ReadDouble();
            let min = read.ReadDouble();
            let max = read.ReadDouble();
            let dropChance = read.ReadDouble();
            this.arr.push(<TSArray<double>>[id, min, max, dropChance]);
        }
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(itemLootMessageID, 2000);
        packet.WriteUInt32(this.size);
        packet.WriteUInt32(this.entryID);
        for (let i = 0; i < this.size; i++) {
            packet.WriteDouble(this.arr[i][0]);
            packet.WriteDouble(this.arr[i][1]);
            packet.WriteDouble(this.arr[i][2]);
            packet.WriteDouble(this.arr[i][3]);
        }
        return packet;
    }
}

export const creatureNoExistMessageID = 3;
export class creatureNoExistMessage {
    finish: uint32 = 0;

    constructor(finish: uint32) {
        this.finish = finish;
    }

    read(read: TSPacketRead): void {
        this.finish = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(creatureNoExistMessageID, 2000);
        packet.WriteUInt32(this.finish);
        return packet;
    }
}

export const requestClassSpellsMessageID = 4;
export class requestClassSpellsMessage {
    value: uint32 = 0;

    constructor(value: uint32) {
        this.value = value;
    }

    read(read: TSPacketRead): void {
        this.value = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(requestClassSpellsMessageID, 2000);
        packet.WriteUInt32(this.value);
        return packet;
    }
}

export const sendClassSpellsMessageID = 5;
export class sendClassSpellsMessage {
    level: uint32 = 0;
    spellID: uint32 = 0;

    constructor(level: uint32, spellID: uint32) {
        this.level = level;
        this.spellID = spellID;
    }

    read(read: TSPacketRead): void {
        this.level = read.ReadUInt32();
        this.spellID = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(sendClassSpellsMessageID, 2000);
        packet.WriteUInt32(this.level);
        packet.WriteUInt32(this.spellID);
        return packet;
    }
}

export const attemptToCompleteID = 6;
export class attemptToComplete {
    msg: uint32 = 0;

    constructor(msg: uint32) {
        this.msg = msg;
    }

    read(read: TSPacketRead): void {
        this.msg = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(attemptToCompleteID, 2000);
        packet.WriteUInt32(this.msg);
        return packet;
    }
}

export const questInfoID = 7;
export class questInfo {
    reqType: uint8 = 0;
    reqID: uint32 = 0;
    reqCountTotal: uint8 = 0;
    reqCountCur: uint8 = 0;
    reqName: string = "";
    reqDescription: string = "";
    rewID: uint32 = 0;
    rewCount: uint32 = 0;

    constructor(
        reqType: uint8,
        reqID: uint32,
        reqCountTotal: uint8,
        reqCountCur: uint8,
        reqName: string,
        reqDescription: string,
        rewID: uint32,
        rewCount: uint32
    ) {
        this.reqType = reqType;
        this.reqID = reqID;
        this.reqCountTotal = reqCountTotal;
        this.reqCountCur = reqCountCur;
        this.reqName = reqName;
        this.reqDescription = reqDescription;
        this.rewID = rewID;
        this.rewCount = rewCount;
    }

    read(read: TSPacketRead): void {
        this.reqType = read.ReadUInt8();
        this.reqID = read.ReadUInt32();
        this.reqCountTotal = read.ReadUInt8();
        this.reqCountCur = read.ReadUInt8();
        this.reqName = read.ReadString();
        this.reqDescription = read.ReadString();
        this.rewID = read.ReadUInt32();
        this.rewCount = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(questInfoID, 5000);
        packet.WriteUInt8(this.reqType);
        packet.WriteUInt32(this.reqID);
        packet.WriteUInt8(this.reqCountTotal);
        packet.WriteUInt8(this.reqCountCur);
        packet.WriteString(this.reqName);
        packet.WriteString(this.reqDescription);
        packet.WriteUInt32(this.rewID);
        packet.WriteUInt32(this.rewCount);
        return packet;
    }
}


export const talentInformationID = 8;
export class talentInformation {
    size: uint32 = 0;
    talentPoints: uint32 = 0;
    info: TSArray<TSArray<float>> = [];
    constructor(size: uint32,points:uint32, info: TSArray<TSArray<float>>) {
        this.size = size;
        this.talentPoints = points
        this.info = info;
    }
    read(read: TSPacketRead): void {
        this.info.pop();
        this.size = read.ReadUInt32();
        this.talentPoints = read.ReadUInt32();
        for (let i = 0; i < this.size; i++) {
            let talentId = read.ReadFloat();
            let row = read.ReadFloat();
            let column = read.ReadFloat();
            let spellID = read.ReadFloat();
            let currentRank = read.ReadFloat();
            let MaxRank = read.ReadFloat();
            this.info.push([talentId, row, column, spellID, currentRank, MaxRank]);
        }
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(talentInformationID, 0);
        packet.WriteUInt32(this.size);
        packet.WriteUInt32(this.talentPoints);
        for (let i = 0; i < this.size; i++) {
            packet.WriteFloat(this.info[i][0]);
            packet.WriteFloat(this.info[i][1]);
            packet.WriteFloat(this.info[i][2]);
            packet.WriteFloat(this.info[i][3]);
            packet.WriteFloat(this.info[i][4]);
            packet.WriteFloat(this.info[i][5]);
        }
        return packet;
    }
}

export const attemptTalentActionPacketID = 9;
export class attemptTalentActionPacket {
    talentID: uint32 = 0;
    action: uint32 = 0;

    constructor(talentID: uint32, action: uint32) {
        this.talentID = talentID;
        this.action = action
    }

    read(read: TSPacketRead): void {
        this.talentID = read.ReadUInt32();
        this.action = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(attemptTalentActionPacketID, 0);
        packet.WriteUInt32(this.talentID);
        packet.WriteUInt32(this.action);
        return packet;
    }
}
