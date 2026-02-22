import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { TRAPPER_SKILL } from "../../Ranged";

const SNAPETRAP = std.Spells.create (MODNAME,'snake-trap',34600).SkillLines.add(TRAPPER_SKILL.ID).setAutolearn().end;
SNAPETRAP.Name.enGB.set('Snake Trap')
SNAPETRAP.Subtext.enGB.set('')
SNAPETRAP.Cooldown.set(30000,0,0,0)
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
