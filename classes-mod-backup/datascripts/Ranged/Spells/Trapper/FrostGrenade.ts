import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { TRAPPER_SKILL } from "../../Ranged";

const FROSTGRENADE = std.Spells.create (MODNAME,'frost-grenade',39965).SkillLines.add(TRAPPER_SKILL.ID).setAutolearn().end;
FROSTGRENADE.Name.enGB.set('Frost Grenade')
FROSTGRENADE.Subtext.enGB.set('')
FROSTGRENADE.Range.set(5,30,5,30)
FROSTGRENADE.Cooldown.set(18000,0,0,0)
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
