import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { BEAST_SKILL } from "../../Ranged";

const LACERATE = std.Spells.create (MODNAME,'lacerate',48568).SkillLines.add(BEAST_SKILL.ID).setAutolearn().end;
LACERATE.Name.enGB.set('Lacerate')
LACERATE.Subtext.enGB.set('Guardian Affinity')
//HARSHCLAW.Description.enGB.set('Claw the target, causing 225% damage + 666 to the target. Must be behind the target. Effects which increase Bleed damage also increase Harsh Claw damage.')


const SWIPE = std.Spells.create (MODNAME,'swipe',48562).SkillLines.add(BEAST_SKILL.ID).setAutolearn().end;
SWIPE.Name.enGB.set('Swipe')
SWIPE.Subtext.enGB.set('Guardian Affinity')
//RAKE.Description.enGB.set('Rake the target for ${$AP/100+$m1} bleed damage and an additional ${$m2*3+$AP*0.18} damage over $d.')