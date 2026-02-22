// ============================================================================
//
// - Item Generator Library -
//
//   This file is used to generate an item using multipliers from const-creations and control the IDs of any generated items.
//   There are 4 functions to use external of the lib:createItemRandom,returnItemIDRandom,createItemWithChoices,returnItemIDWithChoices
// - External scripts -
//   datascripts: datascripts/fill-database
//
// ============================================================================

import { itemClassInfo, qualityMultiplier, statCounts, statChoices, statToWeight, armorScalar, baseNameDict, displayDict, prefixPostfixArray, getRandNumber } from "./const-creations";

let startID = 200000
const templateItemID = 38
//dont touch

export function itemCreationSetup(events: TSEvents) {
    setupStartingID()
    setupBaseNameDict()
    setupPrefixPostfixDict()
    setupDisplayIDDict()
}

export function createItemRandom(player: TSPlayer): TSItem {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, chooseItemType(), player.GetLevel(), getRandNumber(3))
    player.SendItemQueryPacket(temp)
    return player.AddItem(temp.GetEntry(), 1)
}

export function createItemWithChoices(player: TSPlayer, itemType: number, itemSubType: number, level: number, statType: number): TSItem {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, itemClassInfo[itemType][itemSubType], level, statType)
    player.SendItemQueryPacket(temp)
    return player.AddItem(temp.GetEntry(), 1)
}

export function returnItemIDRandom(player: TSUnit): number {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, chooseItemType(), player.GetLevel(), getRandNumber(3))
    return temp.GetEntry()
}

export function returnItemIDWithChoices(itemType: number, itemSubType: number, level: number, statType: number): number {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, itemClassInfo[itemType][itemSubType], level, statType)
    return temp.GetEntry()
}

export function returnItemIDWithLevel(level: number): number {
    let temp: TSItemTemplate = CreateItemTemplate(startID++, templateItemID)
    temp = modifyItemProperties(temp, chooseItemType(), level, getRandNumber(3))
    return temp.GetEntry()
}

function modifyItemProperties(temp: TSItemTemplate, itemInfo: number[], level: number, statType: number): TSItemTemplate {
    const qualMult = qualityMultiplier[temp.GetQuality()]
    let itemLevel = level < 70 ? (((level * level) / 36) + 1) : (16.5 * level - 1004)
    const commonMath = itemLevel * itemInfo[5] * qualMult

    temp.SetItemLevel(itemLevel);
    temp.SetRequiredLevel(level <= 80 ? level : 80)
    temp.SetQuality(GetRandQuality())

    temp.SetClass(itemInfo[0])
    temp.SetSubClass(itemInfo[1])
    temp.SetInventoryType(itemInfo[2])
    temp.SetMaterial(itemInfo[3])
    temp.SetSheath(itemInfo[4])

    if (temp.GetClass() == 4)//if armor or shield/tome
    {
        if (itemInfo[1] != 0)//if not ring/neck/trink/tome
        {
            if (itemInfo[2] == 14)//if shield
            {
                temp.SetArmor(<number>(200 * commonMath))
                temp.SetBlock(<number>(commonMath))
            }
            else {
                temp.SetArmor(<number>(3.3 * commonMath * armorScalar[itemInfo[1]]))
            }
        }
    } else {//setup weapon swing damage
        if (itemInfo[2] == 13) {//1h
            temp.SetDelay(1500 + (getRandNumber(7) * 100))
            temp.SetDamageMinA(<number>(5 * commonMath))
            temp.SetDamageMaxA(<number>(8 * commonMath))
            if (temp.GetQuality() == 5) {
                temp.SetDamageMinB(<number>(2 * commonMath))
                temp.SetDamageMaxB(<number>(3 * commonMath))
            }
        } else if (itemInfo[2] == 17) {//2h
            temp.SetDelay(2800 + (getRandNumber(10) * 100))
            temp.SetDamageMinA(<number>(12 * commonMath))
            temp.SetDamageMaxA(<number>(22 * commonMath))
            if (temp.GetQuality() == 5) {
                temp.SetDamageMinB(<number>(4 * commonMath))
                temp.SetDamageMaxB(<number>(6 * commonMath))
            }
        } else if (itemInfo[2] == 26 || itemInfo[2] == 15) {//ranged
            temp.SetDelay(1800 + (getRandNumber(6) * 100))
            temp.SetDamageMinA(<number>(5 * commonMath))
            temp.SetDamageMaxA(<number>(6 * commonMath))
            if (temp.GetQuality() == 5) {
                temp.SetDamageMinB(<number>(3 * commonMath))
                temp.SetDamageMaxB(<number>(4 * commonMath))
            }
        }
    }
    temp.SetName(getName(itemInfo, temp.GetQuality()))
    temp.SetDisplayInfoID(getDisplayID(itemInfo, temp.GetQuality()))
    generateStats(itemLevel, temp, itemInfo[5], statType)

    temp.Save()
    return temp
}

