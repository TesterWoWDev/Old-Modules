import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { KNIGHT_SKILL } from "../../Melee";

const CONCENTRATIONAURA = std.Spells.create (MODNAME,'concentration-aura',19746).SkillLines.add(KNIGHT_SKILL.ID).setAutolearn().end;
CONCENTRATIONAURA.Name.enGB.set('Concentration Aura')
CONCENTRATIONAURA.Subtext.enGB.set('')
CONCENTRATIONAURA.Description.enGB.set('All party or raid members within $a1 yards lose $s1% less casting or channeling time when damaged.')
CONCENTRATIONAURA.row.DurationIndex.set(550)
