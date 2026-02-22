import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const FROZENSKIN = std.Spells.create (MODNAME,'frozen-skin',12544).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Frozen skin deals aoe damage when attacked by an enemy. Lasts 60 minutes.
FROZENSKIN.Name.enGB.set('Frozen Skin')
FROZENSKIN.Subtext.enGB.set('Basic Spell')
FROZENSKIN.AuraDescription.enGB.set('Skin is frozen, causing shards of ice to break off as damage is caused.')
FROZENSKIN.Description.enGB.set('Covers the casters skin in a thick layer of permafrost reducing damage taken by 10%. Dealing damage to the shielded individual results in ice shattering, causing damage to attacking enemies.')
FROZENSKIN.Icon.set('Interface\\Icons\\spell_arcane_arcaneresilience.blp')

FROZENSKIN.Effects.clearAll()
FROZENSKIN.Duration.set(3600000,0,3600000)
FROZENSKIN.Effects.add()
    FROZENSKIN.Effects.get(0).EffectType.setApplyAura()
    FROZENSKIN.Effects.get(0).BasePoints.set(25)
    FROZENSKIN.Effects.get(0).DieSides.set(5)
    FROZENSKIN.Effects.get(0).AuraType.setDamageShield()
    FROZENSKIN.Effects.get(0).ImplicitTargetA.setUnitCaster()
FROZENSKIN.Effects.add()
    FROZENSKIN.Effects.get(1).EffectType.setApplyAura()
    FROZENSKIN.Effects.get(1).AuraType.setModDamagePercentTaken()
    FROZENSKIN.Effects.get(1).BasePoints.set(-11)
    FROZENSKIN.Effects.get(1).DieSides.set(1)
    FROZENSKIN.Effects.get(1).ImplicitTargetA.setUnitCaster()