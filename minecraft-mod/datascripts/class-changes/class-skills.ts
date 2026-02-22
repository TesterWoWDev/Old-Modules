import { std } from "wow/wotlk";
import { ClassMask } from "wow/wotlk/std/Class/ClassRegistry";
import { ClassType } from "wow/wotlk/std/Class/ClassType";
import { RaceMask } from "wow/wotlk/std/Race/RaceType";

let classes: ClassType[] = [
    "WARRIOR",
    "PALADIN",
    "HUNTER",
    "ROGUE",
    "PRIEST",
    "DEATH_KNIGHT",
    "SHAMAN",
    "MAGE",
    "WARLOCK",
    "DRUID",
];
classes.forEach((value, index, array) => {
    let curClass = std.Classes.load(value);
    curClass.Stats.MeleeCrit.set((old, index) => 0); // Controls Main Stat to Crit Rating
    curClass.Stats.BaseMeleeCrit.set((old, index) => 0); // Controls Crit per Level
    curClass.Stats.CombatRatings.set((old, index) => 5); // Controls Secondary Stats (primarily Critical Strike)
    curClass.Stats.CombatRatingsScalar.set((old, index) => 0.1); // Controls Secondary Stats (primarily haste)
    curClass.Stats.SpellCrit.set((old, index) => 0); // Controls Main Stat to Crit Rating
    curClass.Stats.BaseSpellCrit.set((old, index) => 0); // Controls Crit per Level
    curClass.Races.forEach((x) => {
        x.Outfits.both((y) => {
            for (let i = 0; i < 10; i++) {
                y.Items.forEach((v, ind) => {
                    if (v.InventoryType.get() <= 12 && v.InventoryType.get() > 0) {
                        v.clear();
                    }
                });
            }
        });
    });
});
