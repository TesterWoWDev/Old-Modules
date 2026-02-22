import { std } from "wow/wotlk";
import { SQL } from "wow/wotlk/SQLFiles";
import { creatureAddonGuids, creatureFormationsGuids, eventCreatureGuids, poolCreatureGuids, smartScriptGuids, spawnGroupGuids } from "./const-guid-arrays";
import { runDB } from "../datascripts";
//delete all creatures
SQL.Databases.world_dest.write('DELETE FROM	creature WHERE creature.position_x <= -6350 AND	creature.position_x >= -8250 AND creature.position_y <= -300 AND creature.position_y >= -2300;')

if(runDB)
    clearOutDBErrors()

function clearOutDBErrors()
{
    const smartScriptSqls = smartScriptGuids.map((guid) => `DELETE FROM smart_scripts WHERE entryorguid = -${guid}`);
    const creatureFormationsSqls = creatureFormationsGuids.map((guid) => `DELETE FROM creature_formations WHERE leaderGUID = ${guid} OR memberGUID = ${guid}`);
    const eventCreatureSqls = eventCreatureGuids.map((guid) => `DELETE FROM game_event_creature WHERE guid = ${guid}`);
    const poolCreatureSqls = poolCreatureGuids.map((guid) => `DELETE FROM pool_members WHERE type = 0 AND spawnId = ${guid}`);
    const creatureAddonSqls = creatureAddonGuids.map((guid) => `DELETE FROM creature_addon WHERE guid = ${guid}`);
    const spawnGroupSqls = spawnGroupGuids.map((guid) => `DELETE FROM spawn_group WHERE spawnType = 0 AND spawnId = ${guid}`);
    const allSqls = [...smartScriptSqls, ...creatureFormationsSqls, ...eventCreatureSqls, ...poolCreatureSqls, ...creatureAddonSqls, ...spawnGroupSqls];
    std.SQL.Databases.world_dest.write(allSqls.join(';'))
}
