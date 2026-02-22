import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FIRE_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";
//store player fire spell dmage as a data pack(same as killstreak) get number in onTick to deal %

export const IGNITE = std.Spells.create (MODNAME,'ignite').SkillLines.add(FIRE_SKILL.ID).setAutolearn().end;

IGNITE.Name.enGB.set('Ignite')
IGNITE.Subtext.enGB.set('Passive')
IGNITE.Description.enGB.set('Your critical strikes from Fire damage spells cause the target to burn for additional Fire damage every second over 4 seconds')
IGNITE.Icon.set('Interface\\Icons\\spell_fire_incinerate.blp')
IGNITE.Attributes.isPassive.mark()

export const IGNITEDOT = std.Spells.create (MODNAME,'ignite-dot',172).SkillLines.add(FIRE_SKILL.ID).end;
IGNITEDOT.AuraDescription.enGB.set('Dealing additional Fire Damage equal to 3 times the casters level')//adjust this later
IGNITEDOT.Name.enGB.set('Burning')
IGNITEDOT.Duration.set(4000,0,4000)
IGNITEDOT.Icon.set('Interface\\Icons\\spell_fire_incinerate.blp')