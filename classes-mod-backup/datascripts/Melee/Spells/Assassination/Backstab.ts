import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { ASSASSINATION_SKILL } from "../../Melee";

const BACKSTAB = std.Spells.create (MODNAME,'backstab',63754).SkillLines.add(ASSASSINATION_SKILL.ID).setAutolearn().end;
BACKSTAB.Name.enGB.set('Backstab')
BACKSTAB.Subtext.enGB.set('')
BACKSTAB.Cooldown.StartTime.set(1500)
BACKSTAB.Power.setEnergy(0)
BACKSTAB.Power.setRage(15)
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
