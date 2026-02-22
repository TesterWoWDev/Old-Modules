import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const FRACTURE = std.Spells.create (MODNAME,'fracture',50597).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Frostbolt casts will add stacks of frostbite.
FRACTURE.Name.enGB.set('Fracture')
FRACTURE.Subtext.enGB.set('Crowd Control')
FRACTURE.AuraDescription.enGB.set('Suffering from the effects of Fracture, slowly freezing solid.')
FRACTURE.Description.enGB.set('Summon a massive spike from the ground, dealing $s1 damage, and $s2 damage per second.')
FRACTURE.Icon.set('Interface\\Icons\\spell_fire_bluehellfire.blp')

FRACTURE.Effects.clearAll()
FRACTURE.CastTime.set(1500,0,1500)
//FRACTURE.Range.set(0,35,0,35)
FRACTURE.row.RangeIndex.set(4)
FRACTURE.Effects.add()
    FRACTURE.Effects.get(0).EffectType.setSchoolDamage()
    FRACTURE.Effects.get(0).BasePoints.set(80)
    FRACTURE.Effects.get(0).DieSides.set(15)
    FRACTURE.Effects.get(0).PointsPerLevel.set(1)
    FRACTURE.Effects.get(0).ImplicitTargetA.setDestTargetEnemy()
    FRACTURE.Effects.get(0).BonusMultiplier.set(1)

FRACTURE.Effects.add()
    FRACTURE.Effects.get(1).EffectType.setApplyAura()
    FRACTURE.Effects.get(1).BasePoints.set(150)
    FRACTURE.Effects.get(1).DieSides.set(10)
    FRACTURE.Effects.get(1).AuraType.setPeriodicDamage()
    FRACTURE.Effects.get(1).ImplicitTargetA.setDestTargetEnemy()
    FRACTURE.Effects.get(1).BonusMultiplier.set(1)
    FRACTURE.Effects.get(1).AuraPeriod.set(1000)
    FRACTURE.InterruptFlags.OnMovement
    FRACTURE.InterruptFlags.OnInterruptCast
    FRACTURE.InterruptFlags.OnPushback