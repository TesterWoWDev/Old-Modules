import { std } from "wow/wotlk";
export const MODNAME = 'crafting'

export const craftingProfession = std.Professions
    .create(MODNAME, 'crafting-profession')
    .Name.enGB.set('Crafting')
    .setHasCrafting(true)
.AsSkillLine.mod(x => x.Category.PROFESSION.set())
export const craftingProfessionApprentice = craftingProfession.Ranks.addGet(MODNAME, 'profession-rank-1', 75, { enGB: 'Apprentice' })
export const craftingProfessionJourneyman = craftingProfession.Ranks.addGet(MODNAME, 'profession-rank-2', 125, { enGB: 'Journeyman' })
export const craftingProfessionMaster = craftingProfession.Ranks.addGet(MODNAME, 'profession-rank-3', 200, { enGB: 'Master' })

export function createRecipe(name: string, castTime: number, outputItemID: number, outputCount: number, yellowRank: number, greyRank: number, reagents: number[][]) {
    const recipe = craftingProfession.Recipes.addGet(MODNAME, name)
        .OutputItem.set(outputItemID)
        .OutputCount.set(outputCount - 1)
        .Ranks.Yellow.set(yellowRank)
        .Ranks.Gray.set(greyRank)
        .Reagents.clearAll()
    reagents.forEach(([itemID, quantity]) => {
        recipe.Reagents.add(itemID, quantity)
    });

    recipe.AsSpell()
        .Name.enGB.set(name)
        .Icon.setPath("inv_inscription_armorscroll03")
        .Visual.set(3182)
        .Tags.add(MODNAME, 'crafting-recipe')
        .CastTime.setSimple(castTime)
}
