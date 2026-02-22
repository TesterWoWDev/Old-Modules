import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { TRAPPER_SKILL } from "../../Ranged";

const NETTOSS = std.Spells.create (MODNAME,'net-toss',52761).SkillLines.add(TRAPPER_SKILL.ID).setAutolearn().end;
NETTOSS.Name.enGB.set('Net Toss')
NETTOSS.Subtext.enGB.set('')
NETTOSS.Cooldown.set(15000,0,0,0)
NETTOSS.Description.enGB.set('Toss a net at an enemy, immobilizing them for $d seconds and influcing Physical damage.')
