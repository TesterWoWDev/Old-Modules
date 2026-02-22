import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FIRE_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";


const entity = std.CreatureTemplates.create(MODNAME,'fire-elemental',30416)
entity.UnitClass.setMage();
//fix mana
entity.Scripts.onJustSummoned().Target.setSelf().Action.setCast(29166,0,0)
//entity.Scripts.onJustSummoned().Target.setSelf().Action.setCast(688,0,0)
entity.Scripts.onUpdateOoc(1,1,1,1).Target.setSelf().Action.setCast(29166,0,0)

//(Timed create event)ID,initial min timer, initial max timer, repeated min timer, repeated max timer, chance
entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(0,0,0,2000,6000,100).row.event_flags.set(1)
entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(0).row.event_flags.set(1)
entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(1,0,0,5000,5000,100).row.event_flags.set(1)
entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(1).row.event_flags.set(1)
entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(2,0,0,30000,45000,100).row.event_flags.set(1)
entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(2).row.event_flags.set(1)

//combat loop
entity.Scripts.onTimedEventTriggered(0).Target.setClosestEnemy(40,0).Action.setCast(17195,0,0)
entity.Scripts.onTimedEventTriggered(1).Target.setClosestEnemy(40,0).Action.setCast(55362,2,7)
entity.Scripts.onTimedEventTriggered(2).Target.setClosestEnemy(40,0).Action.setCast(6725,2,7)

const FIREELEMENTALSPELL = std.Spells.create(MODNAME,'fire-elemental-spell',688).SkillLines.add(FIRE_SKILL.ID).setAutolearn().end;
CASTER_SKILL_TRAINER.Trainer.addSpell(FIREELEMENTALSPELL.ID,10,69)//CHANGE LATER
FIREELEMENTALSPELL.Name.enGB.set('Summon Fire Elemental')
FIREELEMENTALSPELL.Description.enGB.set('Summons a Fire Elemental to fight for the caster for $d seconds.')
FIREELEMENTALSPELL.Icon.set('Interface\\Icons\\spell_fire_elemental_totem.blp')
FIREELEMENTALSPELL.Duration.set(20000,0,45000)
FIREELEMENTALSPELL.Power.setMana(0,16)
FIREELEMENTALSPELL.Cooldown.set(180000,0,0,0)
FIREELEMENTALSPELL.CastTime.set(0,0,0)
FIREELEMENTALSPELL.Effects.get(0).EffectType.set(28)
FIREELEMENTALSPELL.Effects.get(0).MiscValueA.set(entity.ID)
FIREELEMENTALSPELL.Effects.get(0).MiscValueB.set(61)
FIREELEMENTALSPELL.Effects.get(0).Radius.set(5,0,5)
FIREELEMENTALSPELL.Effects.get(0).ImplicitTargetA.setDestCasterSummon
