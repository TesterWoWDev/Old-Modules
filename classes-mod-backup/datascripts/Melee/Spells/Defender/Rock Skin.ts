import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { DEFENDER_SKILL } from "../../Melee";
import { MELEE_SKILL_TRAINER } from "../MeleeTrainer";

const ROCKSKIN = std.Spells.create(MODNAME, 'rock-skin', 3574).SkillLines.add(DEFENDER_SKILL.ID).AcquireMethod.set(0).end;
    MELEE_SKILL_TRAINER.Trainer.addSpell(ROCKSKIN.ID,10,19)//CHANGE LATER
ROCKSKIN.Name.enGB.set('Rock Skin')
ROCKSKIN.Subtext.enGB.set("")
ROCKSKIN.Description.enGB.set('Turn the Defender\'s skin to rock, increasing armor by $s1 and reducing movement speed by $s2%')
ROCKSKIN.AuraDescription.enGB.set('Armor increased by $s1. Movement speed reduced by $s2%.')
ROCKSKIN.Icon.set('Interface\\Icons\\ability_golemthunderclap.blp')
ROCKSKIN.Duration.set(8000,0,8000)
ROCKSKIN.Range.set(0,0,0,0)
ROCKSKIN.Power.setRage(20)
ROCKSKIN.Cooldown.set(60000,0,0,0)
ROCKSKIN.Cooldown.StartTime.set(0) // Controls spells GCD
ROCKSKIN.Effects.add()
    ROCKSKIN.Effects.get(0).EffectType.setApplyAura()
    ROCKSKIN.Effects.get(0).BasePoints.set(49)
    ROCKSKIN.Effects.get(0).DieSides.set(1)
    ROCKSKIN.Effects.get(0).PointsPerLevel.set(50)// adjust this?
    ROCKSKIN.Effects.get(0).ImplicitTargetA.setUnitCaster()
    ROCKSKIN.Effects.get(0).AuraType.setModResistance
    ROCKSKIN.Effects.get(0).MiscValueA.set(1)
ROCKSKIN.Effects.add()
    ROCKSKIN.Effects.get(1).EffectType.setApplyAura()
    ROCKSKIN.Effects.get(1).BasePoints.set(-51)
    ROCKSKIN.Effects.get(1).DieSides.set(1)
    ROCKSKIN.Effects.get(1).ImplicitTargetA.setUnitCaster()
    ROCKSKIN.Effects.get(1).AuraType.setModDecreaseSpeed()
