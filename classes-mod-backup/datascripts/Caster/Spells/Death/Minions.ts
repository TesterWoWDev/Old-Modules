import { std } from "tswow-stdlib";
import { TotemType } from "tswow-stdlib/Totem/TotemType";
import { MODNAME } from "../../../moduleName";
import { DEATH_SKILL } from "../../Caster";

const totems : TotemType[] = ['EARTH','AIR','WATER','FIRE']

function makeSummon(index: number, name: string, displayName: string, modelId: number, icon: string, scale = 1) {
    const entity = std.CreatureTemplates.create(MODNAME,`${name}-${index}`,416);

	const summon_spell = std.Spells.TotemCreatures.createSummon(MODNAME,`summon-${name}-${index}`, totems[index], entity.ID);
        summon_spell.Power.setMana(40,5)
        summon_spell.CastTime.Base.set(500)
        summon_spell.Duration.Duration.set(45000)
        summon_spell.SkillLines.add(DEATH_SKILL.ID).setAutolearn();
        summon_spell.Name.enGB.set(`Summon ${displayName}`)
        summon_spell.Icon.set(icon);
        summon_spell.Cooldown.Time.set(5000)
        summon_spell.Description.enGB.set(`Summon and control a ${displayName} for ${summon_spell.Duration.Duration.get()/1000} seconds.`)
    entity.Models.addIds(modelId)
	entity.Name.enGB.set(`${displayName}`);
	entity.Scale.set(scale);
	switch(name) { 
		case 'warrior': {
			entity.UnitClass.setWarrior();
			entity.Stats.HealthMod.set(1)
			entity.Stats.DamageMod.set(2.5)

			//on combat start
			entity.Scripts.onRange(0,20,1,1).Target.setSelf().Action.setCast(3385,0,0)
			//timed calls
			//(Timed create event)ID,initial min timer, initial max timer, repeated min timer, repeated max timer, chance
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(0,0,0,11000,15000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(0).row.event_flags.set(1)
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(1,0,0,3000,7000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(1).row.event_flags.set(1)
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(2,0,0,5000,7000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(2).row.event_flags.set(1)
			//combat loop
			entity.Scripts.onTimedEventTriggered(0).Target.setClosestEnemy(10,0).Action.setCast(45462,2,7)
			entity.Scripts.onTimedEventTriggered(1).Target.setClosestEnemy(10,0).Action.setCast(45902,2,7)
			entity.Scripts.onTimedEventTriggered(2).Target.setClosestEnemy(10,0).Action.setCast(67037,2,7)
			break; 
		 } 
		case 'tank': {
			 entity.UnitClass.setPaladin();
			 entity.Stats.HealthMod.set(3)
			 entity.Stats.DamageMod.set(0.75)
			 entity.Stats.ArmorMod.set(2)
			//fix mana
			entity.Scripts.onJustSummoned().Target.setSelf().Action.setCast(29166,0,0)
			entity.Scripts.onUpdateOoc(0,0,0,0).Target.setSelf().Action.setCast(29166,0,0).row.event_flags.set(1)
			//on combat start
			entity.Scripts.onRange(0,20,0,0).Target.setClosestEnemy(10,0).Action.setCast(1161,2,7).row.event_flags.set(1)
			//timed calls
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(0,0,0,7000,11000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(0).row.event_flags.set(1)
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(1,0,0,4000,7000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(1).row.event_flags.set(1)
			//combat loop
			entity.Scripts.onTimedEventTriggered(0).Target.setClosestEnemy(10,0).Action.setCast(70428,2,7)
			entity.Scripts.onTimedEventTriggered(1).Target.setClosestEnemy(10,0).Action.setCast(1161,2,7)		
			 break; 
		} 
		 case 'caster': {
			entity.UnitClass.setMage()
			entity.Stats.ManaMod.set(10)
			entity.Stats.DamageMod.set(3)
			
			//fix mana
			entity.Scripts.onJustSummoned().Target.setSelf().Action.setCast(29166,0,0)
			entity.Scripts.onUpdateOoc(0,0,0,0).Target.setSelf().Action.setCast(29166,0,0).row.event_flags.set(1)
			//timed calls
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(0,0,0,12000,16000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(0).row.event_flags.set(1)
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(1,0,0,5000,5000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(1).row.event_flags.set(1)
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(2,0,0,30000,45000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(2).row.event_flags.set(1)
			//combat loop
			entity.Scripts.onTimedEventTriggered(0).Target.setClosestEnemy(40,0).Action.setCast(47813,0,0)
			entity.Scripts.onTimedEventTriggered(1).Target.setClosestEnemy(40,0).Action.setCast(25307,0,0)
			entity.Scripts.onTimedEventTriggered(2).Target.setSelf().Action.setCast(29166,2,7)//mana
			break; 
		 }
		 case 'healer': {
			entity.UnitClass.setMage()
			entity.Stats.ManaMod.set(10)
			entity.Stats.DamageMod.set(1)
			
			//fix mana
			entity.Scripts.onJustSummoned().Target.setSelf().Action.setCast(29166,0,0)
			entity.Scripts.onUpdateOoc(0,0,0,0).Target.setSelf().Action.setCast(29166,0,0).row.event_flags.set(1)
			//timed calls
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(0,0,0,8000,13000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(0).row.event_flags.set(1)
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(1,0,0,13000,15000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(1).row.event_flags.set(1)
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(2,0,0,3000,3000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(2).row.event_flags.set(1)
			entity.Scripts.onUpdateIc(0,0,0,0).Action.setCreateTimedEvent(3,0,0,20000,35000,100).row.event_flags.set(1)
			entity.Scripts.onUpdateOoc(0,0,0,0).Action.setRemoveTimedEvent(3).row.event_flags.set(1)
			//combat loop
			entity.Scripts.onTimedEventTriggered(0).Target.setCreatureRange(0,0,40,1).Action.setCast(34861,2,7)//AoE heal
			entity.Scripts.onTimedEventTriggered(1).Target.setCreatureRange(0,0,40,1).Action.setCast(48068,2,7)//renew
			entity.Scripts.onTimedEventTriggered(2).Target.setCreatureRange(0,0,40,1).Action.setCast(6064,0,0)//single heal
			entity.Scripts.onTimedEventTriggered(3).Target.setSelf().Action.setCast(29166,2,7)//mana
			break; 
		 }
		default: { 
			 console.log("Issue, pet summoned not in assumed expected minion types. Investigate")
			 break; 
		}
	 } 
}

for(let i=0;i<totems.length;++i){//HAS A LINKED LIVE SCRIPT
	const controllers = std.Spells.TotemCreatures.createControllers(MODNAME,`control-${i}`,[i],['Attack'])
	if( i == 0)
	controllers.Attack?.SkillLines.add(DEATH_SKILL.ID).setAutolearn();
	controllers.Attack?.Name.enGB.set(`Minion Attack`);
	controllers.Attack?.Description.enGB.set(`Command your minions to attack your target`)
	controllers.Attack?.Subtext.enGB.set("")
	makeSummon(i, 'warrior', 'Skeleton Warrior',9790,'Interface\\Icons\\Spell_Shadow_RaiseDead.blp');
	makeSummon(i, 'tank', 'Tanky Scarab', 10031,'Interface\\Icons\\Ability_Creature_Disease_02.blp',1.5);
	makeSummon(i, 'caster', 'Crypt Caster', 14698,'Interface\\Icons\\Achievement_Dungeon_AzjolLowercity.blp',0.4)
	makeSummon(i, 'healer', 'Skeleton Healer', 9790,'Interface\\Icons\\Achievement_Dungeon_AzjolLowercity.blp')
}