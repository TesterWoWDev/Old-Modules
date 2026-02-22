import {std} from "tswow-stdlib"
import { Pos } from "tswow-stdlib/Misc/Position"
import { MODNAME } from "../../moduleName"
import { RANGED_CLASS } from "../Ranged"

export const RANGED_SKILL_TRAINER_HORDE = std.CreatureTemplates.create(MODNAME, 'ranged-skill-trainer', 3049)
	RANGED_SKILL_TRAINER_HORDE.Name.enGB.set('Ghost')
	RANGED_SKILL_TRAINER_HORDE.Subname.enGB.set('Ranged Trainer') // can be changed as with greeting
	RANGED_SKILL_TRAINER_HORDE.Trainer.Greeting.enGB.set('Welcome Young Ranger')
	RANGED_SKILL_TRAINER_HORDE.Trainer.Class.set(RANGED_CLASS.ID);
	RANGED_SKILL_TRAINER_HORDE.FactionTemplate.set(35)
	RANGED_SKILL_TRAINER_HORDE.Gossip.setID(0)
	RANGED_SKILL_TRAINER_HORDE.spawn('MODNAME','Mulgore',Pos(1,-2940.737793,-248.827667,53.565315,4.401661))
