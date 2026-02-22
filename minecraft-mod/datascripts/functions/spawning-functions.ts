import { std } from "wow/wotlk";
import { Position } from "wow/wotlk/std/Misc/Position";

import { MODNAME } from "../modname";

export function spawnNPC(
    id: number,
    wanderDistance: number,
    equipmentID: number,
    position: Position,
    index?: number
) {
    if (index == null) {
        index = 0;
    }
    let guid = 0;
    std.CreatureTemplates.load(id).Spawns.addMod(
        MODNAME,
        id + "creature-spawn" + index,
        position,
        (instance) => {
            instance.row.equipment_id.set(equipmentID);
            if (wanderDistance > 0) {
                instance.WanderDistance.set(wanderDistance);
                instance.MovementType.RANDOM_MOVEMENT.set();
            }
            guid = instance.ID;
        }
    );
    return guid;
}

export function spawnMultipleNPCs(
    id: number,
    wanderDistance: number,
    equipmentID: number,
    positions: Position[]
) {
    let guids = [];
    for (let i = 0; i < positions.length; i++) {
        let spawn = spawnNPC(id, wanderDistance, equipmentID, positions[i], i);
        guids.push(spawn);
    }
    return guids;
}

export function spawnNPCWithTimer(
    id: number,
    wanderDistance: number,
    equipmentID: number,
    position: Position,
    respawnTime: number,
    index?: number
) {
    if (index == null) {
        index = 0;
    }
    let guid = 0;
    std.CreatureTemplates.load(id).Spawns.addMod(
        MODNAME,
        id + "creature-spawn" + index,
        position,
        (instance) => {
            instance.row.equipment_id.set(equipmentID);
            if (wanderDistance > 0) {
                instance.WanderDistance.set(wanderDistance);
                instance.MovementType.RANDOM_MOVEMENT.set();
                instance.SpawnTime.set(respawnTime);
            }
            guid = instance.ID;
        }
    );
    return guid;
}

export function spawnMultipleNPCWithTimer(
    id: number,
    wanderDistance: number,
    equipmentID: number,
    position: Position[],
    respawnTime: number
) {
    let guids: number[] = [];
    position.forEach((value, index) => {
        let guid = spawnNPCWithTimer(
            id,
            wanderDistance,
            equipmentID,
            value,
            respawnTime,
            index
        );
        guids.push(guid);
    });

    return guids;
}

export function spawnGob(id: number, position: Position, index?: number) {
    if (index == null) {
        index = 0;
    }
    let guid = 0;
    let s = std.GameObjectTemplates.Plain.load(id).Spawns.addMod(
        MODNAME,
        id + "gob-spawn" + index,
        position,
        (instance) => {
            guid = instance.ID;
        }
    );
    return guid;
}

export function spawnMultipleGobs(id: number, positions: Position[]) {
    for (let i = 0; i < positions.length; i++) {
        spawnGob(id, positions[i], i);
    }
}

export function spawnGobTimer(
    id: number,
    position: Position,
    spawnSecs: number,
    index?: number
) {
    if (index == null) {
        index = 0;
    }
    let guid = 0;
    std.GameObjectTemplates.Plain.load(id).Spawns.addMod(
        MODNAME,
        id + "gob-spawn" + index,
        position,
        (instance) => {
            instance.SpawnTimeSecs.set(spawnSecs);
            guid = instance.ID;
        }
    );
    return guid;
}

export function spawnMultiGobTimer(
    id: number,
    position: Position[],
    spawnSecs: number
) {
    let guids: number[] = [];
    position.forEach((value, index) => {
        let guid = spawnGobTimer(id, value, spawnSecs, index);
        guids.push(guid);
    });
    return guids;
}

export function addWaypoint(guid: number, path: number[][]) {
    let pathID = guid * 10;
    path.forEach((value, index) => {
        std.SQL.waypoint_data
            .add(pathID, index)
            .position_x.set(value[0])
            .position_y.set(value[1])
            .position_z.set(value[2])
            .orientation.set(value[3])
            .delay.set(value[4])
            .move_type.set(0);
    });
    std.SQL.creature_addon.add(guid).path_id.set(pathID);
}
export function addWaypoints(guids: number[], paths: number[][][]) {
    guids.forEach((value, index) => {
        addWaypoint(value, paths[index]);
    });
}
