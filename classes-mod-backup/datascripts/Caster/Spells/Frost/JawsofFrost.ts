import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const JAWSFROST = std.Spells.create (MODNAME,'jaws-of-frost',11).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Jaws of Frost is a targeted freezing attack, aimed to freeze the enemy and deal minor damage.
JAWSFROST.Name.enGB.set('Jaws of Frost')
JAWSFROST.Subtext.enGB.set('Basic Spell')
JAWSFROST.AuraDescription.enGB.set('Frozen in place by jaws of Frost.')
JAWSFROST.Description.enGB.set('Freeze the ground beneath your enemy, causing jaws of frost to rip out of the ground and root the target in place for 5 seconds.')
JAWSFROST.Icon.set('Interface\\Icons\\spell_fire_blueimmolation.blp')

JAWSFROST.Effects.clearAll()
JAWSFROST.Effects.add()
JAWSFROST.Visual.cloneFromSpell(49333)
//JAWSFROST.Visual.cloneFrom(6131,true)
JAWSFROST.CastTime.set(2000,0,2000)
JAWSFROST.Range.set(0,40,0,40)
    JAWSFROST.Duration.set(5000,0,5000)
    JAWSFROST.Effects.get(0).EffectType.setSchoolDamage()
    JAWSFROST.Effects.get(0).BasePoints.set(150)
    JAWSFROST.Effects.get(0).DieSides.set(5)
    JAWSFROST.Effects.get(0).PointsPerLevel.set(1)
    JAWSFROST.Effects.get(0).ImplicitTargetA.setDestTargetEnemy()
    JAWSFROST.Effects.get(0).BonusMultiplier.set(1)
    JAWSFROST.Effects.get(0).BonusMultiplier.set(1)

JAWSFROST.Effects.add()
    JAWSFROST.Effects.get(1).EffectType.setApplyAura()
    JAWSFROST.Effects.get(1).AuraType.setModRoot()

    JAWSFROST.InterruptFlags.OnMovement
    JAWSFROST.InterruptFlags.OnInterruptCast
    JAWSFROST.InterruptFlags.OnPushback