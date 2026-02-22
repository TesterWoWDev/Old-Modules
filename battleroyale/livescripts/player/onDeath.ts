
import { createItemRandom } from "../item-creation/item-create/item-create-lib";

const chestID = 106318;
export function onDeath(events: TSEvents) {
    events.Player.OnPlayerKilledByCreature((killer, killed) => {
        deathEvent(killed)
    })
    events.Player.OnPVPKill((killer, killed) => {
        deathEvent(killed)
    })

    events.GameObject.OnGenerateLoot((obj, player) => {
        const loot = obj.GetLoot()
        loot.SetGeneratesNormally(false)
        loot.Clear()
        let lootStr = obj.GetString('loot', 'nl')//no loot
        if (lootStr == 'nl')
            return
        lootStr.split("|").forEach((v, i, arr) => {
            let itemInfo = v.split("?")
            loot.AddItem(ToUInt32(itemInfo[0]), ToUInt32(itemInfo[1]), ToUInt32(itemInfo[1]))
        })
    })
}

function deathEvent(killed: TSPlayer) {
    const obj = killed.GetMap().SpawnGameObject(chestID, killed.GetX(), killed.GetY(), killed.GetZ(), 1, 0)
    const loot = obj.GetLoot()
    loot.Clear()
    emptyBagsFillChest(killed, obj)
    handleAddNewItems(killed)
    killed.Teleport(1, -6170.5, -1096.28, -211, 3.7) //back to beginning
}

function emptyBagsFillChest(killed: TSPlayer, obj: TSGameObject) {
    let lootStr: string = ""
    for (let bag = 67; bag <= 74; bag++) {
        for (let slot = 0; slot < 35; slot++) {
            let item = killed.GetItemByPos(bag, slot);
            if (!item.IsNull()) {
                lootStr = lootStr + item.GetEntry() + "?" + item.GetCount() + "|"
                killed.RemoveItem(item, item.GetCount())
            }
        }
    }
    for (let bag = 19; bag <= 22; bag++) {
        for (let slot = 0; slot < 35; slot++) {
            let item = killed.GetItemByPos(bag, slot);
            if (!item.IsNull()) {
                lootStr = lootStr + item.GetEntry() + "?" + item.GetCount() + "|"
                killed.RemoveItem(item, item.GetCount())
            }
        }
    }
    for (let slot = 86; slot < 117; slot++) {
        let item = killed.GetItemByPos(255, slot);
        if (!item.IsNull()) {
            lootStr = lootStr + item.GetEntry() + "?" + item.GetCount() + "|"
            killed.RemoveItem(item, item.GetCount())
        }
    }
    for (let slot = 0; slot < 74; slot++) {
        let item = killed.GetItemByPos(255, slot);
        if (!item.IsNull()) {
            lootStr = lootStr + item.GetEntry() + "?" + item.GetCount() + "|"
            killed.RemoveItem(item, item.GetCount())
        }
    }
    obj.SetString('loot', lootStr)
}

function handleAddNewItems(killed: TSPlayer) {
    let itemsToAdd: number = Math.floor(killed.GetLevel() / 2)
    killed.SetLevel(1)
    for (; itemsToAdd > 0; itemsToAdd--) {
        createItemRandom(killed)
    }
}
