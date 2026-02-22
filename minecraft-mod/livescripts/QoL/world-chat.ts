const h = "|TInterface/icons/Inv_Misc_Tournaments_banner_Orc:20|t";
const a = "|TInterface/icons/Inv_Misc_Tournaments_banner_Human:20|t";
const g = "|TInterface/CHATFRAME/UI-ChatIcon-Blizz:20|t";
const colors = [
    "",
    "C79C6E",
    "F58CBA",
    "ABD473",
    "FFF569",
    "FFFFFF",
    "C41F3B",
    "0070DE",
    "69CCF0",
    "9482C9",
    "",
    "FF7D0A",
];

export function worldChat(events: TSEvents) {
    events.Player.OnCommand((player, command, found) => {
        if (
            command.get().startsWith("wc") ||
            command.get().startsWith("chat") ||
            command.get().startsWith("world")
        ) {
            found.set(true);
            let text = command.get().split(" ");
            let message = "";
            for (let i = 1; i < text.length; i++) {
                message += text[i] + " ";
            }
            let teamIcon = "";
            let faction = player.GetFaction();
            if (player.IsGM()) {
                teamIcon = g;
            } else if (faction == 0) {
                teamIcon = h;
            } else if (faction == 1) {
                teamIcon = a;
            }
            SendWorldMessage("[World] [" + teamIcon + "|cff" + colors[player.GetClass()]+ "|Hplayer:" + player.GetName() + "|h" + player.GetName() + "|h|r]: |cffffffff"+message+"|r")
        }
    });
}
