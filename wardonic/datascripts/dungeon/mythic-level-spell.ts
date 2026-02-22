// ============================================================================
//
// - Dungeon Master Script Entities -
//
//   This file creates the base entities for any dungeon
//
// - External scripts -
//   Livescripts: livescripts/dungeon/dungeon-master
//
// ============================================================================

import { std } from "wow/wotlk";
import { MODNAME } from "../modname";

export let mapMythicLevel = std.Spells.create(MODNAME, "map-mythic-level-spell", 71188);
mapMythicLevel.Name.enGB.set("Mythic Level");
mapMythicLevel.Description.enGB.set(
    "Damage done increased by $s1%. Health increased by $s2%."
);
mapMythicLevel.AuraDescription.enGB.set(
    "Damage done increased by $s1%. Attack and casting speeds increased by $s2%. Health increased by $s3%."
);
mapMythicLevel.Effects.get(0).PointsBase.set(9);
mapMythicLevel.Effects.get(1).PointsBase.set(2);
mapMythicLevel.Effects.get(2).PointsBase.set(9);
mapMythicLevel.Effects.get(2).Aura.MOD_INCREASE_HEALTH_PERCENT.set();
mapMythicLevel.Duration.set(21);
mapMythicLevel.row.Attributes.set(
    mapMythicLevel.row.Attributes.get() + 0x80000000 + 0x00000080
);
mapMythicLevel.Attributes.PERSISTS_DEATH.set(1);
mapMythicLevel.Attributes.NOT_STEALABLE.set(1);
mapMythicLevel.Attributes.AURA_VISIBLE_TO_CASTER_ONLY.set(1);