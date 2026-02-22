import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { DEATH_SKILL } from "../../Caster";
import { AttackAnimKitsDBCFile } from "wotlkdata/dbc/types/AttackAnimKits";

export const HEALTH_LINK = std.Spells.create(MODNAME,'health-swap',686)
	HEALTH_LINK.Name.enGB.set('Health Swap')
	HEALTH_LINK.Description.enGB.set('Swaps the health percentage between you and your target.');
	HEALTH_LINK.SkillLines.add(DEATH_SKILL.ID).setAutolearn();
