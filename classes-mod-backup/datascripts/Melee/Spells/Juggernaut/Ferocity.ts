import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { JUGGERNAUT_SKILL } from "../../Melee";

const FEROCITY = std.Spells.create (MODNAME,'ferocity',4154).SkillLines.add(JUGGERNAUT_SKILL.ID).setAutolearn().end;
FEROCITY.Name.enGB.set('Ferocity')
FEROCITY.Subtext.enGB.set('')
//VOIDSTRIKE.Range.set(5,30,5,30)
FEROCITY.Cooldown.set(90000,0,0,0)
FEROCITY.Description.enGB.set('Go into a frezy gaining 50% haste but taking 60 more damage from any attacks for 8 seconds.') //can change the %
