import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { MARKSMAN_SKILL } from "../../Ranged";

const RAPIDSHOTS = std.Spells.create (MODNAME,'rapid-shots',71251).SkillLines.add(MARKSMAN_SKILL.ID).setAutolearn().end;
RAPIDSHOTS.Name.enGB.set('Rapid Shots')
RAPIDSHOTS.Subtext.enGB.set('')
RAPIDSHOTS.Cooldown.set(30000,0,0,0)
//EXPLODINGSHOT.Description.enGB.set('Inflicts normal damage plus $s1 to an enemy and any of its nearby allies. All damage is dealt as fire damage.') //can change the %
