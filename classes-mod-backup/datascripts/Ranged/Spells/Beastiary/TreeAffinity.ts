import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { BEAST_SKILL } from "../../Ranged";

const TREEFORM = std.Spells.create (MODNAME,'tree-form',768).SkillLines.add(BEAST_SKILL.ID).setAutolearn().end;
TREEFORM.Name.enGB.set('Tree Affinity')
TREEFORM.Subtext.enGB.set('')
TREEFORM.Duration.set(20000,0,20000)
TREEFORM.Cooldown.set(60000,0,0,0)
TREEFORM.Description.enGB.set('Take up the tree affinity, increase healing recieved by all party and raid members within 100 yards,but you can only cast Restorative spells.')