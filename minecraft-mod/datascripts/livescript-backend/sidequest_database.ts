
import { std } from "wow/wotlk";

function addSideQuest(
    diff: number,
    reqType: number,
    reqID: number,
    reqName: string,
    reqDescription: string,
    minReqAmount: number,
    maxReqAmount: number
) {
    std.SQL.Databases.world_dest.write(
        "INSERT INTO `player_quest_options` VALUES(" +
        diff +
        "," +
        reqType +
        "," +
        reqID +
        ',"' +
        reqName +
        '","' +
        reqDescription +
        '",' +
        minReqAmount +
        "," +
        maxReqAmount +
        ")"
    );
}
function addSideQuestReward(diff: number, itemID: number, itemCount: number) {
    std.SQL.Databases.world_dest.write(
        "INSERT INTO `player_quest_reward` VALUES(" +
        diff +
        "," +
        itemID +
        "," +
        itemCount +
        ")"
    );
}
