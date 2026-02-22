import { attemptTalentActionPacket, attemptTalentActionPacketID, talentInformation } from "../shared/Messages";

let talents: TSArray<TSArray<TSArray<float>>> = [///spellID,row,col,type(0 learn, 1 customAura),maxRank
    [[0]],//none
    [//warr
        [311, 1, 1, 3, 5],//spellID,row,col,type,maxRank
        [311, 1, 1, 3, 1],
    ],
    [
        [311, 1, 1, 3, 1],
    ],
    [
        [311, 1, 1, 3, 1],
    ],
    [
        [311, 1, 1, 3, 1],
    ],
    [
        [311, 1, 1, 3, 1],
    ],
    [
        [311, 1, 1, 3, 1],
    ],
    [
        [311, 1, 1, 3, 1],
    ],
    [
        [311, 1, 1, 3, 1],
    ],
    [
        [311, 1, 1, 3, 1],
    ],
    [[0]],//none
    [//druid
        [311, 1, 1, 3, 1],
    ],
]

const TABLE_NAME_TALENTS = "custom_character_talents"
class PlayerTalents {
    talentPoints: uint32 = 0;
    talentTest: TSDictionary<float, TSArray<float>> = CreateDictionary<float, TSArray<float>>({//spellID->type,curRank
    });
    constructor() {
        this.talentPoints = 0;
        this.talentTest = CreateDictionary<float, TSArray<float>>({});
    }
}

export function talentSystem(events: TSEvents) {
    events.Player.OnLogin((player, login) => {
        let newTalents = new PlayerTalents()
        newTalents.talentPoints = lookupCurrentTalentPoints(player)
        newTalents.talentTest = getCurrentTalentsDB(player)
        player.SetObject(TABLE_NAME_TALENTS, newTalents);
        applyTalents(player, newTalents)
    })
    events.Player.OnLevelChanged((player, oldLevel) => {
        if (player.GetLevel() > oldLevel) {
            let newTalents = player.GetObject<PlayerTalents>(TABLE_NAME_TALENTS, new PlayerTalents())
            newTalents.talentPoints = newTalents.talentPoints++
            sendAllPlayerTalents(player, newTalents);
        }
    })

    events.CustomPacketID.OnReceive(attemptTalentActionPacketID, (opcode, packet, player) => {
        let msg = new attemptTalentActionPacket(1, 1);
        msg.read(packet);
        if (msg.action != 0 && msg.action != 1 && 2) return //invalid action ID  (0 = ulearn, 1 = learn, 2= update)

        let playerTalentObject = player.GetObject<PlayerTalents>(TABLE_NAME_TALENTS, new PlayerTalents())

        let spellID = talents[player.GetClass()][msg.talentID][0]
        if (msg.action == 0) {//unlearn
            playerTalentObject.talentPoints++;
            playerTalentObject.talentTest[spellID] = [playerTalentObject.talentTest[spellID][0]--, playerTalentObject.talentTest[spellID][1]]
            if (playerTalentObject.talentTest[spellID][0] == 0) {
                playerTalentObject.talentTest = playerTalentObject.talentTest.filter(key => key !== spellID)
                if (playerTalentObject.talentTest[spellID][1] == 0)
                    player.RemoveAura(spellID)
                if (playerTalentObject.talentTest[spellID][1] == 1)
                    player.RemoveSpell(spellID, false, true)
            }
            removeFromTalentDB(player, talents[player.GetClass()][msg.talentID][0])
            sendAllPlayerTalents(player, playerTalentObject)
        }
        else if (msg.action == 1) {//learn
            if (playerTalentObject.talentPoints > 0) {
                playerTalentObject.talentPoints--;
                let rank = 1
                if (playerTalentObject.talentTest.contains(spellID)) {
                    rank = playerTalentObject.talentTest[spellID][1] + 1
                }
                addToTalentDB(player, spellID, rank)
                sendAllPlayerTalents(player, playerTalentObject)
            }
            else {
                player.SendAreaTriggerMessage("You don't have any talent points to spend!");
            }

        } else if (msg.action == 2) {//update
            sendAllPlayerTalents(player, playerTalentObject);
        }
    })
}

function sendAllPlayerTalents(player: TSPlayer, playerTalentObject: PlayerTalents) {
    let pkt = new talentInformation(1, 1, [[1]]);
    pkt.info.pop()//clear the default
    
    if (playerTalentObject.talentPoints > 0) {
        pkt.talentPoints = playerTalentObject.talentPoints;
    } else {
        pkt.talentPoints = 0;
    }
    let pClass = player.GetClass()
    
    for (let talentID = 0; talentID < talents[pClass].length; talentID++) {
        let spellInfo = talents[pClass][talentID]
        pkt.info.push(<TSArray<float>>[<float>talentID, spellInfo[1], spellInfo[2], spellInfo[0], playerTalentObject.talentTest[spellInfo[0]][1], spellInfo[4]]);
    }
    pkt.size = pkt.info.length;
}

function lookupCurrentTalentPoints(player: TSPlayer): uint32 {
    let talentPoints = player.GetLevel() - 10;
    let q = QueryCharacters(`SELECT COUNT(*) FROM custom_character_talents WHERE guid = ${player.GetGUIDLow()}`)
    while (q.GetRow()) {
        talentPoints = talentPoints - q.GetUInt32(0);
    }
    return talentPoints
}

function addToTalentDB(player: TSPlayer, spellID: number, rank: uint32) {
    QueryCharacters(`REPLACE INTO custom_character_talents (guid, spell, rank) VALUES (${player.GetGUIDLow()}, ${spellID}, ${rank})`)
}

function removeFromTalentDB(player: TSPlayer, spellID: number) {
    QueryCharacters(`DELETE FROM custom_character_talents WHERE guid = ${player.GetGUIDLow()} AND spell = ${spellID}`)
}

function applyTalents(player: TSPlayer, playerTalentObject: PlayerTalents) {
    playerTalentObject.talentTest.forEach((key, val) => {
        if (val[0] == 0)
            player.LearnSpell(key)
        if (val[1] == 1)
            player.AddAura(key, player).SetStackAmount(val[1])
    })
}

function getCurrentTalentsDB(player: TSPlayer): TSDictionary<float, TSArray<float>> {
    let dict = CreateDictionary<float, TSArray<float>>({});
    let q = QueryCharacters(`SELECT spell, type, rank FROM custom_character_talents WHERE guid = ${player.GetGUIDLow()}`)
    while (q.GetRow()) {
        dict[q.GetUInt32(0)] = [q.GetFloat(1), q.GetFloat(2)]
    }
    return dict;
}