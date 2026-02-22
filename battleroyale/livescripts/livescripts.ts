import { powerGeneration } from "./player/power-generation"
import { creatureLootEvents } from "./item-creation/creature-loot"
import { itemCacheSend } from "./item-creation/item-cache"
import { createItemRandom, itemCreationSetup } from "./item-creation/item-create/item-create-lib"
import { reforging } from "./item-creation/reforging/reforging"
import { SetupHouseInfo } from "./player-housing/base-classes"
import { baseHouse } from "./player-housing/housing-base"
import { RegisterFarmingSpells } from "./player-housing/spell-scripts"
import { onDeath } from "./player/onDeath"
import { classKitController } from "./player/classKits"
import { zoneTeleport } from "./zone/teleport-back"

export function Main(events: TSEvents) {
    //item-creation
    itemCreationSetup(events)
    reforging(events)
    itemCacheSend(events)
    creatureLootEvents(events)
    events.Player.OnCommand((player, command, found) => {
        const cmd = command.get().split(' ')
        if (cmd[0] == 'createitem') {
            found.set(true)
            createItemRandom(player)
        }
    })
    //player-housing
    SetupHouseInfo(events)
    RegisterFarmingSpells(events)
    baseHouse(events)
    //player
    onDeath(events)
    powerGeneration(events)
    classKitController(events)
    //zone
    zoneTeleport(events)
}
