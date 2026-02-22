import { std } from "wow/wotlk"
import { MODNAME } from "./adventurer"

export const kitNames = [//update with new kit
    "Knight",
    "Berserker",
    "Hunter",
    "Rogue",
    "Priest",
    "DK",
    "Shaman",
    "Mage",
    "Warlock",
    "Druid",
]

export const kitTextures = [//update with new kit
    "inv_hammer_01",
    "inv_sword_27", 
    "inv_weapon_bow_07",
    "inv_throwingknife_04",
    "inv_staff_30",
    "Spell_Deathknight_KitIcon",
    "inv_jewelry_talisman_04",
    "inv_staff_13",
    "spell_nature_drowsy",
    "inv_misc_monsterclaw_04",
]

for (let i = 0; i < kitNames.length; i++) {
    std.Spells.create(MODNAME, kitNames[i] + '-aura', 42053)
        .Name.enGB.set(kitNames[i] + ' Specialization')
        .Description.enGB.set('This adventurer is currently specializing in ' + kitNames[i] + ' abilities.')
        .Icon.setPath(kitTextures[i])
        .Duration.setSimple(-1)
        .Tags.add(MODNAME, 'class-auras')
}