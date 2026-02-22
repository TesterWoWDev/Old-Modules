const colorAuras = [
    0,//trash
    0,//common
    61894,//uncommon
    17327,//rare
    50596,//epic
    22580,//legendary
]

let creatureID = GetID('creature_template', 'death-loot', 'npc_death_loot')//31005
//24417(working, misasing geosets)

const invToEquip = CreateDictionary<uint32, uint32>({
    1: EquipmentSlots.HEAD,
    2: EquipmentSlots.NECK,
    3: EquipmentSlots.SHOULDERS,
    4: EquipmentSlots.BODY,//shirt?
    5: EquipmentSlots.CHEST,
    6: EquipmentSlots.WAIST,
    7: EquipmentSlots.LEGS,
    8: EquipmentSlots.FEET,
    9: EquipmentSlots.WRISTS,
    10: EquipmentSlots.HANDS,
    16: EquipmentSlots.BACK,
})

export function deathLoot(events: TSEvents) {
    events.Creatures.OnGenerateLoot((creature, killer) => {
        if (killer.IsInGroup())//solo only
            return
        let loot = creature.GetLoot();
        addGoldLootCreature(creature.GetLootRecipient(), creature, loot.GetMoney())
        let itemCount = loot.GetItemCount()
        if (itemCount > 0) {
            let angle = 0
            let variant = 3.6 / itemCount
            for (let i = 0; i < itemCount; i++) {
                addItemLootCreature(creature.GetLootRecipient(), creature, loot.GetItem(i), i, angle)
                angle += variant
            }
        }
        //clears inventory so no loot
        loot.SetMoney(0)
        loot.Filter(() => false)
    })
}

function addGoldLootCreature(killer: TSPlayer, creature: TSCreature, goldAmount: uint32) {
    if (goldAmount <= 0)
        return
    let c = killer.SpawnCreature(GetID('creature_template', 'death-loot', 'npc_death_loot'), creature.GetX(), creature.GetY(), creature.GetZ(), 0, 8, 30000)
    const TSPosition = c.GetRelativePoint(Math.random() * 2 + 1, Math.random() * 3.6);
    c.MoveTo(1, TSPosition.x, TSPosition.y, TSPosition.z, true)
    c.SetUInt('goldCount', goldAmount)
    c.SetUInt('playerguid', killer.GetGUID())
    addGoldCollision(c)
}

function addGoldCollision(c: TSCreature) {
    c.AddCollision('gold', 0.2, 0, 0, (self, collided, cancel, entry) => {
        if (collided.IsPlayer()) {
            if (collided.GetGUID() == self.GetUInt('playerguid')) {
                collided.ToPlayer().ModifyMoney(self.GetUInt('goldCount', 0))
                self.ToCreature().DespawnOrUnsummon(0)
            }
        }
    })
}

function addItemLootCreature(killer: TSUnit, creature: TSCreature, item: TSLootItem, index: uint32, angle: float) {
    const TSPosition = creature.GetRelativePoint(Math.random() * 3 + 2, angle);
    let c = killer.SpawnCreature(creatureID, TSPosition.x, TSPosition.y, TSPosition.z, 0, 8, 30000)
    let itemProper = CreateItem(item.GetItemID(), 1)
    let iclass = itemProper.GetClass()
    let itemID = item.GetItemID()
    c.AddAura(5384, c)
    if (iclass == 4 || iclass == 2) {
        c.SetDisplayID(40000)
        let outfit = CreateOutfit(-1, 0)
         outfit.SetFace(55)
        // outfit.SetHairColor(55)
        // outfit.SetHairStyle(55)
        //outfit.SetSkin(14)
        outfit.SetDisplayID(40001)
        let invType = itemProper.GetInventoryType()
        if (invType == 11 || invType == 12)//trinket and ring
        {
            c.SetDisplayID(40000)
        } else if (iclass == 2) {//weapon
            outfit.SetMainhand(itemID)
        } else if (invType == 23 || invType == 14) {//tome or shield
            outfit.SetOffhand(itemID)
        } else {//armor
            outfit.SetItem(invToEquip[invType], itemID)
        }
        c.SetOutfit(outfit)
    } else {//anything not equipable
        c.SetDisplayID(40000)
    }

    if (itemProper.GetQuality() > 1) {
        let cc = c.SpawnCreature(24417, TSPosition.x, TSPosition.y, TSPosition.z, 0, 8, 30000)
        cc.SetScale(0.3)
        cc.SetUInt('playerguid', killer.GetGUID())
        addColorCollision(cc)
        cc.AddAura(colorAuras[itemProper.GetQuality()], cc)
    }
    c.SetUInt('itemid', itemID)
    c.SetUInt('itemcount', item.GetCount())
    c.SetUInt('playerguid', killer.GetGUID())

    addItemCollision(c, index)
}

function addItemCollision(c: TSCreature, index: uint32) {
    c.AddCollision('item-' + index, 0.2, 500, 0, (self, collided) => {
        if (collided.IsPlayer()) {
            if (collided.GetGUID() == self.GetUInt('playerguid')) {
                let player = collided.ToPlayer()
                let item = player.AddItem(self.GetUInt('itemid', 0), self.GetUInt('itemcount', 1))
                if (item.IsNull()) {
                    player.SendAreaTriggerMessage('You do not have enough space in your inventory.')
                }
                else {
                    self.ToCreature().DespawnOrUnsummon(0)
                }
            }
        }
    })
}

function addColorCollision(c: TSCreature) {
    c.AddCollision('color', 0.2, 500, 0, (self, collided) => {
        if (collided.IsPlayer()) {
            if (collided.GetGUID() == self.GetUInt('playerguid')) {
                self.ToCreature().DespawnOrUnsummon(0)
            }
        }
    })
}

