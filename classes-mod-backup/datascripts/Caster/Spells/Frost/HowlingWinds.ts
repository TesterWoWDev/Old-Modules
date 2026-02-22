import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const HOWLINGWINDS = std.Spells.create (MODNAME,'howling-winds',205).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Frostbolt casts will add stacks of frostbite.
HOWLINGWINDS.Name.enGB.set('Howling Winds')
HOWLINGWINDS.Subtext.enGB.set('Special Ability')
HOWLINGWINDS.AuraDescription.enGB.set('Confused...')
HOWLINGWINDS.Description.enGB.set('Swirl the winds around you with frost, causing a raging frozen tornado to assault your enemy dealing massive damage, applying a damage over time effect, and slowing the enemies movement speed.')
HOWLINGWINDS.Icon.set('Interface\\Icons\\spell_frost_glacier.blp')

HOWLINGWINDS.Effects.clearAll()
HOWLINGWINDS.CastTime.set(0,0,0)
HOWLINGWINDS.Duration.set(8000,0,8000)
HOWLINGWINDS.Range.set(0,50,0,50)
HOWLINGWINDS.Effects.add()
    HOWLINGWINDS.Visual.cloneFromSpell(61211)
    HOWLINGWINDS.Effects.get(0).EffectType.setSchoolDamage()
    HOWLINGWINDS.Effects.get(0).BasePoints.set(800)
    HOWLINGWINDS.Effects.get(0).DieSides.set(125)
    HOWLINGWINDS.Effects.get(0).PointsPerLevel.set(1)
    HOWLINGWINDS.Effects.get(0).ImplicitTargetA.setDestTargetEnemy()
    HOWLINGWINDS.Effects.get(0).BonusMultiplier.set(1)

HOWLINGWINDS.Effects.add()
    HOWLINGWINDS.Effects.get(1).EffectType.setApplyAura()
    HOWLINGWINDS.Effects.get(1).BasePoints.set(105)
    HOWLINGWINDS.Effects.get(1).DieSides.set(10)
    HOWLINGWINDS.Effects.get(1).AuraType.setPeriodicDamage()
    HOWLINGWINDS.Effects.get(1).ImplicitTargetA.setDestTargetEnemy()
    HOWLINGWINDS.Effects.get(1).BonusMultiplier.set(1)
    HOWLINGWINDS.Effects.get(1).AuraPeriod.set(1000)
    HOWLINGWINDS.InterruptFlags.OnMovement
    HOWLINGWINDS.InterruptFlags.OnInterruptCast
    HOWLINGWINDS.InterruptFlags.OnPushback

HOWLINGWINDS.Effects.add()
    HOWLINGWINDS.Effects.get(0).EffectType.setApplyAura()
    HOWLINGWINDS.Effects.get(0).AuraType.setModDecreaseSpeed()
    HOWLINGWINDS.Effects.get(0).BasePoints.set(-16)
    HOWLINGWINDS.Effects.get(0).DieSides.set(1)