export function reviveFix(events: TSEvents) {
    events.MapID.OnPlayerEnter(725, (map, player) => {
        if(player.IsDead())
        player.ResurrectPlayer(75, false);
    });
}
