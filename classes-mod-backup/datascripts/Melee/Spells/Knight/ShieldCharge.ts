import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { KNIGHT_SKILL } from "../../Melee";

const SHIELDCHARGE = std.Spells.create (MODNAME,'shield-charge',31863).SkillLines.add(KNIGHT_SKILL.ID).setAutolearn().end;
SHIELDCHARGE.Name.enGB.set('Shield Charge')
SHIELDCHARGE.Subtext.enGB.set('')
//VOIDSTRIKE.Range.set(5,30,5,30)
SHIELDCHARGE.Cooldown.set(11000,0,0,0)
SHIELDCHARGE.Power.setRage(15)//adjust later?
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
