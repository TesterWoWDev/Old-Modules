import { kitChoice, kitChoiceID, kitNames, unlockKitInfo } from "../../shared/Messages";
import { kitList } from "./classKitSpells";

@CharactersTable
export class PlayerKitInfo extends DBEntry {
    @DBPrimaryKey
    player: uint64 = 0
    @DBField
    currentKitID: uint32 = 99;
    @DBField
    unlockedString: string = ''

    unlockedArray: TSArray<uint32> = <TSArray<uint32>>[]

    constructor(player: uint64) {
        super();
        this.player = player;
        let str: string = ""
        let keys = kitList.keys().length
        for (let i = 0; i < keys; i++) {
            str = str + "0"
            if (i !== keys - 1) {
                str = str + ","
            }
        }
        this.unlockedString = str
        this.unlockClass(1)
        this.unlockClass(2)
        this.unlockClass(3)
    }

    static get(player: TSPlayer): PlayerKitInfo {
        return player.GetObject('PlayerKitInfo', LoadDBEntry(new PlayerKitInfo(player.GetGUID())))
    }

    updateUnlockArray() {
        this.unlockedArray = <TSArray<uint32>>[]
        this.unlockedString.split(',').forEach((v, i) => {
            if (v == '1') {
                this.unlockedArray.push(i)
            }
        })
        this.Save()
    }

    unlockClass(classID: uint32) {
        this.unlockedArray.push(classID)
        const a = this.unlockedString.split(",")
        a[classID] = '1'
        this.unlockedString = a.join(",")
        this.Save()
    }

    giveClassChoices(player: TSPlayer) {
        if (this.unlockedArray.length > 4) {
            let result: TSArray<uint32> = [];
            while (result.length < 4) {
                const randomElement: uint32 = this.unlockedArray[Math.floor(Math.random() * this.unlockedArray.length)]
                if (!result.includes(randomElement)) {
                    result.push(randomElement);
                }
            }
            let pkt = new unlockKitInfo(this.currentKitID, result, 4)
            pkt.write().SendToPlayer(player)
        }
        else {
            let pkt = new unlockKitInfo(this.currentKitID, this.unlockedArray, this.unlockedArray.length)
            pkt.write().SendToPlayer(player)
        }
    }
}

export function classKitController(events: TSEvents) {
    if (TAG('battle-royale', 'class-auras').length != kitNames.length)
        for (let i = 0; i < 9; i++)
            console.log('MISMATCH DATASCRIPT AND MESSAGES CLASS INFO TABLES')

    events.Player.OnLogin((player, first) => {
        if (player.GetClass() == UTAG("battle-royale", 'adventurer-class')) {
            let kit = PlayerKitInfo.get(player)
            if (first) {
                learnWeaponSkills(player)
                player.AddAura(UTAG('battleroyale', 'starter-protection'), player)
                kit.updateUnlockArray()
                kit.giveClassChoices(player)
            } else
                player.AddAura(TAG('battle-royale', 'class-auras')[kit.currentKitID - 1], player)
        }
    })
    events.Player.OnLevelChanged((player, oldLevel) => {
        if (player.GetClass() == UTAG("battle-royale", 'adventurer-class'))
            controlSpells(player, PlayerKitInfo.get(player).currentKitID, true)
    })
    events.CustomPacket.OnReceive(kitChoiceID, (opcode, packet, player) => {
        if (PlayerKitInfo.get(player).currentKitID == 99) {
            let msg = new kitChoice(0);
            msg.read(packet);
            PlayerKitInfo.get(player).currentKitID = msg.kitID
            controlSpells(player, msg.kitID, true)
        }
    })
}

function learnWeaponSkills(player: TSPlayer) {
    player.LearnSpell(196)//1h axe
    player.LearnSpell(197)//2h axe
    player.LearnSpell(198)//1h mace
    player.LearnSpell(199)//2h mace
    player.LearnSpell(200)//polearm
    player.LearnSpell(201)//1h sword
    player.LearnSpell(202)//2h sword
    player.LearnSpell(5009)//wand
}

function controlSpells(player: TSPlayer, chosenClass: uint32, learn: bool) {
    if (chosenClass == 99)
        return;
    const curClassSpells = kitList[chosenClass];
    if (learn) {
        player.AddAura(TAG('battle-royale', 'class-auras')[chosenClass - 1], player);
        for (let level = 1; level <= player.GetLevel(); level++) {
            curClassSpells[level].forEach((spellID, i, arr) => player.LearnSpell(spellID));
        }
    } else {
        player.RemoveAura(TAG('battle-royale', 'class-auras')[chosenClass - 1]);
        for (let level = curClassSpells.length - 1; level > 0; level--) {
            curClassSpells[level].forEach((spellID, i, arr) => player.RemoveSpell(spellID, false, false));
        }
    }
}