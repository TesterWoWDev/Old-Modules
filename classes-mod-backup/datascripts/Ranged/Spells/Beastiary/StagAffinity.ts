import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { BEAST_SKILL } from "../../Ranged";

const STAGFORM = std.Spells.create (MODNAME,'stag-form',768).SkillLines.add(BEAST_SKILL.ID).setAutolearn().end;
STAGFORM.Name.enGB.set('Stag Affinity')
STAGFORM.Subtext.enGB.set('')
STAGFORM.Duration.set(15000,0,15000)
STAGFORM.Cooldown.set(60000,0,0,0)
STAGFORM.Description.enGB.set('Take up the stag affinity, increasing movmeent speed by 40%. Also protects the caster from Polymorph effects. Only useable outdoors.')