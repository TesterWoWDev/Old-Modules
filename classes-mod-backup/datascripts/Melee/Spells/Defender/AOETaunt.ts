import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { DEFENDER_SKILL } from "../../Melee";
import { MELEE_SKILL_TRAINER } from "../MeleeTrainer";

const AOETAUNT = std.Spells.create(MODNAME, 'defenders-shout', 1161).SkillLines.add(DEFENDER_SKILL.ID).AcquireMethod.set(0).end;
    MELEE_SKILL_TRAINER.Trainer.addSpell(AOETAUNT.ID,10,19)//CHANGE LATER
AOETAUNT.Name.enGB.set('Defender\'s Shout')
AOETAUNT.Subtext.enGB.set("")
AOETAUNT.Description.enGB.set('Shout to defend your allies, forcing all enemies within $a1 yards to attack you for $d.')
AOETAUNT.AuraDescription.enGB.set('Taunted by the Defender.')
AOETAUNT.Icon.set('Interface\\Icons\\ability_bullrush.blp')
AOETAUNT.Duration.set(6000,0,6000)

