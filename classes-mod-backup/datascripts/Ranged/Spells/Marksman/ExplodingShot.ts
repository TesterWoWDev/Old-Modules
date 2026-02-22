import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { MARKSMAN_SKILL } from "../../Ranged";

const EXPLODINGSHOT = std.Spells.create (MODNAME,'exploding-shot',7896).SkillLines.add(MARKSMAN_SKILL.ID).setAutolearn().end;
EXPLODINGSHOT.Name.enGB.set('Exploding Shot')
EXPLODINGSHOT.Subtext.enGB.set('')
EXPLODINGSHOT.Description.enGB.set('Inflicts normal damage plus $s1 to an enemy and any of its nearby allies. All damage is dealt as fire damage.') //can change the %
