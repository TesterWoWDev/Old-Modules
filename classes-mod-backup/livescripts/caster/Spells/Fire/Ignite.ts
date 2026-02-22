import { ID } from "../../../ID"


export function Ignite(events: TSEventHandlers) {
let firespells:TSArray<uint32> = 
[ID.CLASSES_MOD_FIREBALL_RANK4,ID.CLASSES_MOD_FIREBALL_RANK5,ID.CLASSES_MOD_FIREBALL_RANK6,ID.CLASSES_MOD_FIREBALL_RANK7] //add fire spells here -- Rank 4 FB and up, pyro, 
for(let i=0;i<firespells.length;i++){
    events.SpellID.OnCast(firespells[i],spell=>{
        if (spell.GetCaster().ToPlayer().HasSpell(ID.CLASSES_MOD_IGNITE))
        spell.GetCaster().ToPlayer().CastSpell(spell.GetTarget().ToUnit(),ID.CLASSES_MOD_IGNITE_DOT,true)
    })
}
    events.SpellID.OnTick(ID.CLASSES_MOD_IGNITE_DOT,aura=>{
        aura.SetAmount(aura.GetCaster().GetLevel()*3)
    })
}