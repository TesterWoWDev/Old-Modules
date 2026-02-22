import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { AMAZONIAN_SKILL } from "../../Ranged";

//spawns a box, fix model in it
const FROSTSPEAR = std.Spells.create (MODNAME,'frost-spear',63111).SkillLines.add(AMAZONIAN_SKILL.ID).setAutolearn().end;
FROSTSPEAR.Name.enGB.set('Frost Spear')
FROSTSPEAR.Subtext.enGB.set('')
FROSTSPEAR.Range.set(5,30,5,30)
FROSTSPEAR.Cooldown.set(10000,0,0,0)