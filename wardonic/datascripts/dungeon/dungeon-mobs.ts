import { std } from "wow/wotlk";
import { MODNAME } from "../modname";

let mapIDs = [1]
let bossIDs = [1]
//query world db for all creatures of mapIDs listed
mapIDs.forEach((mapID,index,arr)=>{
    std.SQL.creature.queryAll({map:mapID}).forEach((row,index,arr)=>{
        let c = std.CreatureTemplates.load(row.id.get())
        c.Tags.add(MODNAME,'all-mythic-mobs')
    })
})

bossIDs.forEach((bossID,index,arr)=>{
    let c = std.CreatureTemplates.load(bossID)
    c.Tags.add(MODNAME,'all-mythic-bosses')
})