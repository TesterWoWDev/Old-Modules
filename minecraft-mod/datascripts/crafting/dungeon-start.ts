import { std } from "wow/wotlk";
import { MODNAME } from "../modname";

export let torghastStartObj = std.GameObjectTemplates.Rituals.create(
    MODNAME,
    "torghaststartobj",
    177193
);
torghastStartObj.Name.enGB.set("Mystical Starting Stone");
torghastStartObj.Spawns.add(MODNAME, 'start-spawn', { map: 725, x: -8739.3, y: -62.6, z: 31.14, o: 4.13 });