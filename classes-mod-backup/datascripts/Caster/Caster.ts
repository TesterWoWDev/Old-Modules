import { std } from 'tswow-stdlib';
import { MODNAME } from '../moduleName';

export const CASTER_CLASS = std.Classes.create(MODNAME,'caster','MAGE');

export const NECROMANCER_ROBE = std.Items.create(MODNAME,'caster-class-robe',56)
CASTER_CLASS.addRaces(['HUMAN','ORC','DWARF','GNOME','BLOODELF','DRAENEI','NIGHTELF','TAUREN','TROLL','UNDEAD']);
CASTER_CLASS.Name.enGB.set('Caster');
CASTER_CLASS.UI.ClassButton.setPos(-52,-460)
CASTER_CLASS.RequiredExpansion.set(1)
CASTER_CLASS.EquipSkills.Staves.setAuto();
CASTER_CLASS.EquipSkills.Cloth.setAuto();
CASTER_CLASS.EquipSkills.Polearms.setAuto();
// CASTER_CLASS.StartGear.Mainhand.set(41821)

// CASTER_CLASS.UI.TCoords.set(0.5,0.75,0.5,0.75);

// Change the stats
CASTER_CLASS.UI.Color.set(0xcc0077)
CASTER_CLASS.UI.Info.add('- Role: Damage, Healer')
CASTER_CLASS.UI.Info.add('- Light Armor (Cloth)')
CASTER_CLASS.UI.Info.add('- Magiky')
CASTER_CLASS.UI.Info.add('- Uses mana as a resource')
CASTER_CLASS.UI.Description.set("I handle all the magic")

// Spell Crit = 0.1*level
CASTER_CLASS.Stats.SpellCrit.set((x,level)=>0.000005*level)
// Melee crit = 0.1*level
CASTER_CLASS.Stats.MeleeCrit.set((x,level)=>0.00008*level)


export const DEATH_SKILL = std.SkillLines.createClass(MODNAME,'death-skill',CASTER_CLASS.ID)
		DEATH_SKILL.Name.enGB.set(`Death`)
		DEATH_SKILL.Icon.set('Interface\\Icons\\spell_shadow_fingerofdeath.blp')

export const ARCANE_SKILL = std.SkillLines.createClass(MODNAME,'arcane-skill',CASTER_CLASS.ID)
		ARCANE_SKILL.Name.enGB.set(`Arcane`)
		ARCANE_SKILL.Icon.set('Interface\\Icons\\spell_arcane_starfire.blp')

export const FIRE_SKILL = std.SkillLines.createClass(MODNAME,'fire-skill',CASTER_CLASS.ID)
		FIRE_SKILL.Name.enGB.set(`Fire`)
		FIRE_SKILL.Icon.set('Interface\\Icons\\ability_mage_firestarter.blp')

export const FROST_SKILL = std.SkillLines.createClass(MODNAME,'frost-skill',CASTER_CLASS.ID)
		FROST_SKILL.Name.enGB.set(`Frost`)
		FROST_SKILL.Icon.set('Interface\\Icons\\spell_frost_frostblast.blp')

export const LIFE_SKILL = std.SkillLines.createClass(MODNAME,'life-skill',CASTER_CLASS.ID)
		LIFE_SKILL.Name.enGB.set(`Life`)
		LIFE_SKILL.Icon.set('Interface\\Icons\\spell_nature_healingtouch.blp')