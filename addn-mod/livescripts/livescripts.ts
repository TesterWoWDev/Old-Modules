import { Atlas } from "./atlas";
import { customQuest } from "./custom-quest";
import { talentSystem } from "./talent-system";

export function Main(events: TSEvents) {
    Atlas(events);
    customQuest(events);
    //talentSystem(events);
}
