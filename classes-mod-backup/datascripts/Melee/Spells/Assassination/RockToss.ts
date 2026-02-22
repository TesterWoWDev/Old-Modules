import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { ASSASSINATION_SKILL } from "../../Melee";

const TOSS = std.Spells.create (MODNAME,'thrown-toss',39129).SkillLines.add(ASSASSINATION_SKILL.ID).setAutolearn().end;
TOSS.Name.enGB.set('Rock Toss')
TOSS.Subtext.enGB.set('')
TOSS.Cooldown.StartTime.set(1500)
TOSS.Power.setRage(10)
TOSS.Description.enGB.set('Toss a thrown weapon at a nearby enemy dealing Physical damage.') //can change the %
