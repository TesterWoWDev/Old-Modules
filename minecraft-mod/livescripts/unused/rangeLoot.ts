export function rangeLoot(events: TSEvents) {
    events.Player.OnCreatureKill((player, corpse) => {
        let inRange = corpse.GetCreaturesInRange(10, 0, 0, 2);
        let corpseLoot = corpse.GetLoot();
        for (let i = 0; i < inRange.length; i++) {
            if (!inRange[i].GetLootRecipient().IsNull())
                if (
                    inRange[i].GetLootRecipient().GetGUIDLow() == player.GetGUIDLow() ||
                    inRange[i].GetLootRecipientGroup().GetGUID() ==
                    player.GetGroup().GetGUID()
                ) {
                    let curCorpse = inRange[i].GetLoot();
                    corpse
                        .GetLoot()
                        .SetMoney(corpse.GetLoot().GetMoney() + curCorpse.GetMoney());
                    for (let j = 0; j < curCorpse.GetItemCount(); j++) {
                        let item = curCorpse.GetItem(j);
                        let ID = item.GetItemID();
                        let count = item.GetCount();
                        corpseLoot.AddItem(ID, count, count);
                    }
                    curCorpse.Clear();
                    //make curCorpse unlootable
                }
        }
    });
}
