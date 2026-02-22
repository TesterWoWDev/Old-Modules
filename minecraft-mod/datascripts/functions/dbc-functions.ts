import { std } from "wow/wotlk"

export function addToDBCItemExtendedCost(
    index: number,
    reqHonor: number,
    reqArena: number,
    ArenaSlotID: number,
    reqItems: number[],
    reqItemCount: number[],
    PersonalRating: number
) {
    std.DBC.ItemExtendedCost.add(index)
        .HonorPoints.set(reqHonor)
        .ArenaPoints.set(reqArena)
        .ArenaBracket.set(ArenaSlotID)
        .ItemID.set(reqItems)
        .ItemCount.set(reqItemCount)
        .RequiredArenaRating.set(PersonalRating);
}

export function addToDBCItemRandomProperties(
    name: string,
    propIndex: number,
    enchIndex: number,
    index1val: number,
    index2val: number,
    index3val: number,
    chance: number,
    SpellItemEnchantmentIndex: number
) {
    std.DBC.ItemRandomProperties.add(propIndex)
        .Name2.enGB.set(name)
        .Enchantment.setIndex(0, SpellItemEnchantmentIndex - index1val)
        .Enchantment.setIndex(1, SpellItemEnchantmentIndex - index2val)
        .Enchantment.setIndex(2, SpellItemEnchantmentIndex - index3val);
    std.SQL.item_enchantment_template.add(enchIndex, propIndex).chance.set(chance);
}

export function addToDBCSpellItemEnchantment(
    effect1type: number,
    effect1stattype: number,
    effect1max: number,
    effect1min: number,
    effect2type: number,
    effect2stattype: number,
    effect2max: number,
    effect2min: number,
    name: string,
    index: number
) {
    std.DBC.SpellItemEnchantment.add(index)
        .Name.enGB.set(name)
        .Effect.setIndex(0, effect1type)
        .EffectArg.setIndex(0, effect1stattype)
        .EffectPointsMax.setIndex(0, effect1max)
        .EffectPointsMin.setIndex(0, effect1min)
        .Effect.setIndex(1, effect2type)
        .EffectArg.setIndex(1, effect2stattype)
        .EffectPointsMax.setIndex(1, effect2max)
        .EffectPointsMin.setIndex(1, effect2min);
}
