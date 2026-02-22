
import { addResource, getResource, removeResource } from "../../../ResourceController";

const lifeItem = 100001
const maxLifeResource = 5
const lifeChance = 10

export function LeavesResource(events: TSEventHandlers) {
    events.Player.OnSpellCast((player,spell,skipcheck)=>{
        if(player.HasItem(lifeItem,1,true)){
            if(Math.random()*100 <= lifeChance){
                if(spell.GetEntry() == 36052)
                    return
                addResource(player,1,maxLifeResource)
            }
        }
    })

    events.Player.OnSpellCast((player,spell,skipcheck)=>{
        if(spell.GetEntry() == 36052){//replace with instacast//make spell do nothing/heal 0
            let resource = getResource(player)
            if(resource > 0){
                let target = spell.GetTarget().ToPlayer()
                let add = (target.GetMaxHealth()/(25-((resource-1)*4)))
                let newHP = target.GetHealth() + add
                target.SetHealth(newHP)//4%,5%,6.667%,10%,20%
                removeResource(player,maxLifeResource,maxLifeResource)
            }else{
                player.SendAreaTriggerMessage("You need at least 1 leaf!")
                spell.Cancel()
            }
        }
    })
}