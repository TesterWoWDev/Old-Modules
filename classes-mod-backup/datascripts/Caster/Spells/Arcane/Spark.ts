import { std } from "tswow-stdlib"
import { MODNAME } from "../../../moduleName";
import { ARCANE_SKILL } from "../../Caster";
import { createAllSpellRank, createSingleSpellRank } from "../../../SpellRank";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const SPARK = std.Spells.create(MODNAME,'arcane-spark',133).SkillLines.add(ARCANE_SKILL.ID).setAutolearn().end
SPARK.Name.enGB.set('Spark')
SPARK.Icon.set('Interface\\Icons\\spell_arcane_arcane04')
SPARK.Description.enGB.set('Throws pure arcane magic that causes $s1 Arcane damage and an additional $s2 over 4 sec.')
SPARK.SchoolMask.set(64)
SPARK.Visual.cloneFromSpell(62250)
SPARK.Power.setMana(8,0,0,0,0)
SPARK.AuraDescription.enGB.set('$s2 Arcane damage every $t2 seconds.')

const SPARK2 = std.Spells.create(MODNAME,'arcane-spark-rank-2',SPARK.ID).SkillLines.add(ARCANE_SKILL.ID).setAutolearn().end
SPARK2.Power.setMana(15,0,0,0,0)
SPARK2.CastTime.set(2000,0,0)
SPARK2.Levels.Base.set(6)
SPARK2.Levels.Spell.set(6)
SPARK2.Subtext.enGB.set('Rank 2')
SPARK2.Effects.add().BasePoints.set(21.75)
CASTER_SKILL_TRAINER.Trainer.addSpell(SPARK2.ID,13,6)

const SPARK3 = std.Spells.create(MODNAME,'arcane-spark-rank-3',SPARK.ID).SkillLines.add(ARCANE_SKILL.ID).setAutolearn().end
SPARK3.Power.setMana(30.65,0,0,0,0)
SPARK3.CastTime.set(2000,0,0)
SPARK3.Levels.Base.set(14)
SPARK3.Levels.Spell.set(14)
SPARK3.Subtext.enGB.set('Rank 3')
SPARK3.Effects.add().BasePoints.set(38.062)
CASTER_SKILL_TRAINER.Trainer.addSpell(SPARK3.ID,34,14)

const SPARK4 = std.Spells.create(MODNAME,'arcane-spark-rank-4',SPARK.ID).SkillLines.add(ARCANE_SKILL.ID).setAutolearn().end
SPARK4.Power.setMana(42.9,0,0,0,0)
SPARK4.CastTime.set(2500,0,0)
SPARK4.Levels.Base.set(19)
SPARK4.Levels.Spell.set(19)
SPARK4.Subtext.enGB.set('Rank 4')
SPARK4.Effects.add().BasePoints.set(66.609)
CASTER_SKILL_TRAINER.Trainer.addSpell(SPARK4.ID,69,19)

const SPARK5 = std.Spells.create(MODNAME,'arcane-spark-rank-5',SPARK.ID).SkillLines.add(ARCANE_SKILL.ID).setAutolearn().end
SPARK5.Power.setMana(50,0,0,0,0)
SPARK5.CastTime.set(2500,0,0)
SPARK5.Levels.Base.set(22)
SPARK5.Levels.Spell.set(22)
SPARK5.Subtext.enGB.set('Rank 5')
SPARK5.Effects.add().BasePoints.set(116.566)
CASTER_SKILL_TRAINER.Trainer.addSpell(SPARK5.ID,142,22)

const SPARK6 = std.Spells.create(MODNAME,'arcane-spark-rank-6',SPARK.ID).SkillLines.add(ARCANE_SKILL.ID).setAutolearn().end
SPARK6.Power.setMana(90,0,0,0,0)
SPARK6.CastTime.set(3000,0,0)
SPARK6.Levels.Base.set(27)
SPARK6.Levels.Spell.set(27)
SPARK6.Subtext.enGB.set('Rank 6')
SPARK6.Effects.add().BasePoints.set(203.991)
CASTER_SKILL_TRAINER.Trainer.addSpell(SPARK6.ID,300,27)

const SPARK7 = std.Spells.create(MODNAME,'arcane-spark-rank-7',SPARK.ID).SkillLines.add(ARCANE_SKILL.ID).setAutolearn().end
SPARK7.Power.setMana(105.3,0,0,0,0)
SPARK7.CastTime.set(3000,0,0)
SPARK7.Levels.Base.set(31)
SPARK7.Levels.Spell.set(31)
SPARK7.Subtext.enGB.set('Rank 7')
SPARK7.Effects.add().BasePoints.set(356.984)
CASTER_SKILL_TRAINER.Trainer.addSpell(SPARK7.ID,645,31)

createAllSpellRank([SPARK.ID,SPARK2.ID,SPARK3.ID,SPARK4.ID,SPARK5.ID,SPARK6.ID,SPARK7.ID])
















