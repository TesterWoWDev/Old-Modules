import { ID } from "../../../ID"
export function frostBite(events: TSEventHandlers) {
    events.SpellID.OnCast(ID.CLASSES_MOD_FROSTBOLT,spell=>{
        let target = spell.GetTarget().ToUnit()
        if(target.HasAura(ID.CLASSES_MOD_FROSTBITE)){
            if(target.GetAura(ID.CLASSES_MOD_FROSTBITE).GetStackAmount() == 2){
                if(target.HasAura(ID.CLASSES_MOD_FROSTBOMB)){
                    if(target.GetAura(ID.CLASSES_MOD_FROSTBOMB).GetStackAmount() == 4){
                        target.CastSpell(target,ID.CLASSES_MOD_SHATTER,true)
                    }else{
                        target.AddAura(ID.CLASSES_MOD_FROSTBOMB,target)
                    }
                }else{
                    target.AddAura(ID.CLASSES_MOD_FROSTBOMB,target)
                }
            }
            else{
            target.AddAura(ID.CLASSES_MOD_FROSTBITE,target)
            }
        }else{
            target.AddAura(ID.CLASSES_MOD_FROSTBITE,target)
        }
    })
}