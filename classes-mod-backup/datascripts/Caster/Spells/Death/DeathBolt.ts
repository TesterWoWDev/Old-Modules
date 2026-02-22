import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { DEATH_SKILL } from "../../Caster";

const DEATH_BOLT = std.Spells.create(MODNAME,'death-bolt',686).SkillLines.add(DEATH_SKILL.ID).setAutolearn().end;
DEATH_BOLT.Name.enGB.set('Death Bolt')
DEATH_BOLT.Description.enGB.set('A bolt of death!');
DEATH_BOLT.row.RangeIndex.set(5)