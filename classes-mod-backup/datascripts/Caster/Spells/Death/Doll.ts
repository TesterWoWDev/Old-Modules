import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { CASTER_CLASS } from "../../Caster";

export const CASTER_TOTEM = std.Items.create(MODNAME, 'caster-totem-item',46978)
	CASTER_TOTEM.Name.set({enGB:"Caster's Doll"})
	CASTER_TOTEM.Description.set({enGB:"The doll required to conjure any of a Caster's minions"})
    CASTER_TOTEM.DisplayInfo.setID(std.Items.load(19816).DisplayInfo.ID)
//	CASTER_TOTEM.DisplayID.set(std.Items.load(19816).DisplayID.get())
	CASTER_TOTEM.Flags.set(CASTER_TOTEM.Flags.get()+32)
	CASTER_CLASS.Inventory.add(CASTER_TOTEM.ID,1)
	//penis
	