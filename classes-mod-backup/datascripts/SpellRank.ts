import { SQL } from "wotlkdata/sql/SQLFiles";

export function createAllSpellRank(spells: number[]){
		let firstRank = spells[0];
		for (let i=0;i<spells.length;i++){
				SQL.spell_ranks.add(firstRank,(i+1)).spell_id.set(spells[i])
		}
}

export function createSingleSpellRank(firstSpellID: number,CurSpellID: number,rankID: number){
				SQL.spell_ranks.add(firstSpellID,rankID).spell_id.set(CurSpellID)
}