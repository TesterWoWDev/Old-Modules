import { ID } from "../../../ID"
export function HealthSwap(events: TSEventHandlers) {
		let spellID = ID.CLASSES_MOD_HEALTH_SWAP
				events.SpellID.OnCast(spellID,(spell)=>{
						const caster = spell.GetCaster().ToUnit()
						const target = spell.GetTarget().ToUnit()
						const tarHP = target.GetMaxHealth()*(caster.GetHealthPct()/100)
						caster.SetHealth(caster.GetMaxHealth()*(target.GetHealthPct()/100))
						target.SetHealth(tarHP)
				})
		}