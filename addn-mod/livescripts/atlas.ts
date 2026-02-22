import {
    creatureNameMessage,
    creatureNameMessageID,
    creatureNoExistMessage,
    itemLootMessage,
} from "../shared/Messages";

export function Atlas(events: TSEvents) {
    events.CustomPacketID.OnReceive(creatureNameMessageID, (_, packet, player) => {
        let msg = new creatureNameMessage(1, "");
        msg.read(packet);
        let check = 0;
        let entry = msg.entry
            .split("\\\\")
            .join("")
            .split(";")
            .join("")
            .split("/")
            .join("")
            .split('"')
            .join('\\\\"')
            .split("'")
            .join("\\\\'");
        let loot: TSArray<TSArray<double>> = [];
        let creatureID = 0;
        console.log(
            "Player: " +
            player.GetName() +
            " AccountID: " +
            player.GetAccountID() +
            " Message: " +
            msg.entry +
            " isName: " +
            msg.isName +
            " Formatted: " +
            entry
        );

        if (entry.length > 0) {
            let fillString = "entry";
            let lootID = 0;
            if (msg.isName == 1) {
                fillString = "name";
            }
            check = -1;
            let query = QueryWorld(
                "SELECT entry,lootid FROM `creature_template` WHERE `" +
                fillString +
                '` = "' +
                entry +
                '";'
            );
            while (query.GetRow()) {
                creatureID = query.GetUInt32(0);
                lootID = query.GetUInt32(1);
                check = 0;
            }
            if (check == 0) {
                let query = QueryWorld(
                    'SELECT * FROM `creature_loot_template` WHERE `Entry` = "' +
                    lootID +
                    '";'
                );
                while (query.GetRow()) {
                    if (query.GetUInt32(2) == 0) {
                        if (query.GetDouble(3) > 0) {
                            loot.push(<TSArray<double>>[
                                query.GetDouble(1),
                                query.GetDouble(7),
                                query.GetDouble(8),
                                query.GetDouble(3),
                            ]);
                            check = 1;
                        }
                    }
                }
            }
        }
        if (check == 0) {
            new creatureNoExistMessage(0).write().SendToPlayer(player);
            return;
        }
        if (check == 1) {
            let msgL = new itemLootMessage();
            msgL.arr = loot;
            msgL.size = loot.length;
            msgL.entryID = creatureID;
            msgL.write().SendToPlayer(player);
            player.SendCreatureQueryPacket(creatureID);
        }
    });
}
