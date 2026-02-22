import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { KNIGHT_SKILL } from "../../Melee";

const KNIGHTSSHIELD = std.Spells.create (MODNAME,'knights-shield',48827).SkillLines.add(KNIGHT_SKILL.ID).setAutolearn().end;
KNIGHTSSHIELD.Name.enGB.set('Knight\'s Shield')
KNIGHTSSHIELD.Subtext.enGB.set('')
KNIGHTSSHIELD.Description.enGB.set('Hurls a holy shield at the enemy, dealing Holy damage, Dazing and silencing them and then jumping to additional nearby enemies.  Affects $x1 total targets.  Lasts $d.')
KNIGHTSSHIELD.Cooldown.set(12000,0,1500,0)
KNIGHTSSHIELD.Cooldown.StartTime.set(1500)
KNIGHTSSHIELD.Effects.add()
    KNIGHTSSHIELD.Effects.get(2).EffectType.setApplyAura()
    KNIGHTSSHIELD.Effects.get(2).BasePoints.set(0)
    KNIGHTSSHIELD.Effects.get(2).DieSides.set(0)
    KNIGHTSSHIELD.Effects.get(2).ImplicitTargetA.setUnitCaster()
    KNIGHTSSHIELD.Effects.get(2).AuraType.setProcTriggerSpell()
    KNIGHTSSHIELD.Effects.get(2).TriggerSpell.set(63529)
