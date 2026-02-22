const TABLE_NAME_KILLSTREAK = "playerkillstreak";
const auraSpells: TSArray<uint32> = [
    GetID("Spell", "minecraft-mod", "killstreak-spell-1"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-2"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-3"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-4"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-5"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-6"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-7"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-8"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-9"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-10"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-11"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-12"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-13"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-14"),
    GetID("Spell", "minecraft-mod", "killstreak-spell-15"),
];

@CharactersTable
class PlayerKillstreak extends DBEntry {
    constructor(playerGUID: uint32) {
        super();
        this.playerGUID = playerGUID;
    }
    @DBPrimaryKey
    playerGUID: uint32 = 0;
    @DBField
    killCount: int32 = 0;
}

export function Killstreaks(events: TSEvents) {
    events.Player.OnPVPKill((killer, killed) => {
        let killCount = killer.GetObject<PlayerKillstreak>(
            TABLE_NAME_KILLSTREAK,
            new PlayerKillstreak(killer.GetGUIDLow())
        ).killCount++;
        let pastKills = killed.GetObject<PlayerKillstreak>(
            TABLE_NAME_KILLSTREAK,
            new PlayerKillstreak(killed.GetGUIDLow())
        ).killCount;
        if (killCount % 5 == 0) {
            let m = (killCount / 5) | 0;
            if (m <= auraSpells.length) {
                if (m > 0) {
                    killer.RemoveAura(auraSpells[m - 1]);
                }
                killer.AddAura(auraSpells[m], killer);
            }
        }
        if (pastKills > 5) {
           // killer.ModifyHonor(pastKills*5)
            SendWorldMessage("|cffff0000[KillTracker] " + killer.GetName() + "|r Has ENDED |cffff0000"+killed.GetName() + "|r's killstreak of "+(pastKills+1))
        } else {
            SendWorldMessage("|cffff0000[KillTracker] " + killer.GetName() + "|r Has Murdered |cffff0000"+killed.GetName() + "|r In Cold Blood. Now on a killstreak of "+(killCount+1))
        }

        killed.GetObject<PlayerKillstreak>(
            TABLE_NAME_KILLSTREAK,
            new PlayerKillstreak(killed.GetGUIDLow())
        ).killCount = 0;
        killer
            .GetObject<PlayerKillstreak>(
                TABLE_NAME_KILLSTREAK,
                new PlayerKillstreak(killer.GetGUIDLow())
            )
            .Save();
        killed
            .GetObject<PlayerKillstreak>(
                TABLE_NAME_KILLSTREAK,
                new PlayerKillstreak(killed.GetGUIDLow())
            )
            .Save();
    });
}
