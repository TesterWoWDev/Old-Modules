import { std } from "wow/wotlk";

import { MODNAME } from "../modname";

//tiername,parent,prefix,[itemnames]
//let returnItems = createBaseResources('tier1',2934,'prefix',['moonstone','leather','epulet','chain','steel','reinforced steel','string'])

//statType = 0-str,1-agi,2-int,materialType = 1-cloth,2-leather,3-mail,4-plate
//prefix,quality,statType,statMult,stamMult,matType,names
//let allGear = createGear('prefix',1,0,1,1.5,3,['head','neck','shoulder','back','chest','bracer','hand','belt','leg','boot','ring','trink','ohs','ohm','oha','dag','ths','thm','tha','book','pole','bow','staff','wand','shield','fist'])

//gem,material,epulet,chain[head,neck,shoulder,back,chest,bracer,hand,belt,leg,boot,ring,trink]
//generateGearRecipes(returnItems[0],returnItems[1],returnItems[2],returnItems[3],[allGear[0],allGear[1],allGear[2],allGear[3],allGear[4],allGear[5],allGear[6],allGear[7],allGear[8],allGear[9],allGear[10],allGear[11]])

//material,metal,reinforced,string,chain,[ohs,ohm,oha,dag,ths,thm,tha,book,pole,bow,staff,wand,shield,fist]
//generateWeaponRecipes(returnItems[0],returnItems[1],returnItems[4],returnItems[5],returnItems[6],[allGear[12],allGear[13],allGear[14],allGear[15],allGear[16],allGear[17],allGear[18],allGear[19],allGear[20],allGear[21],allGear[22],allGear[23],allGear[24],allGear[25]])

export function createMaterial(
    QualityValue: number,
    tier: string,
    itemName: string,
    description: string,
    displayInfoID: number
): number {
    let parentItem = 2934;
    let item = std.Items.create(
        MODNAME,
        tier,
        parentItem
    );
    item.Quality.set(QualityValue);
    item.Name.enGB.set(itemName);
    item.DisplayInfo.set(displayInfoID);
    item.Description.enGB.set(description);
    item.ItemLevel.set(0);
    item.MaxStack.set(900);
    return item.ID;
}

export function createBaseResources(
    QualityValue: number,
    tier: string,
    itemPrefix: string,
    Names: string[],
    displayIDs: number[]
): number[] {
    let returnIDs = [];
    for (let i = 0; i < Names.length; i++) {
        let item = std.Items.create(
            MODNAME,
            tier + "-" + Names[i].toLowerCase().replace(" ", "-"),
            2934
        );
        item.Quality.set(QualityValue);
        item.Name.enGB.set(itemPrefix + " " + Names[i]);
        item.DisplayInfo.set(displayIDs[i]);
        //item.Description.enGB.set(description)
        item.ItemLevel.set(0);
        item.MaxStack.set(900);
        returnIDs.push(item.ID);
    }
    return returnIDs;
}

export function createGear(
    levelrequirement: number,
    tier: string,
    tagString: string,
    quality: number,
    materialType: number,
    names: string[],
    display: number[],
): number[] {
    let t = [
        'head',
        'neck',
        'shoulder',
        'cloak',
        'chest',
        'wrists',
        'hands',
        'waist',
        'legs',
        'boots',
        'ring',
    ]
    let ids = [
        [4, materialType, 1],
        [4, 0, 2],
        [4, materialType, 3],
        [4, 1, 16],
        [4, materialType, 5],
        [4, materialType, 9],
        [4, materialType, 10],
        [4, materialType, 6],
        [4, materialType, 7],
        [4, materialType, 8],
        [4, 0, 11],
    ];
    let returnIDs = [];

    for (let i = 0; i < names.length; i++) {
        let item = std.Items.create(
            MODNAME,
            tier + "-" + names[i].toLowerCase().replace('\'', '').replace(" ", "-").replace(" ", "-"),
            38
        );
        item.Tags.add('minecraft-mod', tagString +'-'+ t[i]);
        item.Class.set(ids[i][0], ids[i][1]);
        item.InventoryType.set(ids[i][2]);
        item.Quality.set(quality);
        item.Description.enGB.set("This is a display item and will be changed when crafted");
        item.RequiredLevel.set(levelrequirement);
        item.Name.enGB.set(names[i]);
        item.DisplayInfo.set(display[i]);
        item.Bonding.BINDS_ON_EQUIP.set();

        returnIDs.push(item.ID);
    }
    return returnIDs;
}

export function createTrinket(
    levelrequirement: number,
    tier: string,
    quality: number,
    name: string,
    display: number,
) {
    let ids = [4, 0, 12];
    let item = std.Items.create(
        MODNAME,
        tier + "-" + name.toLowerCase().replace('\'', '').replace(" ", "-").replace(" ", "-"),
        38
    );
    item.Class.set(ids[0], ids[1]);
    item.InventoryType.set(ids[2]);
    item.Quality.set(quality);
    item.Description.enGB.set("This is a display item and will be changed when crafted");
    item.RequiredLevel.set(levelrequirement);
    item.Name.enGB.set(name);
    item.DisplayInfo.set(display);
    item.Durability.set(20);
    item.Bonding.BINDS_ON_EQUIP.set();
    item.Tags.add('minecraft-mod','trinket')

    return item.ID;
}

export function createWeapons(
    levelrequirement: number,
    tier: string,
    quality: number,
    names: string[],
    display: number[],
): number[] {

    let t = [
        '1h-sword',
        '1h-mace',
        '1h-axe',
        'dagger',
        '2h-sword',
        '2h-mace',
        '2h-axe',
        'tome',
        'polearm',
        'bow',
        'staff',
        'wand',
        'shield',
        'fist-wep',
    ]

    let ids = [
        [2, 7, 13],
        [2, 4, 13],
        [2, 0, 13],
        [2, 15, 13],
        [2, 8, 17],
        [2, 5, 17],
        [2, 1, 17],
        [4, 0, 23],
        [2, 6, 17],
        [2, 2, 26],
        [2, 10, 17],
        [2, 19, 26],
        [4, 6, 14],
        [2, 13, 13],
    ];
    let returnIDs = [];
    for (let i = 0; i < names.length; i++) {
        let item = std.Items.create(
            MODNAME,
            tier + "-" + names[i].toLowerCase().replace("'", "").replace(" ", "-").replace(" ", "-"),
            38
        );
        item.Tags.add('minecraft-mod', t[i]);
        item.Class.set(ids[i][0], ids[i][1]);
        item.InventoryType.set(ids[i][2]);
        item.Quality.set(quality);
        item.Description.enGB.set("This is a display item and will be changed when crafted");
        item.RequiredLevel.set(levelrequirement);
        item.Name.enGB.set(names[i]);
        item.DisplayInfo.set(display[i]);
        item.Durability.set(20);
        item.Bonding.BINDS_ON_EQUIP.set();

        returnIDs.push(item.ID);
    }
    return returnIDs;
}