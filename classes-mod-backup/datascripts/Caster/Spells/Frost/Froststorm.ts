import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const FROSTSTORM = std.Spells.create (MODNAME,'froststorm',205).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Froststorm summons periodic frostbolt volleys to pelt enemies, dealing massive damage.
FROSTSTORM.Name.enGB.set('Froststorm')
FROSTSTORM.Subtext.enGB.set('Basic Spell')
FROSTSTORM.AuraDescription.enGB.set('Freezing to death.')
FROSTSTORM.Description.enGB.set('Summons a massive frost storm to surround the caster, dealing substantial area damage and slowing enemies movement speed by 15%.')
FROSTSTORM.Icon.set('Interface\\Icons\\inv_datacrystal09.blp')

FROSTSTORM.Effects.clearAll()
FROSTSTORM.Effects.add()
FROSTSTORM.Range.set(0,25,0,25) //this literally does nothing, it's still melee range.
FROSTSTORM.Duration.set(10000,0,10000)
FROSTSTORM.Visual.cloneFromSpell(73061)
    FROSTSTORM.Effects.get(0).EffectType.setSchoolDamage()
    FROSTSTORM.Effects.get(0).BasePoints.set(75)
    FROSTSTORM.Effects.get(0).DieSides.set(35)
    FROSTSTORM.Effects.get(0).PointsPerLevel.set(1)
    FROSTSTORM.Effects.get(0).ImplicitTargetA.setUnitDestAreaEnemy()
    FROSTSTORM.Effects.get(0).BonusMultiplier.set(1)
    FROSTSTORM.Effects.get(0).Radius.set(10,0,10)

FROSTSTORM.Effects.add()
    FROSTSTORM.Effects.get(1).EffectType.setApplyAura()
    FROSTSTORM.Effects.get(1).AuraType.setModDecreaseSpeed()
    FROSTSTORM.Effects.get(1).BasePoints.set(-16)
    FROSTSTORM.Effects.get(1).DieSides.set(1)

FROSTSTORM.Effects.add()
    FROSTSTORM.Effects.get(2).EffectType.setApplyAura()
    FROSTSTORM.Effects.get(2).BasePoints.set(35)
    FROSTSTORM.Effects.get(2).DieSides.set(10)
    FROSTSTORM.Effects.get(2).AuraType.setPeriodicDamage()
    FROSTSTORM.Effects.get(2).ImplicitTargetA.setUnitDestAreaEnemy()
    FROSTSTORM.Effects.get(2).BonusMultiplier.set(1)
    FROSTSTORM.Effects.get(2).AuraPeriod.set(1000)
