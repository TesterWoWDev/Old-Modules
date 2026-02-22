import { std } from "wow/wotlk";
//custom sql files in bin/sql/custom/world
//crafting
std.SQL.Databases.world_dest.writeEarly("TRUNCATE TABLE `minecraft_recipes`");
//unused rn
std.SQL.Databases.world_dest.writeEarly("TRUNCATE TABLE `player_housing_item_spell_link`");
//sidequest
std.SQL.Databases.world_dest.writeEarly("TRUNCATE TABLE `player_quest_options`");
std.SQL.Databases.world_dest.writeEarly("TRUNCATE TABLE `player_quest_reward`");
//torghast
std.SQL.Databases.world_dest.writeEarly("TRUNCATE TABLE `torghast_spells`");

//clear for loot and vendors
std.SQL.Databases.world_source.writeEarly("DELETE FROM `creature_loot_template` WHERE Entry = 299");
std.SQL.Databases.world_source.writeEarly("DELETE FROM `npc_vendor` WHERE entry = 3562");
//teleports
std.SQL.game_tele
    .add(1450)
    .position_x.set(-8750.45)
    .position_y.set(-74.6418)
    .position_z.set(31.1351)
    .map.set(725)
    .name.set("start");

std.SQL.game_tele
    .add(1452)
    .position_x.set(910)
    .position_y.set(157)
    .position_z.set(414)
    .map.set(726)
    .name.set("torghast");
//base map info
std.DBC.MapDifficulty.add(1000)
    .MapID.set(725)
    .Difficulty.set(0)
    .Message.enGB.set(" ")
    .RaidDuration.set(0)
    .MaxPlayers.set(0)
    .Difficultystring.set(" ");
