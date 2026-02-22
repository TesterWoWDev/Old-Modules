import { returnItemIDWithLevel } from "../item-creation/item-create/item-create-lib";

const maxLevel = 60;

const mythicSpell: number = GetID("Spell", 'wardonic-mod', "map-mythic-level-spell")
const gobStart: number = UTAG('wardonic-mod', 'mythic-start-gob')
const mythicKeys: TSArray<uint32> = TAG('wardonic-mod', 'mythic-keys')
const tagAllDungeonMob = [1];//TAG('wardonic-mod', 'all-mythic-mobs')
const tagAllDungeonBoss = [1];//TAG('wardonic-mod', 'all-mythic-bosses')



export function mythicBuffs(events: TSEvents) {
    setupCreatureBuffEvents(events, tagAllDungeonMob)
    setupBossLoot(events, tagAllDungeonBoss)

    events.GameObject.OnGossipSelect(gobStart, (obj, player, menu, selectionID, cancel) => {
        obj.Despawn()
        player.GetMap().SetUInt('prestige', getKeyLevel(player))
        player.GetMap().SetUInt('mythicOwnerGUID', player.GetGUIDLow())
        checkLevelAndSpawn(player)
        //start a timer?
        //require a point total?
    })

    events.Map.OnPlayerLeave((map, player) => {
        if (map.GetUInt('mythicOwnerGUID', 0) == player.GetGUIDLow()) {
            map.GetCreatures().forEach((creature, index, arr) => {
                creature.DespawnOrUnsummon(1)
            })
            map.GetGameObjects().forEach((gob, index, arr) => {
                gob.Despawn()
            })
            if (map.GetUInt('prestige', 0) > 1)
                player.AddItem(mythicKeys[map.GetUInt('prestige') - 1], 1)
        }
    })
}

function setupCreatureBuffEvents(events: TSEvents, creatures: TSArray<number>) {
    for (let i = 0; i < creatures.length; i++) {
        events.Creature.OnCreate(creatures[i], (creature, cancel) => {
            addPrestigeBuffToCreature(creature)
        })
        events.Creature.OnReachedHome(creatures[i], (creature) => {
            addPrestigeBuffToCreature(creature)
        })
    }
}

function setupBossLoot(events: TSEvents, creatures: TSArray<number>) {
    for (let i = 0; i < creatures.length; i++) {
        events.Creature.OnGenerateLoot((creature, killer) => {
            let loot = creature.GetLoot()
            loot.SetGeneratesNormally(false)
            loot.Clear()
            creature.GetPlayersInRange(150, 0, 0).forEach((player, index, array) => {
                let genItem = returnItemIDWithLevel(creature.GetLevel() + player.GetMap().GetUInt('prestige', 0))
                loot.AddItem(genItem, 1, 1, loot.GetLootType())
            })
        })
    }
}

function getKeyLevel(player: TSPlayer): uint32 {
    for (let i = 0; i < mythicKeys.length; i++)
        if (player.HasItem(mythicKeys[i], 1, false)) {
            player.RemoveItemByEntry(mythicKeys[i], 1)
            return i
        }
    return 0
}

function addPrestigeBuffToCreature(mob: TSCreature) {
    let map = mob.GetMap()
    let prestige = map.GetUInt('prestige', 0)
    mob.CastCustomSpell(mob, mythicSpell, true, prestige, prestige, prestige)//, CreateItem(0, 1), mob.GetGUID()
}

function checkLevelAndSpawn(player: TSPlayer) {
    let creatures = player.GetMap().GetCreatures()
    for (let i = 0; i < creatures.length; i++) {
        if (creatures[i].IsDead())
            creatures[i].Respawn()
        if (creatures[i].GetLevel() < maxLevel) {
            //give creatures some sort of buff?
            creatures[i].SetLevel(maxLevel)
        }
    }
}