function generateStats(itemLevel: number, temp: TSItemTemplate, slotMult: number, statType: number) {
    let group = getStatGroup(statType, temp.GetQuality())
    let totalStats = slotMult * itemLevel * 4 * qualityMultiplier[temp.GetQuality()]
    let statsPrimary: number = totalStats * .7
    let statsSecondary: number = totalStats * .35
    let flat1: number = statsPrimary * .1//forced value to each stat
    let flat2: number = statsSecondary * .1//forced value to each stat
    let stats = CreateDictionary<number, int32>({})

    //apply flat primary
    for (let j = 0; j < group[0].length; j++) {
        stats[group[0][j]] = flat1
        statsPrimary -= flat1
    }
    //distribute primary stats
    while (statsPrimary > 0) {
        stats[group[0][getRandNumber(group[0].length)]]++
        statsPrimary--
    }
    //apply flat secondary
    for (let j = 0; j < group[1].length; j++) {
        stats[group[1][j]] = flat2
        statsSecondary -= flat2
    }
    //distribute secondary stats
    while (statsSecondary > 0) {
        stats[group[1][getRandNumber(group[1].length)]]++
        statsSecondary--
    }
    //apply stats to item
    let index = 0
    stats.forEach((key, val) => {
        temp.SetStatType(index, key)
        temp.SetStatValue(index, <int32>(val * statToWeight[key]))
        index++
    })
    temp.SetStatsCount(index)
}

function GetRandQuality(): number {
    let qualityCheck = getRandNumber(100)
    if (qualityCheck < 50) {//uncommon
        return 2
    } else if (qualityCheck < 80) {//rare
        return 3
    } else if (qualityCheck < 98) {//epic
        return 4
    } else {//legendary
        return 5
    }
}

function chooseItemType(): number[] {
    if (getRandNumber(100) < 85) {//armor
        return itemClassInfo[0][getRandNumber(itemClassInfo[0].length)]
    } else {//weapon
        return itemClassInfo[1][getRandNumber(itemClassInfo[1].length)]
    }
}

function getDisplayID(itemInfoArr: number[], quality: number): number {
    let chose: number[] = <number[]>displayDict[quality][itemInfoArr[0]][itemInfoArr[2]][itemInfoArr[1]]
    return chose[getRandNumber(chose.length)]
}

function getName(itemInfoArr: number[], quality: number): string {
    let name: string = ""
    //prefix
    if (quality > 2) {
        name = prefixPostfixArray[0][getRandNumber(prefixPostfixArray[0].length)] + " "
    }
    //base name
    name = name + baseNameDict[itemInfoArr[0]][itemInfoArr[1]][itemInfoArr[2]][getRandNumber(baseNameDict[itemInfoArr[0]][itemInfoArr[1]][itemInfoArr[2]].length)]
    //suffix
    if (quality == 4 || quality == 5) {
        name = name + " " + prefixPostfixArray[1][getRandNumber(prefixPostfixArray[1].length)]
    }
    return name
}

function setupStartingID() {
    //we start our custom items at 200k
    let q = QueryCharacters('SELECT MAX(entry) FROM custom_item_template')
    while (q.GetRow()) {
        if (startID < (q.GetUInt32(0) + 1))
            startID = (q.GetUInt32(0) + 1)
    }
}

function setupDisplayIDDict() {
    //quality->class->invType->subclass->[displayIDs]
    let q = QueryWorld('SELECT * FROM custom_item_template_displays')
    while (q.GetRow()) {
        displayDict[q.GetUInt32(0)][q.GetUInt32(1)][q.GetUInt32(3)][q.GetUInt32(2)].push(q.GetUInt32(4))
    }
}

function setupBaseNameDict() {
    let q = QueryWorld('SELECT * FROM custom_item_template_names WHERE nametype = 2')
    while (q.GetRow()) {
        baseNameDict[q.GetUInt32(1)][q.GetUInt32(2)][q.GetUInt32(3)].push(q.GetString(4))
    }
}

function setupPrefixPostfixDict() {
    let q = QueryWorld('SELECT  name FROM custom_item_template_names WHERE nametype = 1')
    while (q.GetRow()) {
        prefixPostfixArray[0].push(q.GetString(0))
    }
    q = QueryWorld('SELECT name FROM custom_item_template_names WHERE nametype = 3')
    while (q.GetRow()) {
        prefixPostfixArray[1].push(q.GetString(0))
    }
}
function getStatGroup(statType: number, quality: number): number[][] {
    let curStatCounts = statCounts[quality]
    let statGroup = <number[][]>[<number[]>[], <number[]>[]]
    for (let i = 0; i < curStatCounts[0]; i++) {
        statGroup[0].push(statChoices[0][statType][getRandNumber(statChoices[0][statType].length)])
    }
    for (let i = 0; i < curStatCounts[1]; i++) {
        statGroup[1].push(statChoices[1][statType][getRandNumber(statChoices[1][statType].length)])
    }
    return statGroup
}