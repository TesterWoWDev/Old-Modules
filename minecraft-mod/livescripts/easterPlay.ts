export function easter(events: TSEvents) {

    events.Player.OnLogin((player, first) => {
        if (first) {
            player.SetLevel(20)
            let pclass = player.GetClass()
            if (pclass == 1 || pclass == 2 || pclass == 6 || pclass == 3 || pclass == 7) {
                player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-mat-mail'), 150)//base resource
            } else if (pclass == 4 || pclass == 11) {
                player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-mat-leather'), 150)//base resource
            } else if (pclass == 5 || pclass == 8 || pclass == 9) {
                player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-mat-cloth'), 150)//base resource
            }

            player.AddItem(GetID('item_template', 'minecraft-mod', 'string'), 3)//string
            player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-resource-metal'), 12)//metal
            player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-resource-stick'), 5)//stick
            player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-resource-pearl'), 10)//pearl
            player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-resource-epaulet'), 6)//epaulet
            player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-resource-chain'), 5)//chain
            player.AddItem(GetID('item_template', 'minecraft-mod', 'tier1-resource-reinforced-metal'), 12)//reinforced metal
            player.AddItem(21215,50)
            player.EquipItem(23162, 19)//bags
            player.EquipItem(23162, 20)
            player.EquipItem(23162, 21)
            player.EquipItem(23162, 22)
        }
    })

    events.GameObjectID.OnGossipHello(GetID("gameobject_template", "minecraft-mod", "torghaststartobj"), (obj, player, cancel) => {
        player.GossipClearMenu()
        player.GossipMenuAddItem(0, 'Off I Go', obj.GetGUIDLow(), 0, false, '', 0)
        player.GossipMenuAddItem(0, 'Not yet', obj.GetGUIDLow(), 1, false, '', 0)
        player.GossipSendMenu(5, obj, 1)
    })

    events.GameObjectID.OnGossipSelect(GetID("gameobject_template", "minecraft-mod", "torghaststartobj"), (obj, player, menuID, sel, cancel) => {
        if (sel == 0) {
            player.Teleport(726, 910, 157, 414, 0)
            player.GossipComplete()
        } else if (sel == 1) {
            player.GossipComplete()
        }
    })
}