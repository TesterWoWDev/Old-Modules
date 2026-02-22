import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { AMAZONIAN_SKILL } from "../../Ranged";

//spawns a box, fix model in it
const FASTFEET = std.Spells.create (MODNAME,'fast-feet',2983).SkillLines.add(AMAZONIAN_SKILL.ID).setAutolearn().end;
FASTFEET.Name.enGB.set('Fast Feet')
FASTFEET.Subtext.enGB.set('')
FASTFEET.Duration.set(10000,0,10000)
FASTFEET.Cooldown.set(120000,0,0,0)