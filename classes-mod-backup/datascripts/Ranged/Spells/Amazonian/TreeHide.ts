import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { AMAZONIAN_SKILL } from "../../Ranged";

//spawns a box, fix model in it
const TREEHIDE = std.Spells.create (MODNAME,'tree-hide',42943).SkillLines.add(AMAZONIAN_SKILL.ID).setAutolearn().end;
TREEHIDE.Name.enGB.set('Hidden Amongst Trees')
TREEHIDE.Subtext.enGB.set('')
TREEHIDE.Cooldown.set(25000,0,0,0)
TREEHIDE.Description.enGB.set('Blend into your surrounding for $d sec.')