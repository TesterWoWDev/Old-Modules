import { ID } from "../../../ID"
export function MultiPetAttack(events: TSEventHandlers) {

//cast all other minion attacks
let spellID = ID.CLASSES_MOD_CONTROL_0_ATTACK//the period breaks lambda
	events.SpellID.OnCast(spellID,(spell)=>{
		let player = spell.GetCaster().ToPlayer()
		player.CastSpell(player,ID.CLASSES_MOD_CONTROL_1_ATTACK,true)
		player.CastSpell(player,ID.CLASSES_MOD_CONTROL_2_ATTACK,true)
		player.CastSpell(player,ID.CLASSES_MOD_CONTROL_3_ATTACK,true)
	});
	
}