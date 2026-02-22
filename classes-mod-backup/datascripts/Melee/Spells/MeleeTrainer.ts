import {std} from "tswow-stdlib"
import { Pos } from "tswow-stdlib/Misc/Position"
import { MODNAME } from "../../moduleName"
import { MELEE_CLASS } from "../Melee"

export const MELEE_SKILL_TRAINER = std.CreatureTemplates.create(MODNAME, 'melee-skill-trainer', 3049)
	MELEE_SKILL_TRAINER.Name.enGB.set('Tester')
	MELEE_SKILL_TRAINER.Subname.enGB.set('Melee Trainer') // can be changed as with greeting
	MELEE_SKILL_TRAINER.Trainer.Greeting.enGB.set('Welcome Young Melee')
	MELEE_SKILL_TRAINER.Trainer.Class.set(MELEE_CLASS.ID);
	MELEE_SKILL_TRAINER.FactionTemplate.set(35)
	MELEE_SKILL_TRAINER.Gossip.setID(0)
	MELEE_SKILL_TRAINER.spawn('MODNAME','Mulgore',Pos(1, -2937.020020,-247.785126,53.726421,4.705323))