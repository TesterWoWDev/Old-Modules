import { std } from "wow/wotlk";

std.SQL.player_xp_for_level.queryAll({}).forEach((value, index, array) => {
    if (index <= 20) value.Experience.set(value.Experience.get() * 3.25);
});
