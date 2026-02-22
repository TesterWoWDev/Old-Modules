import { ID } from "../../../ID"

export function HealthLink(events: TSEventHandlers) {
		let spellID = ID.CLASSES_MOD_HEALTH_LINK
				events.SpellID.OnCast(spellID,(spell)=>{
						const caster = spell.GetCaster().ToUnit()
						const target = spell.GetTarget().ToUnit()
						const averagePCT = (caster.GetHealthPct()+target.GetHealthPct())/200//200 because its 2*100, 2 for average, 100 to turn 100% into multiplier of 1
						const tarHP = target.GetMaxHealth()*averagePCT
						caster.SetHealth(caster.GetMaxHealth()*averagePCT)
						target.SetHealth(tarHP)
				})
		}