export function zoneTeleport(events: TSEvents) {
    events.Player.OnUpdateZone((player, newZone, newArea) => {
        if (newZone != 490 && !player.IsGM()) {
            player.SendAreaTriggerMessage('Turn back, brave adventurer! The dangers that lurk beyond this point are not for the faint of heart.')
            player.Teleport(1, -6170.5, -1096.28, -211, 3.7)
        }
    })
}