import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { ASSASSINATION_SKILL } from "../../Melee";

const VOIDSTRIKE = std.Spells.create (MODNAME,'void-strike',52633).SkillLines.add(ASSASSINATION_SKILL.ID).setAutolearn().end;
VOIDSTRIKE.Name.enGB.set('Void Strike')
VOIDSTRIKE.Subtext.enGB.set('')
//VOIDSTRIKE.Range.set(5,30,5,30)
VOIDSTRIKE.Cooldown.set(3000,0,0,0)
VOIDSTRIKE.Cooldown.StartTime.set(1500)
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
