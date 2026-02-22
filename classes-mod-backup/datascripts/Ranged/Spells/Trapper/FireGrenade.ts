import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { TRAPPER_SKILL } from "../../Ranged";

const FIREGRENADE = std.Spells.create (MODNAME,'fire-grenade',46590).SkillLines.add(TRAPPER_SKILL.ID).setAutolearn().end;
FIREGRENADE.Name.enGB.set('Fire Grenade')
FIREGRENADE.Subtext.enGB.set('')
FIREGRENADE.Cooldown.set(6000,0,0,0)
FIREGRENADE.Range.set(5,25,5,25)
FIREGRENADE.Description.enGB.set('Lob a fire grenade at an enemy, dealing $s1 Fire damage to targets in a 3 yard radius.')
