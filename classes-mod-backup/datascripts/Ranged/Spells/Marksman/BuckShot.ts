import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { MARKSMAN_SKILL } from "../../Ranged";

const BUCKSHOT = std.Spells.create (MODNAME,'buck-shot',66081).SkillLines.add(MARKSMAN_SKILL.ID).setAutolearn().end;
BUCKSHOT.Name.enGB.set('Buck Shot')
BUCKSHOT.Subtext.enGB.set('')
BUCKSHOT.Range.set(5,20,5,20)
BUCKSHOT.Description.enGB.set('Fires a blast of your shotgun, striking up to 3 targets for normal damage plus $s1')
