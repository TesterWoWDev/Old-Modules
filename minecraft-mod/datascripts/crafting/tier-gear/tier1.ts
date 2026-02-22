import { std } from "wow/wotlk";
import { createBaseResources, createGear, createMaterial, createTrinket, createWeapons } from "../../functions/item-functions";
import { generateGearRecipes, generateWeaponRecipes } from "../../functions/recipe-functions";
import { MODNAME } from "../../modname";

let levelrequirement = 10;

export let stringItem = std.Items.create(MODNAME, 'string', 2934)
stringItem.Name.enGB.set('String')
stringItem.DisplayInfo.set(58198)
stringItem.Description.enGB.set('A unique piece of string.')

export let tierOneBaseResources = createBaseResources(
    2,
    "tier1-resource",
    "Worn",
    ["Pearl", "Epaulet", "Chain", "Metal", "Reinforced Metal", "Stick", "Dust"],
    [12310, 35338, 39340, 7355, 7389, 2618, 6371]
);
//
export let tierOneMailMaterial = createMaterial(
    2,
    "tier1-mat-mail",
    "Worn Mail Scraps",
    "mail armor pieces",
    22924
);
export let tierOneMailGear = createGear(
    levelrequirement,
    "tier1-gear-mail",
    'mail',
    2,
    3,
    [
        "Trainee's Worn Helm",
        "Trainee's Worn Necklace",
        "Trainee's Worn Spaulders",
        "Trainee's Worn Cloak",
        "Trainee's Worn Chestguard",
        "Trainee's Worn Bracers",
        "Trainee's Worn Gloves",
        "Trainee's Worn Belt",
        "Trainee's Worn Legguards",
        "Trainee's Worn Greaves",
        "Trainee's Worn Ring",
    ],
    [16115, 9854, 9407, 23068, 32157, 32158, 9406, 24514, 4333, 9404, 9836],
);
tierOneMailGear.push(
    createTrinket(
        levelrequirement,
        "tier1-trink-mail",
        2,
        "Trainee's Worn Trinket",
        9637,
    )
);
generateGearRecipes(tierOneBaseResources[0], tierOneMailMaterial, tierOneBaseResources[1], tierOneBaseResources[2], tierOneMailGear, levelrequirement)
//
export let tierOneLeatherMaterial = createMaterial(
    2,
    "tier1-mat-leather",
    "Worn Leather Scraps",
    "leather armor pieces",
    29468
);
export let tierOneLeatherGear = createGear(
    levelrequirement,
    "tier1-gear-leather",
    'leather',
    2,
    2,
    [
        "Trainee's Worn Hat",
        "Trainee's Worn Necklace",
        "Trainee's Worn Shoulderpads",
        "Trainee's Worn Cloak",
        "Trainee's Worn Chestpad",
        "Trainee's Worn Bracers",
        "Trainee's Worn Gloves",
        "Trainee's Worn Belt",
        "Trainee's Worn Pants",
        "Trainee's Worn Boots",
        "Trainee's Worn Ring",
    ],
    [25729, 6539, 11274, 23068, 9502, 14002, 2362, 45056, 9514, 13864, 9833],
);
tierOneLeatherGear.push(
    createTrinket(
        levelrequirement,
        "tier1-trink-leather",
        2,
        "Trainee's Worn Trinket",
        22794,
    )
);
//
generateGearRecipes(tierOneBaseResources[0], tierOneLeatherMaterial, tierOneBaseResources[1], tierOneBaseResources[2], tierOneLeatherGear, levelrequirement)

export let tierOneClothMaterial = createMaterial(
    2,
    "tier1-mat-cloth",
    "Worn Cloth Scraps",
    "cloth armor pieces",
    7383
);

export let tierOneClothGear = createGear(
    levelrequirement,
    "tier1-gear-cloth",
    'cloth',
    2,
    1,
    [
        "Trainee's Worn Headress",
        "Trainee's Worn Necklace",
        "Trainee's Worn Shoulders",
        "Trainee's Worn Cloak",
        "Trainee's Worn Chestpiece",
        "Trainee's Worn Bracers",
        "Trainee's Worn Gloves",
        "Trainee's Worn Belt",
        "Trainee's Worn Leggings",
        "Trainee's Worn Mocassins",
        "Trainee's Worn Ring",
    ],
    [15314, 9853, 17135, 23068, 8721, 8089, 13681, 24978, 24927, 24935, 9823],
);
tierOneClothGear.push(
    createTrinket(
        levelrequirement,
        "tier1-trink-cloth",
        2,
        "Trainee's Worn Trinket",
        15771,
    )
);
generateGearRecipes(tierOneBaseResources[0], tierOneClothMaterial, tierOneBaseResources[1], tierOneBaseResources[2], tierOneClothGear, levelrequirement)
//
export let tierOneWeapons = createWeapons(
    levelrequirement,
    "tier1-weps",
    2,
    [
        "Trainee's Worn Shortsword",
        "Trainee's Worn Cudgel",
        "Trainee's Worn Carver",
        "Trainee's Worn Shiv",
        "Trainee's Worn Broadsword",
        "Trainee's Worn Bludgeon",
        "Trainee's Worn Cleaver",
        "Trainee's Worn Reliquery",
        "Trainee's Worn Polearm",
        "Trainee's Worn Recurve",
        "Trainee's Worn Staff",
        "Trainee's Worn Wand",
        "Trainee's Worn Buckler",
        "Trainee's Worn Knuckles",
    ],
    [
        5153, 5211, 8496, 6434, 20196, 16146, 8528, 31805, 40409, 8104, 28699,
        40146, 26234, 3007,
    ],
);
generateWeaponRecipes(tierOneBaseResources[0], tierOneBaseResources[5], tierOneBaseResources[3], tierOneBaseResources[4], stringItem.ID, tierOneWeapons, levelrequirement)