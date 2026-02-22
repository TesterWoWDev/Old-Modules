import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { TRAPPER_SKILL } from "../../Ranged";

const ERUPTION = std.Spells.create (MODNAME,'eruption',19497).SkillLines.add(TRAPPER_SKILL.ID).setAutolearn().end;
ERUPTION.Name.enGB.set('Eruption')
ERUPTION.Subtext.enGB.set('')
ERUPTION.Cooldown.set(25000,0,0,0)
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
