
import { SQL, std } from "wow/wotlk";
export const MODNAME = 'battle-royale'

// this requires modifying RuneFrame.lua line: 109 and replacing it with the following:
//if ( class ~= "DEATHKNIGHT" and class ~= "ADVENTURER") then
//this will show the rune frame for adventurers and death knights

const ADVENTURER = std.Classes.create(MODNAME, 'adventurer', 'PALADIN')
    .Tags.addUnique(MODNAME, 'adventurer-class')
    .Name.enGB.set('Adventurer')
    .Races.add(['HUMAN', 'DWARF', 'NIGHTELF', 'GNOME', 'DRAENEI', 'ORC', 'UNDEAD', 'TAUREN', 'TROLL', 'BLOODELF'])
    .Stats.ParryCap.set(100)
    .Stats.DodgeCap.set(100)
    .Roles.Damage.set(1)
    .Roles.Healer.set(1)
    .Roles.Tank.set(1)

    .UI.ButtonPos.setPos(0, 100)
    .UI.Color.set(0xFFDAB9)
    .UI.Info.add('- Role: Tank, Healer, Damage')
    .UI.Info.add('- Can utilize any armor')
    .UI.Info.add('- Universal Potential')
    .UI.Info.add('- Uses mana, energy, or rage as a resource')
    .UI.Info.add('- Can use any weapon')
    .UI.Description.set("After the War Against the Nightmare, the inhabitants of Azeroth have devised new strategies to better protect their beloved planet. The Azerothians have given up maintaining the once kept secrecy of class orders, and have shared this information freely amongst each-other. Now, in the new age of Azeorth, Adventurers have arisen. These versatile individuals can adapt the skills and proficiencies of almost ANY previous class; however, the Knight's of the Ebon Blade have since been the only order to withhold their secrets from the public. Regardless, Azeroth will cherish its newfound protectors.")

std.SkillLines.forEach((line) => {
    if (line.Category.get() == 6 || line.Category.get() == 7 || line.Category.get() == 8) {
        line.RaceClassInfos.forEach((v, i) => {
            v.ClassMask.add(ADVENTURER.Mask)
            v.RaceMask.clearAll()
            v.RaceMask.flip()
        })
    }
})

std.DBC.SkillLineAbility.queryAll({ RaceMask: 0 }).forEach(v => {
    if (v.ClassMask.get() != 0 && (v.AcquireMethod.get() == 0 || v.AcquireMethod.get() == 1)) {
        v.ClassMask.mark(ADVENTURER.ID - 1)
        v.RaceMask.markAll([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
})

SQL.playercreateinfo.queryAll({ class: 12 }).forEach((v, i, arr) => {
    v.map.set(1)
    v.zone.set(490)
    v.position_x.set(-6170.5)
    v.position_y.set(-1096.28)
    v.position_z.set(-211)
    v.orientation.set(3.7)
})