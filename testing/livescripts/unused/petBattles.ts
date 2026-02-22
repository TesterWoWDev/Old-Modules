const TABLE_NAME_PETBATTLE = "playerpetbattle";

class PetBattle {
    selfGUID: uint32 = 0;//self guid for combat(0 if not in combat)
    targetGUID: uint32 = 0;//targetGUID for combat(0 if not in combat)
    currentPet: uint32 = 0;//current chosen pet creatureID
    cooldowns: TSArray<uint32> = <TSArray<uint32>>[0, 0, 0];//cooldowns for current pet(0 if not in combat)
    constructor() {
        this.selfGUID = 0;
        this.targetGUID = 0;
        this.currentPet = 0;
        this.cooldowns = <TSArray<uint32>>[0,0,0]
    }
}
export function petBattles(events:TSEvents)
{
    // GetIDTag('testing-mod','pet-battle-spells').forEach((val,i,r)=>{
    //     events.SpellID.OnCast(val, (spell) => {
    //         let pet = spell.GetCaster().ToCreature()
    //         let petInfo: PetBattle = pet.GetOwner().ToPlayer().GetObject<PetBattle>(TABLE_NAME_PETBATTLE, new PetBattle())
    //         let enemyPet = pet.GetMap().GetCreatureByDBGUID(petInfo.targetGUID)
    //         if (enemyPet.IsNull()) {
    //             //give win to player, enemy pet is not found
    //         } else {
    //             let spellinfo = spell.GetSpellInfo()
    //             let eff0 = spellinfo.GetEffect(0)
    //             if (eff0.GetMechanic() == 0) {//normal damage
    //                 pet.DealDamage(enemyPet, eff0.GetBasePoints(), false, spellinfo.GetSchool())
    //                 petInfo.cooldowns[eff0.GetAmplitude()] = eff0.GetDieSides()
    //             } else if (eff0.GetMechanic() == 1) {//normal heal
    //                 pet.DealHeal(pet, spellinfo.GetEntry(), eff0.GetBasePoints(), false)
    //                 petInfo.cooldowns[eff0.GetAmplitude()] = eff0.GetDieSides()
    //             }
    //             //checkwin
    //             //endTurn
    //         }
    //     })
    // })
}

function startPVEFight(player1: TSPlayer) {
    let p1Info = player1.GetObject<PetBattle>(TABLE_NAME_PETBATTLE, new PetBattle())
    
    let p1pet = player1.SpawnCreature(p1Info.currentPet,player1.GetX(),player1.GetY(),player1.GetZ(),player1.GetO(),8,0)
    let p2pet = player1.SpawnCreature(player1.GetVictim().GetEntry(),player1.GetX()+10,player1.GetY(),player1.GetZ(),player1.GetO()/2,8,0)

    p1Info.targetGUID = p2pet.GetGUID()
    p1Info.selfGUID = p1pet.GetGUID()
    p1Info.cooldowns = <TSArray<uint32>>[0, 0, 0]
}

function startPVPFight(player1: TSPlayer, player2: TSPlayer) {
    if (player1.IsNull() || player2.IsNull())
        return;
    let p1Info = player1.GetObject<PetBattle>(TABLE_NAME_PETBATTLE, new PetBattle())
    let p2Info = player2.GetObject<PetBattle>(TABLE_NAME_PETBATTLE, new PetBattle())

    let p1pet = player1.SpawnCreature(p1Info.currentPet,player1.GetX(),player1.GetY(),player1.GetZ(),player1.GetO(),8,0)
    let p2pet = player2.SpawnCreature(p2Info.currentPet,player2.GetX(),player2.GetY(),player2.GetZ(),player2.GetO(),8,0)

    p1Info.targetGUID = p2pet.GetGUID()
    p1Info.selfGUID = p1pet.GetGUID()
    p1Info.cooldowns = <TSArray<uint32>>[0, 0, 0]

    p2Info.targetGUID = p1pet.GetGUID()
    p2Info.selfGUID = p2pet.GetGUID()
    p2Info.cooldowns = <TSArray<uint32>>[0, 0, 0]
}
