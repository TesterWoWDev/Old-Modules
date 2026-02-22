import { std } from "wow/wotlk"

const ZARTHUUL = std.CreatureTemplates.create('Battleroyale','zarthuuul')
    .Name.enGB.set("Zarthuul the Devourer")
    // I don't know if we want to scale levels but im just gonna put this for now
    .Level.set(11,14)
    .Rank.RARE_ELITE.set()
    .Type.BEAST.set()
    .UnitClass.WARRIOR.set()
    .SkinningLoot.set(6584)
    .Family.DEVILSAUR.set()
    .Scale.set(2)
    .Models.addIds(5238)
    .PetSpells.set(39)
    .FactionTemplate.NEUTRAL_HOSTILE.set()
    .NormalLoot.set(6499)

ZARTHUUL.Scripts.onUpdateIc(14000, 18000, 19000, 22000, (ZARTHUULROAR => {
    ZARTHUULROAR
        .Target.setVictim()
        .Action.setCast(14100, 0, 0)
}))

ZARTHUUL.Scripts.onUpdateIc(4000, 9000, 5000, 6000, (ZARTHUULDEBUFF => {
    ZARTHUULDEBUFF
        .Target.setVictim()
        .Action.setCast(13692, 0, 0)
        .Chance.set(55,"[0-100]")
}))

ZARTHUUL.Spawns.add("Battleroyale", "Zarthuul", {map:1,x:-7571.328125,y:-683.499573,z:-251.239639,o:4.591424}, (Zarthuulspawn) => {
    Zarthuulspawn
        .SpawnTime.set(48000)
        .MovementType.WAYPOINT.set()
        .PatrolPath.add("WALK", [
            {map:1,x:-7571.328125,y:-683.499573,z:-251.239639,o:4.591424},
            {map:1,x:-7585.839844,y:-769.317871,z:-262.414032,o:4.422565},
            {map:1,x:-7642.346680,y:-824.380798,z:-272.145447,o:3.798177},
            {map:1,x:-7709.947266,y:-859.886108,z:-271.043396,o:3.892425},
            {map:1,x:-7728.434570,y:-902.339600,z:-271.140839,o:4.677812},
            {map:1,x:-7715.380371,y:-938.509949,z:-270.579681,o:5.599082},
            {map:1,x:-7681.924805,y:-937.100281,z:-271.259766,o:0.832501},
            {map:1,x:-7624.815430,y:-925.617065,z:-267.602692,o:5.902246},

        ])
})
