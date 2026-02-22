import { HealthLink } from "./HealthLink";
import { HealthSwap } from "./HealthSwap";
import { MultiPetAttack } from "./MultiPetAttack";

export function DeathController(events: TSEventHandlers) {
    HealthLink(events)
    HealthSwap(events)
    MultiPetAttack(events)
}