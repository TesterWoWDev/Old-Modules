
import { std } from "wow/wotlk";
import { MODNAME } from "../modname";

std.DBC.CreatureModelData.add(3500).ModelName.set('World\\Expansion01\\Doodads\\ZulAman\\Ruins\\TrollRuins_ZulAman_07.mdx').CollisionWidth.set(1).CollisionHeight.set(3).GeoBoxMinX.set(-1.57329094409943).GeoBoxMaxX.set(1.57456505298615).GeoBoxMinY.set(-1.83399701118469).GeoBoxMaxY.set(1.80083501338959).GeoBoxMinZ.set(-0.13425900042057).GeoBoxMaxZ.set(4.46832180023193)
std.DBC.CreatureDisplayInfo.add(35000).ModelID.set(3500)
std.SQL.creature_model_info.add(35000).BoundingRadius.set(1)
export let torghastVase = std.CreatureTemplates.create(MODNAME,'torghast-vase',21185)
torghastVase.Name.enGB.set('Torghast Vase')
torghastVase.Level.set(20,20)
torghastVase.Models.clearAll()
torghastVase.Models.addIds(35000)
torghastVase.Scale.set(0.3)
torghastVase.FactionTemplate.set(189)

export let torghastFinalObj = std.GameObjectTemplates.Rituals.create(
    MODNAME,
    "torghastendobj",
    177193
);
torghastFinalObj.Name.enGB.set("Mystical Stone");

export let torghastChest = std.GameObjectTemplates.Rituals.create(
    MODNAME,
    "torghast-chest",
    177193
);
torghastChest.Name.enGB.set("Anima Chest");
torghastChest.Display.set(88077)
torghastChest.Size.set(2)

export let torghastOrb = std.CreatureTemplates.create(
    MODNAME,
    "torghast-orb",
    40083
);
torghastOrb.Name.enGB.set("torghast spell creature");
torghastOrb.Scale.set(0.5);
torghastOrb.HoverHeight.set(2);

export let torghastChoice = std.Spells.create(
    MODNAME,
    "torghastchoice-spell",
    66701
);
torghastChoice.Name.enGB.set("Anima Cell Spawn");
torghastChoice.Description.enGB.set(
    "Using this allows you and your alies to select an additional power."
);
torghastChoice.Effects.get(0).ImplicitTargetA.DEST_DEST_FRONT.set();
torghastChoice.Effects.get(0).Radius.setSimple(5, 0, 5);
torghastChoice.Effects.get(0).Type.SUMMON.set();
torghastChoice.Effects.get(0).MiscValueA.set(torghastOrb.ID);
torghastChoice.Effects.get(0).MiscValueB.set(64);

export let animaCellItem = std.Items.create(
    MODNAME,
    "torghastchoice-item",
    118
);
animaCellItem.Name.enGB.set("Anima Cell");
animaCellItem.Spells.clearAll();
animaCellItem.Spells.addMod((spell) => {
    spell.Spell.set(torghastChoice.ID);
    spell.Charges.set(1,"DELETE_ITEM");
    spell.ProcsPerMinute.set(-1);
    spell.Cooldown.set(3000);
});

export let mapPrestige = std.Spells.create(MODNAME, "mapprestige-spell", 71188);
mapPrestige.Name.enGB.set("Prestige");
mapPrestige.Description.enGB.set(
    "Damage done increased by $s1%. Health increased by $s2%."
);
mapPrestige.AuraDescription.enGB.set(
    "Damage done increased by $s1%. Attack and casting speeds increased by $s2%. Health increased by $s3%."
);
mapPrestige.Effects.get(0).PointsBase.set(9);
mapPrestige.Effects.get(1).PointsBase.set(9);
mapPrestige.Effects.get(2).PointsBase.set(9);
mapPrestige.Effects.get(2).Aura.MOD_INCREASE_HEALTH_PERCENT.set();
mapPrestige.Duration.set(21);
mapPrestige.row.Attributes.set(
    mapPrestige.row.Attributes.get() + 0x80000000 + 0x00000080
);
mapPrestige.Attributes.PERSISTS_DEATH.set(1);
mapPrestige.Attributes.NOT_STEALABLE.set(1);
mapPrestige.Attributes.AURA_VISIBLE_TO_CASTER_ONLY.set(1);

std.DBC.CurrencyCategory.add(50).Name.enGB.set('Torghast').Flags.set(16712190)

export let torghastEndCurrency = std.Items.create(MODNAME,'torghast-end-currency',37742)
torghastEndCurrency.Name.enGB.set('Torghast End Token')
torghastEndCurrency.Description.enGB.set('This currency is rewarded from torghast')
torghastEndCurrency.MaxStack.set(2147483647)
torghastEndCurrency.MaxCount.set(2147483647)
std.DBC.CurrencyTypes.add(350).ItemID.set(torghastEndCurrency.ID).CategoryID.set(50).BitIndex.set(60)

export let torghastInsideCurrency = std.Items.create(MODNAME,'torghast-inside-currency',37742)
torghastInsideCurrency.Name.enGB.set('Torghast Inside Token')
torghastEndCurrency.Description.enGB.set('This currency is rewarded inside torghast')
torghastInsideCurrency.MaxStack.set(2147483647)
torghastInsideCurrency.MaxCount.set(2147483647)
std.DBC.CurrencyTypes.add(351).ItemID.set(torghastInsideCurrency.ID).CategoryID.set(50).BitIndex.set(60)

std.DBC.ItemExtendedCost.add(6000)
.ItemCount.fill(0).ItemCount.set([500])
.ItemID.fill(0).ItemID.set([torghastInsideCurrency.ID])
.HonorPoints.set(0).ArenaPoints.set(0)

let torghastVendor = std.CreatureTemplates.create(
    MODNAME,
    "torghast-vendor",
    3562
);
torghastVendor.Name.enGB.set("Test Vendor");
torghastVendor.Subname.enGB.set("All Powerful");
torghastVendor.FactionTemplate.set(35);
torghastVendor.Vendor.add(animaCellItem.ID,6000);