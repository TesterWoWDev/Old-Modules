import { std } from "wow/wotlk";
import { MODNAME } from "../modname";

for (let i = 1; i <= 30; i++) {
    let key = std.Items.create(MODNAME, 'key' + i, 45798)
    key.Name.enGB.set('Mythic Stone +' + i)
    key.Tags.add(MODNAME, 'mythic-keys')
}

const dungeonStart = std.GameObjectTemplates.Rituals.create(MODNAME, 'mythic-start-gob', 177193)
    .Name.enGB.set('Altar of Mythical Power')
    .Tags.addUnique(MODNAME, 'mythic-start-gob')
