import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { DEATH_SKILL } from "../../Caster";

const DEATHTOUCH = std.Spells.create (MODNAME,'death-touch',47813).SkillLines.add(DEATH_SKILL.ID).setAutolearn().end;
DEATHTOUCH.Name.enGB.set('Death\'s Touch')
DEATHTOUCH.Subtext.enGB.set('')
DEATHTOUCH.Cooldown.set(3000,0,0,0)
DEATHTOUCH.row.RangeIndex.set(5)
DEATHTOUCH.Description.enGB.set('Allow death to feed off the targeted enemy, dealing $s1 Shadow damage over $d sec.')
