export const craftMessageID = 20;
export const empty: TSArray<uint32> = [0, 0];
export class craftMessage {
    itemIDs: TSArray<uint32> = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    positions: TSArray<TSArray<uint32>> = [
        empty,
        empty,
        empty,
        empty,
        empty,
        empty,
        empty,
        empty,
        empty,
    ];
    purchase: uint32 = 0;
    enchants: TSArray<uint32> = [0, 0, 0, 0, 0];

    constructor(
        itemIDs: TSArray<uint32>,
        positions: TSArray<TSArray<uint32>>,
        purchase: uint32,
        enchants: TSArray<uint32>
    ) {
        this.itemIDs = itemIDs;
        this.positions = positions;
        this.purchase = purchase;
        this.enchants = enchants;
    }

    read(read: TSPacketRead): void {
        for (let i = 0; i < 9; i++) this.itemIDs[i] = read.ReadUInt32();
        for (let i = 0; i < 9; i++) {
            let val1: uint32 = read.ReadUInt32();
            let val2: uint32 = read.ReadUInt32();
            let bag: TSArray<uint32> = [val1, val2];
            this.positions[i] = bag;
        }
        this.purchase = read.ReadUInt32();
        for (let i = 0; i < 4; i++) this.enchants[i] = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(craftMessageID, 2000);
        for (let i = 0; i < 9; i++) packet.WriteUInt32(this.itemIDs[i]);
        for (let i = 0; i < 9; i++) {
            packet.WriteUInt32(this.positions[i][0]);
            packet.WriteUInt32(this.positions[i][1]);
        }
        packet.WriteUInt32(this.purchase);
        for (let i = 0; i < 4; i++) packet.WriteUInt32(this.enchants[i]);
        return packet;
    }
}

export const returnCraftItemMessageID = 21;
export class returnCraftItemMessage {
    craftItem: uint32 = 0;
    craftItemCount: uint32 = 0;
    enchantNum: TSArray<uint32> = [0, 0, 0, 0, 0];

    constructor(
        craftItem: uint32,
        craftItemCount: uint32,
        enchantNum: TSArray<uint32>
    ) {
        this.craftItem = craftItem;
        this.craftItemCount = craftItemCount;
        this.enchantNum = enchantNum;
    }

    read(read: TSPacketRead): void {
        this.craftItem = read.ReadUInt32();
        this.craftItemCount = read.ReadUInt32();
        for (let i = 0; i < 5; i++) this.enchantNum[i] = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(returnCraftItemMessageID, 2000);
        packet.WriteUInt32(this.craftItem);
        packet.WriteUInt32(this.craftItemCount);
        for (let i = 0; i < 5; i++) packet.WriteUInt32(this.enchantNum[i]);
        return packet;
    }
}

export const showScreenID = 22;
export class showScreen {
    value: uint32 = 0;

    constructor(value: uint32) {
        this.value = value;
    }

    read(read: TSPacketRead): void {
        this.value = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(showScreenID, 2000);
        packet.WriteUInt32(this.value);
        return packet;
    }
}

export const spellChoicesID = 23;
export class spellChoices {
    spellIDs: TSArray<uint32> = [1];
    spellRarity: TSArray<uint32> = [1];
    spellDescs: TSArray<string> = [""];
    constructor(
        spellIDs: TSArray<uint32>,
        spellRarity: TSArray<uint32>,
        spellDescs: TSArray<string>
    ) {
        this.spellIDs = spellIDs;
        this.spellRarity = spellRarity;
        this.spellDescs = spellDescs;
    }

    read(read: TSPacketRead): void {
        for (let i = 0; i < 3; i++) {
            this.spellIDs.push(read.ReadUInt32());
            this.spellRarity.push(read.ReadUInt32());
            this.spellDescs.push(read.ReadString());
        }
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(spellChoicesID, 0);
        for (let i = 0; i < 3; i++) {
            packet.WriteUInt32(this.spellIDs[i]);
            packet.WriteUInt32(this.spellRarity[i]);
            packet.WriteString(this.spellDescs[i]);
        }
        return packet;
    }
}

export const spellChoiceID = 24;
export class spellChoice {
    choice: uint32 = 1;

    constructor(choice: uint32) {
        this.choice = choice;
    }

    read(read: TSPacketRead): void {
        this.choice = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(spellChoiceID, 0);
        packet.WriteUInt32(this.choice);
        return packet;
    }
}


export const itemCacheID = 25;
export class itemCache {
    entry: uint32 = 0;

    constructor(entry: uint32) {
        this.entry = entry;
    }

    read(read: TSPacketRead): void {
        this.entry = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(itemCacheID, 0);
        packet.WriteUInt32(this.entry);
        return packet;
    }
}