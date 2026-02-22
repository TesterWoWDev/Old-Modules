import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { JUGGERNAUT_SKILL } from "../../Melee";

const BLUDGEON = std.Spells.create (MODNAME,'bludgeon',60870).SkillLines.add(JUGGERNAUT_SKILL.ID).setAutolearn().end;
BLUDGEON.Name.enGB.set('Bludgeon')
BLUDGEON.Subtext.enGB.set('')
//VOIDSTRIKE.Range.set(5,30,5,30)
BLUDGEON.Cooldown.set(11000,0,0,0)
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
