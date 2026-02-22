import { std } from "wow/wotlk";

std.SQL.playercreateinfo.queryAll({}).forEach((value, index, arr) => {
    if (value.class.get() == 6) {
        value.map.set(725);
        value.position_x.set(-8749.424805);
        value.position_y.set(-77.516861);
        value.position_z.set(31.135099);
        value.orientation.set(0.923082);
    } else {
        value.map.set(725);
        value.position_x.set(-8749.424805);
        value.position_y.set(-77.516861);
        value.position_z.set(31.135099);
        value.orientation.set(0.923082);
    }
});
