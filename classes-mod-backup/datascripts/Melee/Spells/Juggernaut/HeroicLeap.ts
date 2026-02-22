import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { JUGGERNAUT_SKILL } from "../../Melee";

const HEROICLEAP = std.Spells.create (MODNAME,'heroic-leap',6544).SkillLines.add(JUGGERNAUT_SKILL.ID).setAutolearn().end;
HEROICLEAP.Name.enGB.set('Heroic Leap')
HEROICLEAP.Subtext.enGB.set('')
//VOIDSTRIKE.Range.set(5,30,5,30)
HEROICLEAP.Cooldown.set(22000,0,0,0)
HEROICLEAP.Cooldown.StartTime.set(1500)
HEROICLEAP.Description.enGB.set('Leap forward slamming down, dealing 50% weapon damage and stunning all enemies caught underfoot for 2 seconds. This ability will remove any immobilization effects when used.')
