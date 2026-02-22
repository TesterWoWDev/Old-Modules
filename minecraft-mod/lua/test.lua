TSEvents.Player:OnLogin(function (player,first) 
    player:SendBroadcastMessage("Hello from lua 1")
    player:SendAreaTriggerMessage("Hello from lua 1")
end)

local function OnPlayerLogin(player,first)
    player:SendBroadcastMessage("Hello from lua 2")
    player:SendAreaTriggerMessage("Hello from lua 2")
end
TSEvents.Player:OnLogin(OnPlayerLogin)
