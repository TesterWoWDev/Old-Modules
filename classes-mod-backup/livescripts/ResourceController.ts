import { powerUpdate } from "../shared/Messages";

const TABLE_NAME_POWERS= "playerPowers";

@CharactersTable
class PlayerPower extends DBTable {
	constructor(playerGUID: uint32) {
		super();
		this.playerGUID = playerGUID;
	}
	@PrimaryKey
	    playerGUID: uint32 = 0;
	@Field
	    powerCnt: uint32 = 0;
}
export function ResourceController(events:TSEventHandlers){
    events.Player.OnLogin((player,first)=>{
        player.SendData(new powerUpdate())
    })

}
export function addResource(player:TSPlayer,amountAdded:uint32,max:uint32){
    let pkt =  new powerUpdate()
    pkt.powerCnt = player.GetData().GetObject<PlayerPower>(TABLE_NAME_POWERS,new PlayerPower(player.GetGUIDLow())).powerCnt

    if(pkt.powerCnt <= max){
        let amt = pkt.powerCnt + amountAdded
        if(amt <= max){
            player.GetData().GetObject<PlayerPower>(TABLE_NAME_POWERS,new PlayerPower(player.GetGUIDLow())).powerCnt = amt
            pkt.powerCnt = amt
        }else{
            player.GetData().GetObject<PlayerPower>(TABLE_NAME_POWERS,new PlayerPower(player.GetGUIDLow())).powerCnt = max
            pkt.powerCnt = max
        }
    }
    player.SendData(pkt)
}

export function removeResource(player:TSPlayer,amountRemoved:uint32,max:uint32){
    let pkt =  new powerUpdate()
    pkt.powerCnt = getResource(player)
    if(pkt.powerCnt >= 0){
        let amt = pkt.powerCnt - amountRemoved
        if(amt >= 0 && amt <= max){
            player.GetData().GetObject<PlayerPower>(TABLE_NAME_POWERS,new PlayerPower(player.GetGUIDLow())).powerCnt = amt
            pkt.powerCnt = amt
        }else{
            player.GetData().GetObject<PlayerPower>(TABLE_NAME_POWERS,new PlayerPower(player.GetGUIDLow())).powerCnt = 0
            pkt.powerCnt = 0
        }
    }
    player.SendData(pkt)
}

export function getResource(player:TSPlayer):uint32{
    return player.GetData().GetObject<PlayerPower>(TABLE_NAME_POWERS,new PlayerPower(player.GetGUIDLow())).powerCnt
}