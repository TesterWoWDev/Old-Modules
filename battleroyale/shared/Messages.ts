export const itemCacheID = 1;
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

export const kitChoiceID = 2;
export class kitChoice {
    kitID: uint32 = 0;

    constructor(entry: uint32) {
        this.kitID = entry;
    }

    read(read: TSPacketRead): void {
        this.kitID = read.ReadUInt32();
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(kitChoiceID, 0);
        packet.WriteUInt32(this.kitID);
        return packet;
    }
}

export const maxKitChoice = 4;
export const kitNames = [//update with new kit
    "Knight",
    "Berserker",
    "Hunter",
    "Rogue",
    "Priest",
    "DK",
    "Shaman",
    "Mage",
    "Warlock",
    "Druid",
]

export const kitTextures = [//update with new kit
    "inv_sword_27",
    "inv_hammer_01",
    "inv_weapon_bow_07",
    "inv_throwingknife_04",
    "inv_staff_30",
    "Spell_Deathknight_KitIcon",
    "inv_jewelry_talisman_04",
    "inv_staff_13",
    "spell_nature_drowsy",
    "inv_misc_monsterclaw_04",
]

export const kitTooltips = [
    "|cffC79C6EKnight|r\nKnights are skilled warriors who specialize in melee combat and tanking.\nThey can also use ranged weapons and special attacks to deal damage.",
    "|cffF58CBABerserker|r\nBerserkers specialize in close combat, sacrificing health for victory.\nTheir fierce determination and daring fighting style instill fear and respect.",
    "|cffABD473Hunter|r\nHunters are expert trackers and marksmen who specialize in ranged combat.\nThey can also tame and train beasts to fight alongside them.",
    "|cffFFF569Rogue|r\nRogues are stealthy assassins who specialize in dealing damage and crowd control.\nThey use their stealth and cunning to ambush their enemies.",
    "|cffFFFFFFPriest|r\nPriests are divine spellcasters who specialize in healing and dealing damage.\nThey can also use shadow magic to manipulate the minds of their enemies.",
    "|cffC41F3BDeath Knight|r\nDeath Knights are undead warriors who were once champions of the Lich King.\nThey specialize in dealing damage and tanking, with an emphasis on frost, blood, and unholy magic.",
    "|cff0070DEShaman|r\nShamans are spiritual leaders who specialize in healing, tanking, and dealing damage.\nThey can call upon the power of the elements to unleash devastating attacks.",
    "|cff69CCF0Mage|r\nMages are masters of the arcane arts who specialize in dealing damage and crowd control.\nThey can also summon elemental spirits and create portals to other locations.",
    "|cff9482C9Warlock|r\nWarlocks are practitioners of dark magic who specialize in dealing damage over time and summoning demonic minions to fight alongside them.\nThey can also drain the life force of their enemies and use their own health to power their spells.",
    "|cffFF7D0ADruid|r\nDruids are shape-shifting nature mages who can take on the forms of animals.\nThey specialize in healing, tanking, and dealing damage, with an emphasis on nature magic and the elements.",
]


export const unlockKitInfoID = 3;
export class unlockKitInfo {
    currentKitChoice: uint32 = 1
    currentUnlocks: TSArray<uint32> = [0];
    size: uint32;

    constructor(cur: uint32, info: TSArray<uint32>, size: uint32) {
        this.currentKitChoice = cur
        this.currentUnlocks = info;
        this.size = size;
    }

    read(read: TSPacketRead): void {
        this.currentUnlocks.pop()
        this.size = read.ReadUInt32()
        this.currentKitChoice = read.ReadUInt32()
        for (let i = 0; i < this.size; i++)
            this.currentUnlocks.push(read.ReadUInt32())
    }

    write(): TSPacketWrite {
        let packet = CreateCustomPacket(unlockKitInfoID, 0);
        packet.WriteUInt32(this.size)
        packet.WriteUInt32(this.currentKitChoice)
        for (let i = 0; i < this.currentUnlocks.length; i++)
            packet.WriteUInt32(this.currentUnlocks[i]);
        return packet;
    }
}