import { attemptTalentActionPacket, talentInformation, talentInformationID } from "../shared/Messages";

let buttonWidth = 48
let buttons = []

export function talentSystem() {
    let mframe = CreateFrame("Frame", "talentSystem", UIParent);
    mframe.SetWidth(256);
    mframe.SetHeight(512);
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
        bgFile: "Interface\\AchievementFrame\\UI-Achievement-Parchment",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: false,
        tileSize: 22,
        edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 },
    });

    let mframe_title = mframe.CreateFontString('', "OVERLAY", "GameFontNormal");
    mframe_title.SetFont("Fonts\\MORPHEUS.TTF", 18, "OUTLINE")
    mframe_title.SetPoint("TOP", 0, -20);
    mframe_title.SetText("Talent System");

    let mframe_close = CreateFrame("Button", "talentSystem_close", mframe, "UIPanelCloseButton");
    mframe_close.SetPoint("TOPRIGHT", -5, -5);

    let mframe_open = CreateFrame("Button", "talentSystem_open", UIParent);
    mframe_open.SetPoint("TOPRIGHT", 5, 5);
    mframe_open.SetSize(32, 32)
    mframe_open.SetNormalTexture("Interface\\Buttons\\UI-SpellbookIcon-NextPage-Up");
    mframe_open.SetScript("OnClick", () => {
        if (mframe.IsShown()) {
            mframe.Hide();
        } else {
            mframe.Show();
        }
    });

    let mframe_talentPoints = mframe.CreateFontString('', "OVERLAY", "GameFontNormal");
    mframe_talentPoints.SetPoint("BOTTOM", 0, 15);
    mframe_talentPoints.SetText("Unspent Talent Points: " + 0);
    

    function addTalentButton(talentId, row, column, spellID, currentRank, MaxRank) {
        let button = CreateFrame("Button", "talentSystem_button_" + spellID, mframe, "SecureActionButtonTemplate");
        button.SetSize(buttonWidth, buttonWidth);
        let info = GetSpellInfo(spellID);
        button.SetNormalTexture(info[2]);
        button.RegisterForClicks("AnyDown")
        button.SetPoint("TOPLEFT", buttonWidth + column * (buttonWidth + 8), -(row * (buttonWidth + 16)) - 64);

        let rankText = button.CreateFontString('', "OVERLAY", "GameFontNormal");
        rankText.SetPoint("BOTTOM", 0, -10);
        rankText.SetText(currentRank + "/" + MaxRank);

        button.SetScript("OnClick", (frame, button) => {
            if (button == "LeftButton") {
                print("Learned talent " + spellID + " (" + talentId + ")");
                AttemptTalentAction(talentId, 1);
            }
            else if (button == "RightButton") {
                print("Unlearned talent " + spellID + " (" + talentId + ")");
                AttemptTalentAction(talentId, 0);
            }
        })
        button.SetScript("OnEnter", () => {
            GameTooltip.SetOwner(button, "ANCHOR_RIGHT");
            GameTooltip.SetHyperlink("spell:" + spellID);
        });
        button.SetScript("OnLeave", () => {
            GameTooltip.Hide();
        });
        buttons.push(button)
    }

    function hideButtons() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].Hide();
        }
        buttons = []
    }

    function AttemptTalentAction(talentId: any, action: uint32) {//request a learn or unlearn
        let pkt = new attemptTalentActionPacket(talentId, action);
        pkt.write().Send()
    }

    OnCustomPacket(talentInformationID, (pack) => {//receive all pkt info
        hideButtons()
        let pkt = new talentInformation(1,1, []);
        pkt.read(pack);
        for (let i = 0; i < pkt.size; i++) {
            addTalentButton(pkt.info[i][0], pkt.info[i][1], pkt.info[i][2], pkt.info[i][3], pkt.info[i][4], pkt.info[i][5]);
        }
        updateTalentPoints(pkt.talentPoints);
    })

    function updateTalentPoints(talentPoints: number) {
        mframe_talentPoints.SetText("Unspent Talent Points: " + talentPoints);
    }
}

