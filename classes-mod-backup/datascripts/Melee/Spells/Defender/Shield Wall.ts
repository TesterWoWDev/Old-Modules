import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { DEFENDER_SKILL } from "../../Melee";
import { MELEE_SKILL_TRAINER } from "../MeleeTrainer";

const SHIELDWALL = std.Spells.create(MODNAME, 'shield-wall', 871).SkillLines.add(DEFENDER_SKILL.ID).AcquireMethod.set(0).end;
    MELEE_SKILL_TRAINER.Trainer.addSpell(SHIELDWALL.ID,10,21)//CHANGE LATER
SHIELDWALL.Name.enGB.set('Shield Wall')
SHIELDWALL.Subtext.enGB.set("")
SHIELDWALL.Description.enGB.set('Reduces all damage taken by $s1% for $d.')
SHIELDWALL.AuraDescription.enGB.set('All damage reduced by $s1% for $d.')
SHIELDWALL.Icon.set('Interface\\Icons\\ability_warrior_shieldwall.blp')
SHIELDWALL.Duration.set(12000,0,12000)
SHIELDWALL.Levels.set(0,0,0)
SHIELDWALL.Range.set(0,0,0,0)
SHIELDWALL.Cooldown.set(180000,0,0,0)
SHIELDWALL.ShapeshiftMask.Include.clearAll() // figure out how to remove stance requirement -- potentially remove the copy spell
SHIELDWALL.Effects.add()
    SHIELDWALL.Effects.get(0).EffectType.setApplyAura()
    SHIELDWALL.Effects.get(0).BasePoints.set(29)
    SHIELDWALL.Effects.get(0).DieSides.set(1)
    SHIELDWALL.Effects.get(0).PointsPerLevel.set(.3125)// adjust this?
    SHIELDWALL.Effects.get(0).ImplicitTargetA.setUnitCaster()
    SHIELDWALL.Effects.get(0).AuraType.setModDamagePercentTaken
    SHIELDWALL.Effects.get(0).MiscValueA.set(1)