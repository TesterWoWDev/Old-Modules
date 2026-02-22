import { std } from "wow/wotlk";
import { ItemTemplate } from "wow/wotlk/std/Item/ItemTemplate";
import { MODNAME } from "./modname";

let manaTemplate = [0, 5];
let healthTemplate = [1, 3];
let agilityTemplate = [3, 1];
let strengthTemplate = [4, 1];
let intellectTemplate = [5, 1];
let spiritTemplate = [6, 2];
let staminaTemplate = [7, 2];
let critTemplate = [32, 1];
let hasteTemplate = [36, 1];
let attackPowerTemplate = [38, 1];
let spellPowerTemplate = [45, 1];

let stamIntTemplate = joinTemplates([staminaTemplate, intellectTemplate], 1);
let stamAgiTemplate = joinTemplates([staminaTemplate, agilityTemplate], 1);

function joinTemplates(statTemplates: number[][], modifier: number) {
    statTemplates.forEach((val, index, arr) => {
        val[1] *= modifier;
    });
    return statTemplates;
}

function useTemplates(
    item: ItemTemplate,
    modifier: number,
    templateArray: number[][][]
): number[] {
    let IDs: number[] = [];
    templateArray.forEach((v, i, arr) => {
        let curItem = std.Items.create(MODNAME, item.Name.enGB.get() + i, item.ID);
        curItem.Stats.clearAll();
        v.forEach((value) => curItem.Stats.add(value[0], value[1] * modifier));
        IDs.push(curItem.ID);
    });
    return IDs;
}
