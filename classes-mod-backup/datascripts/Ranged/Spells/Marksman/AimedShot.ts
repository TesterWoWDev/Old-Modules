import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { MARKSMAN_SKILL } from "../../Ranged";

const AIMEDSHOT = std.Spells.create (MODNAME,'aimed-shot',65883).SkillLines.add(MARKSMAN_SKILL.ID).setAutolearn().end;
AIMEDSHOT.Name.enGB.set('Aimed Shot')
AIMEDSHOT.Subtext.enGB.set('')
AIMEDSHOT.Cooldown.set(5000,0,0,0)

