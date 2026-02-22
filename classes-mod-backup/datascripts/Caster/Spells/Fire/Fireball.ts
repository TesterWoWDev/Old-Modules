import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FIRE_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

export const fireball1 = std.Spells.create(MODNAME,'fireball-rank1',133).SkillLines.add(FIRE_SKILL.ID).setAutolearn().end;

const fireball2 = std.Spells.create(MODNAME,'fireball-rank2',143).SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
	CASTER_SKILL_TRAINER.Trainer.addSpell(fireball2.ID,10,6)//Spellid, cost in copper, level to learn

const fireball3 = std.Spells.create(MODNAME,'fireball-rank3',145).SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
	CASTER_SKILL_TRAINER.Trainer.addSpell(fireball3.ID,10,12)//Spellid, cost in copper, level to learn

const fireball4 = std.Spells.create(MODNAME,'fireball-rank4',3140).SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
	CASTER_SKILL_TRAINER.Trainer.addSpell(fireball4.ID,10,18)
	fireball4.Duration.set(8000,0,8000)
const fireball5 = std.Spells.create(MODNAME,'fireball-rank5',8400).SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
	CASTER_SKILL_TRAINER.Trainer.addSpell(fireball5.ID,10,24)
	fireball5.Duration.set(8000,0,8000)
const fireball6 = std.Spells.create(MODNAME,'fireball-rank6',8401).SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
	CASTER_SKILL_TRAINER.Trainer.addSpell(fireball6.ID,10,30)
	fireball6.Duration.set(8000,0,8000)
const fireball7 = std.Spells.create(MODNAME,'fireball-rank7',8402).SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
	CASTER_SKILL_TRAINER.Trainer.addSpell(fireball7.ID,10,36)
	fireball7.Duration.set(8000,0,8000)