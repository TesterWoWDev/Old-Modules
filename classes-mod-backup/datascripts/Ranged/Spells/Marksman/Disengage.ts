import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { MARKSMAN_SKILL } from "../../Ranged";

const DISENGAGE = std.Spells.create (MODNAME,'disengage',65870).SkillLines.add(MARKSMAN_SKILL.ID).setAutolearn().end;
DISENGAGE.Subtext.enGB.set('')
