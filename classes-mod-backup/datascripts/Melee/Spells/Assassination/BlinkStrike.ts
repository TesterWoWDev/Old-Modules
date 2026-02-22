import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { ASSASSINATION_SKILL } from "../../Melee";

const BLINKSTRIKE = std.Spells.create (MODNAME,'blink-strike',49961).SkillLines.add(ASSASSINATION_SKILL.ID).setAutolearn().end;
BLINKSTRIKE.Name.enGB.set('Blink Strike')
BLINKSTRIKE.Subtext.enGB.set('')
//VOIDSTRIKE.Range.set(5,30,5,30)
BLINKSTRIKE.Cooldown.set(13000,0,0,0)
BLINKSTRIKE.Cooldown.StartTime.set(1500)
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
