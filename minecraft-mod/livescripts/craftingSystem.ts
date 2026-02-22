import { craftMessageID, empty, craftMessage, returnCraftItemMessage, showScreen } from "../shared/Messages";
import { createItemWithChoices } from "./item-stuff/item_create";

const blank1: TSArray<uint32> = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const blank2: TSArray<TSArray<uint32>> = [
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
const blank3: TSArray<uint32> = [0, 0, 0, 0, 0];
const IDToType = CreateDictionary<uint32, TSArray<float>>({})

export function handleCraftMessages(events: TSEvents) {
    setupTable();
    events.CustomPacketID.OnReceive(craftMessageID, (_, packet, player) => {
        let message = new craftMessage(blank1, blank2, 0, blank3);
        message.read(packet);
        let check = 0;
        let queryString =
            "SELECT craftID,craftCount,req1,cnt1,req2,cnt2,req3,cnt3,req4,cnt4,req5,cnt5,req6,cnt6,req7,cnt7,req8,cnt8,req9,cnt9 FROM minecraft_recipes WHERE ";
        let posString = "";
        let isEnchant = false;
        for (let i = 0; i < message.itemIDs.length; i++) {
            let fillVal: int32 = <int32>message.itemIDs[i];
            if (message.itemIDs[i] != 0) {
                if (i == 4) {
                    if (player.HasItem(message.itemIDs[i], 1, false)) {
                        let item = player.GetItemByEntry(message.itemIDs[i]);
                        if (item.GetClass() == 2 || item.GetClass() == 4) {
                            isEnchant = true;
                            fillVal = -1;
                        }
                    }
                }
            }
            posString = posString + "pos" + (i + 1) + " = " + fillVal + " AND ";
        }
        posString = posString.substring(0, posString.length - 4);
        let result = QueryWorld(queryString + posString);
        let pkt = new returnCraftItemMessage(0, 0, blank3);
        while (result.GetRow()) {
            check = 1;
            if (isEnchant) {
                pkt.craftItem = message.itemIDs[4];
                let enchSet = 0;
                for (let i = 0; i < 5; i++) {
                    if (message.enchants[i] == 0) {
                        message.enchants[i] = result.GetUInt32(0);
                        enchSet = 1;
                        break;
                    }
                }
                if (enchSet == 0) {
                    player.SendAreaTriggerMessage(
                        "You do not have the open enchant slots!"
                    );
                    player.SendBroadcastMessage("You do not have the open enchant slots");
                    return;
                }
            } else {
                pkt.craftItem = result.GetUInt32(0);
            }
            pkt.craftItemCount = result.GetUInt32(1);
            if (message.purchase == 1) {
                let checkItems = 1;
                for (let i = 2; i <= 22; i += 2) {
                    if (result.GetUInt32(i) != 0) {
                        if (!player.HasItem(result.GetUInt32(i), result.GetUInt32(i + 1), false)) {
                            checkItems = 0;
                        }
                    } else {
                        break;
                    }
                }
                if (checkItems == 1) {
                    for (let i = 0; i < message.positions.length; i++) {
                        if (message.itemIDs[i] != 0) {
                            if (message.positions[i][0] == 0) {
                                message.positions[i][0] = 255;
                                message.positions[i][1] += 22;
                            } else {
                                message.positions[i][0] += 18;
                                message.positions[i][1] += -1;
                            }
                            if (!(isEnchant && i == 4)) {
                                player.RemoveItem(player.GetItemByEntry(message.itemIDs[i]), 1);
                            }
                        }
                    }
                    let item = CreateItem(pkt.craftItem, pkt.craftItemCount);
                    if (isEnchant) {
                        item = player.GetItemByPos(
                            message.positions[4][0],
                            message.positions[4][1]
                        );
                    } else {
                        
                        if(IDToType.contains(pkt.craftItem)){
                        let itemChoice = IDToType[pkt.craftItem]                             
                            item = CreateCustomItem(player, itemChoice[0], itemChoice[1],pkt.craftItemCount);
                        } else {
                            let itema = player.AddItem(pkt.craftItem, pkt.craftItemCount);
                            if (itema.IsNull()) {
                                //player.SendMail(41,0,'forgotten items','You seem to have forgotten to make space in your bags, i have made sure this made its way to you. Shame about those names though, seem to of been lost.',0,0,[item])
                            }
                        }
                    }
                    item.SetEnchantment(message.enchants[0], 0);
                    if (message.enchants[1] != 0)
                        item.SetEnchantment(message.enchants[1], 2);
                    if (message.enchants[2] != 0)
                        item.SetEnchantment(message.enchants[2], 3);
                    if (message.enchants[3] != 0)
                        item.SetEnchantment(message.enchants[3], 4);
                    if (message.enchants[4] != 0)
                        item.SetEnchantment(message.enchants[4], 5);
                    item.SetEnchantment(1, 6);
                    new showScreen(0).write().SendToPlayer(player);
                    pkt.craftItem = 0;
                } else {
                    player.SendAreaTriggerMessage(
                        "You do not have the required materials!"
                    );
                    player.SendBroadcastMessage(
                        "You do not have the required materials!"
                    );
                }
            }
            player.SendItemQueryPacket(pkt.craftItem);
        }
        if (check == 0 && message.purchase == 1) {
            player.SendAreaTriggerMessage("That wasn't a valid pattern!");
            player.SendBroadcastMessage("That wasn't a valid pattern!");
        }
        pkt.enchantNum = message.enchants;
        pkt.write().SendToPlayer(player);
    });
}

function CreateCustomItem(player: TSPlayer, index1: number, index2: number, level: number): TSItem {
    return createItemWithChoices(player, index1, index2, level)
}

function setupTable() {
    //ARMOR
    GetIDTag('minecraft-mod','cloth-head').forEach((val,i,arr)=>{ IDToType[val] = [0,0]; });
    GetIDTag('minecraft-mod','cloth-shoulder').forEach((val,i,arr)=>{ IDToType[val] = [0,1]; });
    GetIDTag('minecraft-mod','cloth-chest').forEach((val,i,arr)=>{ IDToType[val] = [0,2]; });
    GetIDTag('minecraft-mod','cloth-waist').forEach((val,i,arr)=>{ IDToType[val] = [0,3]; });
    GetIDTag('minecraft-mod','cloth-legs').forEach((val,i,arr)=>{ IDToType[val] = [0,4]; });
    GetIDTag('minecraft-mod','cloth-boots').forEach((val,i,arr)=>{ IDToType[val] = [0,5]; });
    GetIDTag('minecraft-mod','cloth-wrists').forEach((val,i,arr)=>{ IDToType[val] = [0,6]; });
    GetIDTag('minecraft-mod','cloth-hands').forEach((val,i,arr)=>{ IDToType[val] = [0,7]; });
    GetIDTag('minecraft-mod','cloth-neck').forEach((val,i,arr)=>{ IDToType[val] = [0,24]; });
    GetIDTag('minecraft-mod','cloth-ring').forEach((val,i,arr)=>{ IDToType[val] = [0,25]; });
    GetIDTag('minecraft-mod','cloth-cloak').forEach((val,i,arr)=>{ IDToType[val] = [0,27]; });
    GetIDTag('minecraft-mod','leather-head').forEach((val,i,arr)=>{ IDToType[val] = [0,8]; });
    GetIDTag('minecraft-mod','leather-shoulder').forEach((val,i,arr)=>{ IDToType[val] = [0,9]; });
    GetIDTag('minecraft-mod','leather-chest').forEach((val,i,arr)=>{ IDToType[val] = [0,10]; });
    GetIDTag('minecraft-mod','leather-waist').forEach((val,i,arr)=>{ IDToType[val] = [0,11]; });
    GetIDTag('minecraft-mod','leather-legs').forEach((val,i,arr)=>{ IDToType[val] = [0,12]; });
    GetIDTag('minecraft-mod','leather-boots').forEach((val,i,arr)=>{ IDToType[val] = [0,13]; });
    GetIDTag('minecraft-mod','leather-wrists').forEach((val,i,arr)=>{ IDToType[val] = [0,14]; });
    GetIDTag('minecraft-mod','leather-hands').forEach((val,i,arr)=>{ IDToType[val] = [0,15]; });
    GetIDTag('minecraft-mod','leather-neck').forEach((val,i,arr)=>{ IDToType[val] = [0,24]; });
    GetIDTag('minecraft-mod','leather-ring').forEach((val,i,arr)=>{ IDToType[val] = [0,25]; });
    GetIDTag('minecraft-mod','leather-cloak').forEach((val,i,arr)=>{ IDToType[val] = [0,27]; });
    GetIDTag('minecraft-mod','mail-head').forEach((val,i,arr)=>{ IDToType[val] = [0,16]; });
    GetIDTag('minecraft-mod','mail-shoulder').forEach((val,i,arr)=>{ IDToType[val] = [0,17]; });
    GetIDTag('minecraft-mod','mail-chest').forEach((val,i,arr)=>{ IDToType[val] = [0,18]; });
    GetIDTag('minecraft-mod','mail-waist').forEach((val,i,arr)=>{ IDToType[val] = [0,19]; });
    GetIDTag('minecraft-mod','mail-legs').forEach((val,i,arr)=>{ IDToType[val] = [0,20]; });
    GetIDTag('minecraft-mod','mail-boots').forEach((val,i,arr)=>{ IDToType[val] = [0,21]; });
    GetIDTag('minecraft-mod','mail-wrists').forEach((val,i,arr)=>{ IDToType[val] = [0,22]; });
    GetIDTag('minecraft-mod','mail-hands').forEach((val,i,arr)=>{ IDToType[val] = [0,23]; });
    GetIDTag('minecraft-mod','mail-neck').forEach((val,i,arr)=>{ IDToType[val] = [0,24]; });
    GetIDTag('minecraft-mod','mail-ring').forEach((val,i,arr)=>{ IDToType[val] = [0,25]; });
    GetIDTag('minecraft-mod','mail-cloak').forEach((val,i,arr)=>{ IDToType[val] = [0,27]; });
    GetIDTag('minecraft-mod','trinket').forEach((val,i,arr)=>{ IDToType[val] = [0,26]; });
    
    //WEAPONS
    GetIDTag('minecraft-mod','1h-axe').forEach((val,i,arr)=>{ IDToType[val] = [1,0]; });
    GetIDTag('minecraft-mod','2h-axe').forEach((val,i,arr)=>{ IDToType[val] = [1,1]; });
    GetIDTag('minecraft-mod','bow').forEach((val,i,arr)=>{ IDToType[val] = [1,2]; });
    //GetIDTag('minecraft-mod','gun').forEach((val,i,arr)=>{ IDToType[val] = [1,3]; });//no crafting for gun yet
    GetIDTag('minecraft-mod','1h-mace').forEach((val,i,arr)=>{ IDToType[val] = [1,4]; });
    GetIDTag('minecraft-mod','2h-mace').forEach((val,i,arr)=>{ IDToType[val] = [1,5]; });
    GetIDTag('minecraft-mod','polearm').forEach((val,i,arr)=>{ IDToType[val] = [1,6]; });
    GetIDTag('minecraft-mod','1h-sword').forEach((val,i,arr)=>{ IDToType[val] = [1,7]; });
    GetIDTag('minecraft-mod','2h-sword').forEach((val,i,arr)=>{ IDToType[val] = [1,8]; });
    GetIDTag('minecraft-mod','staff').forEach((val,i,arr)=>{ IDToType[val] = [1,9]; });
    GetIDTag('minecraft-mod','fist-wep').forEach((val,i,arr)=>{ IDToType[val] = [1,10]; });
    GetIDTag('minecraft-mod','dagger').forEach((val,i,arr)=>{ IDToType[val] = [1,11]; });
    GetIDTag('minecraft-mod','wand').forEach((val,i,arr)=>{ IDToType[val] = [1,12]; });
    GetIDTag('minecraft-mod','tome').forEach((val,i,arr)=>{ IDToType[val] = [1,13]; });
    GetIDTag('minecraft-mod','shield').forEach((val,i,arr)=>{ IDToType[val] = [1,14]; });
    
}

