import { mythicBuffs } from "./dungeon/auto-buff"
import { example } from "./item-creation/example-usage"
import { itemCacheSend } from "./item-creation/item-cache"
import { itemCreationSetup } from "./item-creation/item-create/item-create-lib"
import { reforging } from "./item-creation/reforging/reforging"

export function Main(events: TSEvents) {
    //item-creation
    itemCreationSetup(events)
    example(events)
    reforging(events)
    itemCacheSend(events)
    //dungeon
    mythicBuffs(events)
}