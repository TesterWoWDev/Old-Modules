import { createBaseResources, createGear, createMaterial, createTrinket, createWeapons } from "../../functions/item-functions";
import { generateGearRecipes, generateWeaponRecipes } from "../../functions/recipe-functions";
import { stringItem } from "./tier1";

let levelrequirement = 15;

export let tierTwoBaseResources = createBaseResources(
    2,
    "tier2-resource",
    "Reinforced",
    ["Pearl", "Epaulet", "Chain", "Metal", "Reinforced Metal", "Stick", "Dust"],
    [12310, 35338, 39340, 7355, 7389, 2618, 6371]
);
//
export let tierTwoMailMaterial = createMaterial(
    2,
    "tier2-mat-mail",
    "Reinforced Mail Scraps",
    "mail armor pieces",
    22924
);
export let tierTwoMailGear = createGear(
    levelrequirement,
    "tier2-gear-mail",
    'mail',
    2,
    3,
    [
        "Trainee's Reinforced Helm",
        "Trainee's Reinforced Necklace",
        "Trainee's Reinforced Spaulders",
        "Trainee's Reinforced Cloak",
        "Trainee's Reinforced Chestguard",
        "Trainee's Reinforced Bracers",
        "Trainee's Reinforced Gloves",
        "Trainee's Reinforced Belt",
        "Trainee's Reinforced Legguards",
        "Trainee's Reinforced Greaves",
        "Trainee's Reinforced Ring",
    ],
    [16115, 9854, 9407, 23068, 32157, 32158, 9406, 24514, 4333, 9404, 9836],
);
tierTwoMailGear.push(
    createTrinket(
        levelrequirement,
        "tier2-trink-mail",
        2,
        "Trainee's Reinforced Trinket",
        9637,
    )
);
generateGearRecipes(tierTwoBaseResources[0], tierTwoMailMaterial, tierTwoBaseResources[1], tierTwoBaseResources[2], tierTwoMailGear, levelrequirement)
//
export let tierTwoLeatherMaterial = createMaterial(
    2,
    "tier2-mat-leather",
    "Reinforced Leather Scraps",
    "leather armor pieces",
    29468
);
export let tierTwoLeatherGear = createGear(
    levelrequirement,
    "tier2-gear-leather",
    'leather',
    2,
    2,
    [
        "Trainee's Reinforced Hat",
        "Trainee's Reinforced Necklace",
        "Trainee's Reinforced Shoulderpads",
        "Trainee's Reinforced Cloak",
        "Trainee's Reinforced Chestpad",
        "Trainee's Reinforced Bracers",
        "Trainee's Reinforced Gloves",
        "Trainee's Reinforced Belt",
        "Trainee's Reinforced Pants",
        "Trainee's Reinforced Boots",
        "Trainee's Reinforced Ring",
    ],
    [25729, 6539, 11274, 23068, 9502, 14002, 2362, 45056, 9514, 13864, 9833],
);
tierTwoLeatherGear.push(
    createTrinket(
        levelrequirement,
        "tier2-trink-leather",
        2,
        "Trainee's Reinforced Trinket",
        22794,
    )
);
//
generateGearRecipes(tierTwoBaseResources[0], tierTwoLeatherMaterial, tierTwoBaseResources[1], tierTwoBaseResources[2], tierTwoLeatherGear, levelrequirement)

export let tierTwoClothMaterial = createMaterial(
    2,
    "tier2-mat-cloth",
    "Reinforced Cloth Scraps",
    "cloth armor pieces",
    7383
);

export let tierTwoClothGear = createGear(
    levelrequirement,
    "tier2-gear-cloth",
    'cloth',
    2,
    1,
    [
        "Trainee's Reinforced Headress",
        "Trainee's Reinforced Necklace",
        "Trainee's Reinforced Shoulders",
        "Trainee's Reinforced Cloak",
        "Trainee's Reinforced Chestpiece",
        "Trainee's Reinforced Bracers",
        "Trainee's Reinforced Gloves",
        "Trainee's Reinforced Belt",
        "Trainee's Reinforced Leggings",
        "Trainee's Reinforced Mocassins",
        "Trainee's Reinforced Ring",
    ],
    [15314, 9853, 17135, 23068, 8721, 8089, 13681, 24978, 24927, 24935, 9823],
);
tierTwoClothGear.push(
    createTrinket(
        levelrequirement,
        "tier2-trink-cloth",
        2,
        "Trainee's Reinforced Trinket",
        15771,
    )
);
generateGearRecipes(tierTwoBaseResources[0], tierTwoClothMaterial, tierTwoBaseResources[1], tierTwoBaseResources[2], tierTwoClothGear, levelrequirement)
//
export let tierTwoWeapons = createWeapons(
    levelrequirement,
    "tier2-weps",
    2,
    [
        "Trainee's Reinforced Shortsword",
        "Trainee's Reinforced Cudgel",
        "Trainee's Reinforced Carver",
        "Trainee's Reinforced Shiv",
        "Trainee's Reinforced Broadsword",
        "Trainee's Reinforced Bludgeon",
        "Trainee's Reinforced Cleaver",
        "Trainee's Reinforced Reliquery",
        "Trainee's Reinforced Polearm",
        "Trainee's Reinforced Recurve",
        "Trainee's Reinforced Staff",
        "Trainee's Reinforced Wand",
        "Trainee's Reinforced Buckler",
        "Trainee's Reinforced Knuckles",
    ],
    [
        5153, 5211, 8496, 6434, 20196, 16146, 8528, 31805, 40409, 8104, 28699,
        40146, 26234, 3007,
    ],
);
generateWeaponRecipes(tierTwoBaseResources[0], tierTwoBaseResources[5], tierTwoBaseResources[3], tierTwoBaseResources[4], stringItem.ID, tierTwoWeapons, levelrequirement)