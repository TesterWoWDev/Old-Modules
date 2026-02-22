import { GameObjectChest } from "wow/wotlk/std/GameObject/GameObjectTemplate";

export function addLootToGobChest(
    chest: GameObjectChest,
    items: number[],
    chances: number[],
    groupID?: number
) {
    if (groupID == null) {
        groupID = 0;
    }
    items.forEach((value, index) => {
        if (chances[index] > 0) {
            chest.Loot.modRef((lootset) =>
                lootset.addItem(value, chances[index], 1, 1, false, groupID, 1)
            );
        }
    });
}

export function addLootToGobChestSingleChance(
    chest: GameObjectChest,
    items: number[],
    chance: number,
    groupID?: number
) {
    if (groupID == null) {
        groupID = 0;
    }
    items.forEach((value, index) => {
        if (chance > 0) {
            chest.Loot.modRef((lootset) =>
                lootset.addItem(value, chance, 1, 1, false, groupID, 1)
            );
        }
    });
}
export function addLootToGobChestMultiDrop(
    chest: GameObjectChest,
    items: number[],
    chances: number[],
    min: number[],
    max: number[],
    groupID?: number
) {
    if (groupID == null) {
        groupID = 0;
    }
    items.forEach((value, index) => {
        if (chances[index] > 0) {
            chest.Loot.modRef((lootset) =>
                lootset.addItem(
                    value,
                    chances[index],
                    min[index],
                    max[index],
                    false,
                    groupID,
                    1
                )
            );
        }
    });
}

export function addLootToGobChestSingleChanceMultiDrop(
    chest: GameObjectChest,
    items: number[],
    chance: number,
    min: number[],
    max: number[],
    groupID?: number
) {
    if (groupID == null) {
        groupID = 0;
    }
    items.forEach((value, index) => {
        if (chance > 0) {
            chest.Loot.modRef((lootset) =>
                lootset.addItem(
                    value,
                    chance,
                    min[index],
                    max[index],
                    false,
                    groupID,
                    1
                )
            );
        }
    });
}

export function addLootToGobChestMultiGroup(
    chest: GameObjectChest,
    items: number[],
    chances: number[],
    min: number,
    max: number,
    groupID?: number
) {
    if (groupID == null) {
        groupID = 0;
    }
    items.forEach((value, index) => {
        if (chances[index] > 0) {
            chest.Loot.modRef((lootset) =>
                lootset.addItem(value, chances[index], min, max, false, groupID, 1)
            );
        }
    });
}

export function addLootToGobChestSingleChanceMultiGroup(
    chest: GameObjectChest,
    items: number[],
    chance: number,
    min: number,
    max: number,
    groupID?: number
) {
    if (groupID == null) {
        groupID = 0;
    }
    items.forEach((value, index) => {
        if (chance > 0) {
            chest.Loot.modRef((lootset) =>
                lootset.addItem(value, chance, min, max, false, groupID, 1)
            );
        }
    });
}
