import { DoubleCast } from "./DoubleCast";
import { LeavesResource } from "./LeavesResource";

export function LifeController(events: TSEventHandlers) {
    LeavesResource(events)
    DoubleCast(events)
}