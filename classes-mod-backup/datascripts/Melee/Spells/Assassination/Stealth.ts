import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { ASSASSINATION_SKILL } from "../../Melee";

const STEALTH = std.Spells.create (MODNAME,'stealth',58506).SkillLines.add(ASSASSINATION_SKILL.ID).setAutolearn().end;
STEALTH.Name.enGB.set('Stealth')
STEALTH.Subtext.enGB.set('')
STEALTH.Cooldown.set(60000,0,0,0)
STEALTH.Cooldown.StartTime.set(1500)
STEALTH.Description.enGB.set('Puts the caster in stealth mode. Lasts $d sec.') //can change the %
