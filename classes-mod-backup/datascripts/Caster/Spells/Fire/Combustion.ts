import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FIRE_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

//spark of imagination - causes the caster to gain 25% increased critical strike chance and 25% increased haste for # seconds

const COMBUSTION = std.Spells.create (MODNAME,'combustion').SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
    CASTER_SKILL_TRAINER.Trainer.addSpell(COMBUSTION.ID,10,69)//CHANGE LATER
COMBUSTION.Name.enGB.set('Combustion')
COMBUSTION.Subtext.enGB.set('')
COMBUSTION.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
COMBUSTION.AuraDescription.enGB.set('Increased Fire Critical Strike Chance by $s1% and Fire Spell cast time for $s2%')
COMBUSTION.Icon.set('Interface\\Icons\\spell_fire_sealoffire.blp')
COMBUSTION.Duration.set(15000,0,15000)
COMBUSTION.Range.set(0,0,0,0)
COMBUSTION.Power.setMana(20,5)
COMBUSTION.Cooldown.set(60000,0,0,0)
COMBUSTION.Cooldown.StartTime.set(0)
COMBUSTION.Effects.add()
    COMBUSTION.Effects.get(0).EffectType.setApplyAura()
    COMBUSTION.Effects.get(0).BasePoints.set(49)
    COMBUSTION.Effects.get(0).DieSides.set(1)
    COMBUSTION.Effects.get(0).ImplicitTargetA.setUnitCaster()
    COMBUSTION.Effects.get(0).AuraType.setAddFlatModifier()
    COMBUSTION.Effects.get(0).MiscValueA.set(7)
    COMBUSTION.Effects.get(0).ClassMask.A.set(12582935)
COMBUSTION.Effects.add()
    COMBUSTION.Effects.get(1).EffectType.setApplyAura()
    COMBUSTION.Effects.get(1).BasePoints.set(24)
    COMBUSTION.Effects.get(1).DieSides.set(1)
    COMBUSTION.Effects.get(1).ImplicitTargetA.setUnitCaster()
    COMBUSTION.Effects.get(1).AuraType.setModCastingSpeedNotStack()
    COMBUSTION.Effects.get(1).MiscValueA.set(10)
    COMBUSTION.Effects.get(1).ClassMask.A.set(12582935)