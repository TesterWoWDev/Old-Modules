import { ID } from "../../../ID"

export function rageSpell(events: TSEventHandlers) {
    events.SpellID.OnCast(ID.CLASSES_MOD_JUGGERNAUTS_RAGE,(spell)=>{
        let caster = spell.GetCaster().ToUnit()
        if(caster.GetHealthPct() > 50){
            spell.Cancel()
        }
     })
}