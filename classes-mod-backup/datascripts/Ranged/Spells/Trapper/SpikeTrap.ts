import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { TRAPPER_SKILL } from "../../Ranged";

const SPIKETRAP = std.Spells.create (MODNAME,'spike-trap',52886).SkillLines.add(TRAPPER_SKILL.ID).setAutolearn().end;
SPIKETRAP.Name.enGB.set('Spike Trap')
SPIKETRAP.Subtext.enGB.set('')
SPIKETRAP.Cooldown.set(20000,0,0,0)
//FROSTSPEAR.Description.enGB.set('Increases Critical Strike Chance of all Fire Spells by $s1% and Fire Spell casting time by $s2% for $d seconds.') //can change the %
