import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { MARKSMAN_SKILL } from "../../Ranged";

const SNIPERSHOT = std.Spells.create (MODNAME,'sniper-shot',65883).SkillLines.add(MARKSMAN_SKILL.ID).setAutolearn().end;
SNIPERSHOT.Name.enGB.set('Sniper Shot')
SNIPERSHOT.Subtext.enGB.set('')
SNIPERSHOT.Cooldown.set(10000,0,0,0)
SNIPERSHOT.CastTime.set(3000,0,3000)
SNIPERSHOT.Range.set(5,50,5,50)
SNIPERSHOT.Description.enGB.set('Scope in for a shot that increases range damage by $s1 and reduces healing done to that target by $s2. Lasts $d sec.') //can change the %
