import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { TRAPPER_SKILL } from "../../Ranged";

const NETTOSS = std.Spells.create (MODNAME,'poison-dart',70189).SkillLines.add(TRAPPER_SKILL.ID).setAutolearn().end;
NETTOSS.Name.enGB.set('Poison Dart')
NETTOSS.Subtext.enGB.set('')
NETTOSS.Cooldown.set(14000,0,0,0)
NETTOSS.Description.enGB.set('Throw a poison dart at an enemy, dealing damage every 2 sec. for $d sec. This effect will also hit targets within 5 yards.')
