import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const HOARFROST = std.Spells.create (MODNAME,'hoarfrost',11).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Frostbolt casts will add stacks of frostbite.
HOARFROST.Name.enGB.set('Hoarfrost')
HOARFROST.Subtext.enGB.set('Ultimate Ability')
HOARFROST.AuraDescription.enGB.set('Suffering from the effects of Hoarfrost, slowly freezing solid.')
HOARFROST.Description.enGB.set('Hurls a massive bolt of frost at your enemy causing $s1 damage and leaving a lingering layer of frost, dealing $s2 damage per second.')
HOARFROST.Icon.set('Interface\\Icons\\spell_fire_bluepyroblast.blp')

HOARFROST.Effects.clearAll()
HOARFROST.CastTime.set(3500,0,3500)
HOARFROST.Range.set(0,50,0,50)
HOARFROST.Effects.add()
    HOARFROST.Visual.cloneFromSpell(41579)
    HOARFROST.Effects.get(0).EffectType.setSchoolDamage()
    HOARFROST.Effects.get(0).BasePoints.set(800)
    HOARFROST.Effects.get(0).DieSides.set(125)
    HOARFROST.Effects.get(0).PointsPerLevel.set(1)
    HOARFROST.Effects.get(0).ImplicitTargetA.setDestTargetEnemy()
    HOARFROST.Effects.get(0).BonusMultiplier.set(1)

HOARFROST.Effects.add()
    HOARFROST.Effects.get(1).EffectType.setApplyAura()
    HOARFROST.Effects.get(1).BasePoints.set(105)
    HOARFROST.Effects.get(1).DieSides.set(10)
    HOARFROST.Effects.get(1).AuraType.setPeriodicDamage()
    HOARFROST.Effects.get(1).ImplicitTargetA.setDestTargetEnemy()
    HOARFROST.Effects.get(1).BonusMultiplier.set(1)
    HOARFROST.Effects.get(1).AuraPeriod.set(1000)
    HOARFROST.InterruptFlags.OnMovement
    HOARFROST.InterruptFlags.OnInterruptCast
    HOARFROST.InterruptFlags.OnPushback