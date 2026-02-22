import { std } from "wow/wotlk";

import { MODNAME } from "../modname";

import { Position } from "wow/wotlk/std/Misc/Position";
import { GameObjectChest } from "wow/wotlk/std/GameObject/GameObjectTemplate";

export function makeResourceNode(
    name: string,
    displayID: number,
    lockID: number,
    modPrefix: string
): GameObjectChest {
    let resourceNode = std.GameObjectTemplates.Chests.create(
        MODNAME,
        modPrefix + name.toLowerCase().replace(" ", "-").replace('\'','')
    );
    resourceNode.Name.enGB.set(name);
    resourceNode.Display.set(displayID); //currently copper vein
    resourceNode.Lock.set(lockID);
    resourceNode.Size.set(0.5);
    resourceNode.RestockTime.set(0);
    resourceNode.IsConsumable.set(1);
    resourceNode.LeaveLoot.set(1);
    resourceNode.UseGroupLoot.set(1);
    return resourceNode;
}

export function setupMiningNode(
    miningNode: GameObjectChest,
    metalID: number,
    refinedMetalID: number,
    armorGem: number,
    gemIDArray: number[][]
): number {
    miningNode.Loot.modRefCopy((table) => {
        table.addItem(metalID, 50, 1, 2);
        table.addItem(refinedMetalID, 20, 1, 2);
        table.addItem(armorGem, 5, 1, 1);
        gemIDArray.forEach((value: number[], index, arr) => {
            //all gem colors
            value.forEach((element) => {
                //specific gem colors
                table.addItem(element, 1, 1, 1); //specific gems
            });
        });
    });
    return miningNode.row.entry.get();
}

export function makePool(
    poolEntry: number,
    node: GameObjectChest,
    maxLimit: number,
    respawnRate: number,
    gobPositions: Position[]
) {
    std.SQL.pool_template.add(poolEntry).max_limit.set(maxLimit);
    gobPositions.forEach((element, index) => {
        node.Spawns.addMod(
            MODNAME,
            poolEntry + "spawn" + index,
            gobPositions,
            (instance) => {
                instance.SpawnTimeSecs.set(respawnRate);
                std.SQL.pool_members
                    .add(1, instance.row.guid.get())
                    .poolSpawnId.set(poolEntry)
                    .chance.set(100);
            }
        );
    });
}
