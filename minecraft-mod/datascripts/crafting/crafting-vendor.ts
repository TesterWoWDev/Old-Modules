import { std } from "wow/wotlk";
import { torghastEndCurrency } from "../dungeons/torghast-master-script-entities";
import { MODNAME } from "../modname";
import { stringItem } from "./tier-gear/tier1";
import { tierTwoBaseResources, tierTwoMailMaterial, tierTwoLeatherMaterial, tierTwoClothMaterial } from "./tier-gear/tier2";

std.DBC.ItemExtendedCost.add(7000)
    .ItemCount.fill(0).ItemCount.set([5])
    .ItemID.fill(0).ItemID.set([torghastEndCurrency.ID])
    .HonorPoints.set(0).ArenaPoints.set(0)


export let craftingVendor = std.CreatureTemplates.create(MODNAME, "crafting-vendor", 3562);
craftingVendor.Name.enGB.set("Crafting Vendor");
craftingVendor.Subname.enGB.set("All Powerful");
craftingVendor.FactionTemplate.set(35);
craftingVendor.Vendor.add(stringItem.ID, 7000);

tierTwoBaseResources.forEach(element => {
    craftingVendor.Vendor.add(element, 7000);
});
craftingVendor.Vendor.add(tierTwoMailMaterial, 7000);
craftingVendor.Vendor.add(tierTwoLeatherMaterial, 7000);
craftingVendor.Vendor.add(tierTwoClothMaterial, 7000);
craftingVendor.Spawns.add(MODNAME, 'craft-spawn', { map: 725, x: -8737, y: -68.5, z: 31.35, o: 3.23 });
