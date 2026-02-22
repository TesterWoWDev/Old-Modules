import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FIRE_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";


const CONVOKEFIRE = std.Spells.create (MODNAME,'convoke-fire',12051).SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
    CASTER_SKILL_TRAINER.Trainer.addSpell(CONVOKEFIRE.ID,10,69)//CHANGE LATER
CONVOKEFIRE.Name.enGB.set('Convoke Fire')
CONVOKEFIRE.Subtext.enGB.set('')
CONVOKEFIRE.Description.enGB.set('Channel your inner fire to increase the casters SOMETHING by $s2% for $d seconds.') //can change the %
CONVOKEFIRE.AuraDescription.enGB.set('Increased Fire Critical Strike Chance by $s1% and Fire Spell cast time for $s2%')
CONVOKEFIRE.Icon.set('Interface\\Icons\\spell_shaman_stormearthfire.blp')
CONVOKEFIRE.Duration.set(15000,0,15000)
CONVOKEFIRE.Range.set(0,0,0,0)
CONVOKEFIRE.Power.setMana(20,5)
CONVOKEFIRE.Cooldown.set(180000,0,0,0)
CONVOKEFIRE.Visual.cloneFromVisual(13238)
CONVOKEFIRE.Attributes.channeled2.check()

