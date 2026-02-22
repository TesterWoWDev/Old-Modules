import { std } from "tswow-stdlib";
import { MODNAME } from "../moduleName";
import { LIFE_SKILL } from "./Caster";

export const DOUBLE_CAST = std.Spells.create(MODNAME,'double-cast',24752)
		DOUBLE_CAST.Name.enGB.set('Double Cast')
		DOUBLE_CAST.Description.enGB.set('summon a creature, within 10 seconds recast and youll make the creature talk.');
		DOUBLE_CAST.SkillLines.add(LIFE_SKILL.ID).setAutolearn();