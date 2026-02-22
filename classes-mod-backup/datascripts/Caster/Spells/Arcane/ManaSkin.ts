import { std } from "tswow-stdlib"
import { MODNAME } from "../../../moduleName";
import { ARCANE_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const MANASKIN = std.Spells.create(MODNAME,'manaskin',69910)
	MANASKIN.Name.enGB.set('Mana Skin')
	MANASKIN.SkillLines.add(ARCANE_SKILL.ID).setAutolearn()
	MANASKIN.Description.enGB.set('Envelops the caster in their own mana, reducing damage taken by $s1% and causing them to lose $s2% less casting or channeling time when damaged for 30 min.')
	MANASKIN.AuraDescription.enGB.set('Shrouded in mana, reducing damage taken by $s1% and cast or channel time lost when damaged by $s2%.')
	MANASKIN.Attributes.singleTargetSpell
	MANASKIN.Attributes.onlyTargetPlayers
	MANASKIN.Attributes.notStealable
	MANASKIN.Attributes.noPushbackOnDamage
	MANASKIN.Visual.cloneFromVisual(1463)
	MANASKIN.TargetType.set(0)
	MANASKIN.Cooldown.set(15000,0,0,0)
	MANASKIN.Power.setMana(75,50,0,0,0)
	MANASKIN.PowerDisplay.set(75)
	MANASKIN.CastTime.set(0,0,0)
	MANASKIN.Duration.set(1800000,0,1800000)
	MANASKIN.Effects.get(71)
	MANASKIN.Effects.add()
	MANASKIN.Levels.set(200000,1,8)
	MANASKIN.Attributes.unk43.mark()
	MANASKIN.Proc.Chance.set(101)
	MANASKIN.Icon.set('Interface\\Icons\\Spell_arcane_prismaticcloak')
	MANASKIN.Effects.get(0).BasePoints.set(-6)
	MANASKIN.Effects.add().AuraType.setReducePushback().BasePoints.set(19)






