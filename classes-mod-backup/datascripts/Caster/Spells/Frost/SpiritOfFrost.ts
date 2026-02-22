import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const SPIRITFROST = std.Spells.create (MODNAME,'spirit-frost',12544).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Frozen skin deals aoe damage when attacked by an enemy. Lasts 60 minutes.
SPIRITFROST.Name.enGB.set('Spirit of Frost')
SPIRITFROST.Subtext.enGB.set('Defensive Ultimate Ability')
SPIRITFROST.AuraDescription.enGB.set('Channeling the full power of the Spirit of Frost. This target is godly.')
SPIRITFROST.Description.enGB.set('Allow the power of the Spirit of Frost to flow through you, reducing damage taken by 50%, increasing movement speed by 25%, and increasing damage dealt by 45%.')
SPIRITFROST.Icon.set('Interface\\Icons\\ability_mage_coldasice.blp')

SPIRITFROST.Effects.clearAll()
SPIRITFROST.Duration.set(10000,0,10000)
SPIRITFROST.Effects.add()
SPIRITFROST.Visual.cloneFromSpell(69090)
    SPIRITFROST.Effects.get(0).EffectType.setApplyAura()
    SPIRITFROST.Effects.get(0).AuraType.setModDamagePercentTaken()
    SPIRITFROST.Effects.get(0).BasePoints.set(-51)
    SPIRITFROST.Effects.get(0).DieSides.set(1)
    SPIRITFROST.Effects.get(0).ImplicitTargetA.setUnitCaster()
SPIRITFROST.Effects.add()
    SPIRITFROST.Effects.get(1).EffectType.setApplyAura()
    SPIRITFROST.Effects.get(1).AuraType.setModIncreaseSpeed()
    SPIRITFROST.Effects.get(1).BasePoints.set(24)
    SPIRITFROST.Effects.get(1).DieSides.set(1)
    SPIRITFROST.Effects.get(1).ImplicitTargetA.setUnitCaster()
SPIRITFROST.Effects.add()
    SPIRITFROST.Effects.get(2).EffectType.setApplyAura()
    SPIRITFROST.Effects.get(2).AuraType.setModDamagePercentDone()
    SPIRITFROST.Effects.get(2).BasePoints.set(44)
    SPIRITFROST.Effects.get(2).DieSides.set(1)
    SPIRITFROST.Effects.get(2).ImplicitTargetA.setUnitCaster()
SPIRITFROST.InterruptFlags.OnMovement
SPIRITFROST.InterruptFlags.OnInterruptCast
SPIRITFROST.InterruptFlags.OnPushback