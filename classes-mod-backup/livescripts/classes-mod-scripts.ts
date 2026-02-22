import { ArcaneController } from "./caster/Spells/Arcane/ArcaneController"
import { DeathController } from "./caster/Spells/Death/DeathController"
import { FireController } from "./caster/Spells/Fire/FireController"
import { FrostController } from "./caster/Spells/Frost/FrostController"
import { LifeController } from "./caster/Spells/Life/LifeController"
import { AssassinationController } from "./melee/Spells/Assassination/AssassinationController"
import { DefenderController } from "./melee/Spells/Defender/DefenderController"
import { JuggernautController } from "./melee/Spells/Juggernaut/JuggernautController"
import { KnightController } from "./melee/Spells/Knight/KnightController"
import { AmazonianController } from "./ranged/Spells/Amazonian/AmazonianController"
import { BestiaryController } from "./ranged/Spells/Beastiary/BestiaryController"
import { MarksmanController } from "./ranged/Spells/Marksman/MarksmanController"
import { TrapperController } from "./ranged/Spells/Trapper/TrapperController"
import { ResourceController } from "./ResourceController"


export function Main(events: TSEventHandlers) {

    ResourceController(events)
    //caster
    ArcaneController(events)
    DeathController(events)
    FireController(events)
    FrostController(events)
    LifeController(events)
    //melee
    AssassinationController(events)
    DefenderController(events)
    JuggernautController(events)
    KnightController(events)
    //ranged
    AmazonianController(events)
    BestiaryController(events)
    MarksmanController(events)
    TrapperController(events)
}