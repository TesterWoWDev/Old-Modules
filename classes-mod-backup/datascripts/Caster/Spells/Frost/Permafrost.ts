import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const PERMAFROST = std.Spells.create (MODNAME,'permafrost',139).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Permafrost shoots icicles out of the caster to all nearby enemies.
PERMAFROST.Name.enGB.set('Permafrost')
PERMAFROST.Subtext.enGB.set('Basic Spell')
PERMAFROST.AuraDescription.enGB.set('Being pelted with Permafrost by a nearby conduit.')
PERMAFROST.Description.enGB.set('The caster incases themselves in permafrost, causing shards of ice to shoot out in all directions periodically dealing damage to all nearby enemies.')
PERMAFROST.Icon.set('Interface\\Icons\\spell_frost_frozencore.blp')

const FROSTORB = std.Spells.create (MODNAME,'frostorb', 68002).SkillLines.add(FROST_SKILL.ID).end; //The Icicle.
FROSTORB.Name.enGB.set('Frostorb')
FROSTORB.Subtext.enGB.set('Basic Spell')
FROSTORB.AuraDescription.enGB.set('Ice Shards Pelt you.')
FROSTORB.Description.enGB.set('Pelts the target with ice shards.')
FROSTORB.Icon.set('Interface\\Icons\\spell_fire_blueflamebreath.blp')

PERMAFROST.Duration.set(10000,0,10000)
// PERMAFROST.Visual.cloneFrom(72094,true)
    PERMAFROST.Effects.get(0).EffectType.setApplyAura()
    PERMAFROST.Effects.get(0).BasePoints.set(-1)
    PERMAFROST.Effects.get(0).DieSides.set(1)
    PERMAFROST.Effects.get(0).AuraType.setPeriodicTriggerSpell()
    PERMAFROST.Effects.get(0).AuraPeriod.set(1000)
    PERMAFROST.Effects.get(0).TriggerSpell.set(FROSTORB.ID)

FROSTORB.Range.set(0,25,0,25)
    //FROSTORB.Visual.cloneFrom(72082,true)
    FROSTORB.Effects.get(0).BasePoints.set(100)
    FROSTORB.Effects.get(0).DieSides.set(35)

    