import {
    requestClassSpellsMessage,
    sendClassSpellsMessage,
    sendClassSpellsMessageID,
} from "../shared/Messages";

export function toBeLearnedSpellsPane() {
    let curSpells = [];
    let mframe = CreateFrame("Frame", "spellpane", UIParent);
    mframe.SetWidth(512);
    mframe.SetHeight(768);
    mframe.SetPoint("CENTER", -100, 0);
    mframe.EnableMouse(true);
    mframe.RegisterForDrag("LeftButton");
    mframe.SetMovable(true);
    mframe.SetScript("OnDragStart", (self) => {
        self.StartMoving();
    });
    mframe.SetScript("OnDragStop", (self) => {
        self.StopMovingOrSizing();
    });
    mframe.SetBackdrop({
        bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true,
        tileSize: 22,
        edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 },
    });
    mframe.SetBackdropColor(0, 0, 0, 1);
    mframe.Hide();

    let exitButn = CreateFrame("Button", "", mframe);
    exitButn.SetPoint("TOPRIGHT", mframe, "TOPRIGHT");
    exitButn.SetWidth(50);
    exitButn.SetHeight(50);
    let exittex = exitButn.CreateTexture("", "BACKGROUND");
    exittex.SetTexture("Interface\\BUTTONS\\UI-Panel-MinimizeButton-Up.blp");
    exittex.SetAllPoints(exitButn);
    exittex.SetPoint("CENTER", 0, 0);
    exitButn.HookScript("OnClick", (frame, evName, btnDown) => {
        mframe.Hide();
    });

    new requestClassSpellsMessage(0).write().Send();
    OnCustomPacket(sendClassSpellsMessageID, (packet) => {
        let customPacket = new sendClassSpellsMessage(0, 0);
        customPacket.read(packet);
        curSpells[customPacket.level].push(customPacket.spellID);
    });
}
