export const statusBarsData = [
    { type: 'MANA', enabled: 0, color: [0, 0, 1], typeID: 0 },
    { type: 'RAGE', enabled: 1, color: [1, 0, 0], typeID: 1 },
    { type: 'ENERGY', enabled: 1, color: [1, 1, 0], typeID: 3 },
    { type: 'RUNIC', enabled: 0, color: [0, 0.82, 1], typeID: 6 }
];

let statusBars = []
let resourceBarFrame = CreateFrame("Frame", "powerBar", UIParent);
export function allPowers() {
    resourceBarFrame.SetPoint("CENTER", -100, 0);
    resourceBarFrame.EnableMouse(true);
    resourceBarFrame.RegisterForDrag("LeftButton");
    resourceBarFrame.SetMovable(true);
    resourceBarFrame.SetScript("OnDragStart", (self) => {
        self.StartMoving();
    });
    resourceBarFrame.SetScript("OnDragStop", (self) => {
        self.StopMovingOrSizing();
    });
    resourceBarFrame.SetBackdrop({
        bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true,
        tileSize: 22,
        edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 },
    });
    resourceBarFrame.SetBackdropColor(0, 0, 0, 1);
    resourceBarFrame.Show()

    resourceBarFrame.RegisterEvent("PLAYER_ENTERING_WORLD")
    resourceBarFrame.SetScript("OnUpdate", updateBars);
    resourceBarFrame.SetScript("OnEvent", (frame, event, arg1) => {
        if (event == "PLAYER_ENTERING_WORLD")
            onEnterWorld()
    })

    function onEnterWorld() {
        updateResourceBars()
    }
}

export function updateResourceBars() {
    let powerCount = statusBarsData[0].enabled + statusBarsData[1].enabled + statusBarsData[2].enabled + statusBarsData[3].enabled
    resourceBarFrame.SetSize(134, 8 + 22 * powerCount)

    statusBars.forEach((v, i, arr) => {
        v[1].Hide()
    })
    statusBars = []

    let i = 0;
    statusBarsData.forEach(data => {
        if (data.enabled == 1) {
            statusBars.push(createStatusBar(resourceBarFrame, data, i++));
        }
    });
    updateBars()
}

function updateBars() {
    for (let i = 0; i < statusBars.length; i++) {
        statusBars[i][2].SetText(UnitPower("player", statusBars[i][3]) + ' /' + UnitPowerMax("player", statusBars[i][3]))
        statusBars[i][1].SetMinMaxValues(0, UnitPowerMax("player", statusBars[i][3]))
        statusBars[i][1].SetValue(UnitPower("player", statusBars[i][3]))
    }
}

function createStatusBar(parentFrame: WoWAPI.Frame, statusBar: { type: string, enabled: number, color: number[], typeID: number }, index: number) {
    let ilvlStatusBar = CreateFrame("StatusBar", '', parentFrame)
    ilvlStatusBar.SetPoint("TOP", parentFrame, "TOP", 0, -8 - (index * 18))
    ilvlStatusBar.SetWidth(120)
    ilvlStatusBar.SetHeight(18)
    ilvlStatusBar.SetStatusBarTexture("Interface\\TARGETINGFRAME\\UI-StatusBar")
    ilvlStatusBar.SetStatusBarColor(statusBar.color[0], statusBar.color[1], statusBar.color[2], 1)

    let ilvlStatusBarBg = ilvlStatusBar.CreateTexture('', "BACKGROUND")
    ilvlStatusBarBg.SetTexture("Interface\\TARGETINGFRAME\\UI-StatusBar")
    ilvlStatusBarBg.SetAllPoints()
    //ilvlStatusBarBg.SetVertexColor(statusBar.color[0], statusBar.color[1], statusBar.color[2])
    ilvlStatusBarBg.SetVertexColor(0, 0, 0)

    let ilvlStatusBarValue = ilvlStatusBar.CreateFontString('', "OVERLAY")
    ilvlStatusBarValue.SetPoint("CENTER")
    ilvlStatusBarValue.SetFont("Fonts\\FRIZQT__.TTF", 12, "OUTLINE")
    return [ilvlStatusBar, ilvlStatusBarValue, statusBar.typeID]
}
