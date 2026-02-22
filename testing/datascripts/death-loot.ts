import { std } from "wow/wotlk";

let id = 5000
let id2 = 40000

let cmd = std.DBC.CreatureModelData.add(id++).ModelName.set("World\\Expansion02\\Doodads\\Generic\\Vrykul\\Quest\\VR_Sack_03_Q.mdx");
let cdi = std.DBC.CreatureDisplayInfo.add(id2++).ModelID.set(cmd.ID.get())
std.SQL.creature_model_info.add(cdi.ID.get())

let cmd1 = std.DBC.CreatureModelData.add(id++).ModelName.set("Character\\Human2\\Male\\HumanMale.mdx");
let cdi1 = std.DBC.CreatureDisplayInfo.add(id2++).ModelID.set(cmd1.ID.get())

std.SQL.creature_model_info.add(cdi1.ID.get())


let c = std.CreatureTemplates.create('death-loot', 'npc_death_loot', 37828)
c.MovementSpeed.set(0.2, 0.2)
c.MovementType.set("IDLE")
c.Scale.set(0.4)
c.Models.clearAll()
c.Models.addIds(cdi.ID.get())
c.Scale.set(0.5)