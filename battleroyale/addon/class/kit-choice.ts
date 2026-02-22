import { kitChoice, kitNames, kitTextures, kitTooltips, maxKitChoice, unlockKitInfo, unlockKitInfoID } from "../../shared/Messages"

const iconLocation = 'Interface\\Icons\\'
//dont touch
let currentKitChoices = []
let curKitID = 1

export function KitSelector() {
    let allButtons = []
    let mframe = CreateFrame("Frame", "KitSelector", UIParent)
    mframe.SetSize(350, 146 + (Math.floor(kitNames.length / 5) * 55))
    mframe.SetPoint("CENTER", -100, 0)
    mframe.EnableMouse(true)
    mframe.RegisterForDrag("LeftButton")
    mframe.SetMovable(true)
    mframe.SetScript("OnDragStart", (self) => {
        self.StartMoving()
    })
    mframe.SetScript("OnDragStop", (self) => {
        self.StopMovingOrSizing()
    })
    mframe.SetBackdrop({
        bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true,
        tileSize: 22,
        edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 },
    })
    mframe.SetBackdropColor(0, 0, 0, 1)
    mframe.Hide()

    let currentKit = CreateFrame("Button", 'curkit', mframe)
    currentKit.SetPoint("TOP", mframe, "TOP", 0, -25)
    currentKit.SetSize(64, 64)
    let curKitTexture = currentKit.CreateTexture("tex1", "BACKGROUND")
    curKitTexture.SetAllPoints(currentKit)
    curKitTexture.SetPoint("CENTER", 0, 0)

    let exitButn = CreateFrame("Button", "", mframe)
    exitButn.SetPoint("TOPRIGHT", mframe, "TOPRIGHT")
    exitButn.SetSize(50, 50)
    let exittex = exitButn.CreateTexture("", "BACKGROUND")
    exittex.SetTexture("Interface\\BUTTONS\\UI-Panel-MinimizeButton-Up.blp")
    exittex.SetAllPoints(exitButn)
    exittex.SetPoint("CENTER", 0, 0)
    exitButn.HookScript("OnClick", (frame, evName, btnDown) => {
        mframe.Hide()
    })

    function createButtons() {
        mframe.SetSize((currentKitChoices.length * 60) + 50, 200)
        for (let i = 0; i < currentKitChoices.length; i++) {
            let button = CreateFrame("Button", 'kit' + i, mframe)
            button.SetPoint("LEFT", mframe, "LEFT", 30 + (i * 60), -25)
            button.SetSize(50, 50)
            button.SetBackdrop({
                bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
                tile: true,
                tileSize: 22,
                edgeSize: 22,
                insets: { left: 4, right: 4, top: 4, bottom: 4 },
            })
            button.SetBackdropColor(0, 0, 0, 1)
            let tex = button.CreateTexture("tex1", "OVERLAY")
            tex.SetTexture(iconLocation + kitTextures[currentKitChoices[i]])
            tex.SetAllPoints(button)
            tex.SetPoint("CENTER", 0, 0)
            let text1 = button.CreateFontString("", "OVERLAY", "GameFontNormal")
            text1.SetPoint("BOTTOM", 0, -10)
            text1.SetText(kitNames[currentKitChoices[i]])
            button.SetID(currentKitChoices[i])

            button.HookScript("OnClick", () => {
                if (curKitID == 99) {
                    let pkt = new kitChoice(button.GetID())
                    pkt.write().Send()
                    curKitID = button.GetID()
                    curKitTexture.SetTexture(iconLocation + kitTextures[button.GetID() - 1])
                }
            })
            button.SetScript("OnEnter", function (self) {
                GameTooltip.SetOwner(self, "ANCHOR_BOTTOMRIGHT")
                GameTooltip.SetText(kitTooltips[button.GetID() - 1])
                GameTooltip.Show()
            })
            button.SetScript("OnLeave", function (self) {
                GameTooltip.Hide()
            })

            allButtons.push(button)
        }
    }

    function clearButtons() {
        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].Hide()
        }
        allButtons = []
    }

    OnCustomPacket(unlockKitInfoID, (pkt => {
        let pkta = new unlockKitInfo(0, [0], 0)
        pkta.read(pkt)
        currentKitChoices = pkta.currentUnlocks
        curKitID = pkta.currentKitChoice
        clearButtons()
        createButtons()
        mframe.Show()
    }))
}