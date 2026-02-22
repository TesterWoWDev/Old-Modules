import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const ICEBOMB = std.Spells.create (MODNAME,'ice-bomb',11).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Frostbolt casts will add stacks of frostbite.
ICEBOMB.Name.enGB.set('Ice Bomb')
ICEBOMB.Subtext.enGB.set('Offensive Ultimate Ability')
ICEBOMB.AuraDescription.enGB.set('Victim of Ice Bomb.')
ICEBOMB.Description.enGB.set('Launch a massive storm of frost into the sky, the orb will pursue your target and crash down with a titanic force dealing $s1 damage plus an additional $s2 damage per second.')
ICEBOMB.Icon.set('Interface\\Icons\\spell_fire_blueflamering.blp')

ICEBOMB.Effects.clearAll()
ICEBOMB.CastTime.set(4000,0,4000)
ICEBOMB.Range.set(0,50,0,50)
ICEBOMB.Effects.add()
    ICEBOMB.Visual.cloneFromSpell(69675)
    ICEBOMB.Effects.get(0).EffectType.setSchoolDamage()
    ICEBOMB.Effects.get(0).BasePoints.set(1500)
    ICEBOMB.Effects.get(0).DieSides.set(125)
    ICEBOMB.Effects.get(0).PointsPerLevel.set(1)
    ICEBOMB.Effects.get(0).ImplicitTargetA.setDestTargetEnemy()
    ICEBOMB.Effects.get(0).BonusMultiplier.set(1)
ICEBOMB.Effects.add()
    ICEBOMB.Effects.get(1).EffectType.setApplyAura()
    ICEBOMB.Effects.get(1).BasePoints.set(200)
    ICEBOMB.Effects.get(1).DieSides.set(10)
    ICEBOMB.Effects.get(1).AuraType.setPeriodicDamage()
    ICEBOMB.Effects.get(1).ImplicitTargetA.setDestTargetEnemy()
    ICEBOMB.Effects.get(1).BonusMultiplier.set(1)
    ICEBOMB.Effects.get(1).AuraPeriod.set(1000)
    ICEBOMB.InterruptFlags.OnMovement
    ICEBOMB.InterruptFlags.OnInterruptCast
    ICEBOMB.InterruptFlags.OnPushback