import { attemptToComplete, questInfoID, questInfo } from "../shared/Messages";

export function customQuest() {
    let shown = false;

    let mframe = CreateFrame("Frame", "customQuest", UIParent);
    mframe.SetWidth(256);
    mframe.SetHeight(160);
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
    //mframe.SetBackdropColor(0, 0, 0, 0);
    // let frametex = mframe.CreateTexture('', 'BACKGROUND')
    // frametex.SetTexture("Interface\\AchievementFrame\\UI-Achievement-Parchment")
    // frametex.SetAllPoints(mframe)
    // frametex.SetPoint("CENTER", 0, 0)
    mframe.Hide();

    let exitButn = CreateFrame("Button", "exitBtn", mframe);
    exitButn.SetPoint("TOPRIGHT", mframe, "TOPRIGHT", -5, -5);
    exitButn.SetWidth(32);
    exitButn.SetHeight(32);
    let exittex = exitButn.CreateTexture("", "BACKGROUND");
    exittex.SetTexture("Interface\\BUTTONS\\UI-Panel-MinimizeButton-Up.blp");
    exittex.SetAllPoints(exitButn);
    exittex.SetPoint("CENTER", 0, 0);
    exitButn.HookScript("OnClick", (frame, evName, btnDown) => {
        shown = false;
        mframe.Hide();
    });

    let showBtn = CreateFrame("Button", "showBtn", UIParent);
    showBtn.SetWidth(22);
    showBtn.SetHeight(22);
    showBtn.SetPoint("TOPRIGHT", -5, -85);
    let showTex = showBtn.CreateTexture("", "BACKGROUND");
    showTex.SetTexture("Interface\\BUTTONS\\UI-GroupLoot-Dice-Up.blp");
    showTex.SetAllPoints(showBtn);
    showBtn.HookScript("OnClick", (frame, evName, btnDown) => {
        if (shown) {
            shown = false;
            mframe.Hide();
        } else {
            shown = true;
            mframe.Show();
        }
    });

    let nameText = mframe.CreateFontString("", "OVERLAY", "QuestTitleFont");
    nameText.SetText("Sidequest");
    nameText.SetPoint("TOP", mframe, "TOP", 0, -15);

    let progressText = mframe.CreateFontString("", "OVERLAY", "QuestFont");
    progressText.SetText("");
    progressText.SetPoint("TOP", nameText, "TOP", 0, -20);

    let descriptionText = mframe.CreateFontString("", "OVERLAY", "QuestFont");
    descriptionText.SetText("");
    descriptionText.SetPoint("TOP", progressText, "TOP", 0, -20);
    descriptionText.SetWidth(mframe.GetWidth() - 50);
    descriptionText.SetJustifyH("CENTER");

    let completeButton = CreateFrame("Button", "", mframe);
    completeButton.SetSize(96, 32);
    completeButton.SetPoint("BOTTOMRIGHT", mframe, "BOTTOMRIGHT", -15, 5);
    let completeTex = completeButton.CreateTexture("", "BACKGROUND");
    completeTex.SetTexture("Interface\\BUTTONS\\UI-DialogBox-Button-Up");
    completeTex.SetAllPoints(completeButton);
    let completeText = completeButton.CreateFontString(
        "",
        "OVERLAY",
        "GameTooltipText"
    );
    completeText.SetText("Complete");
    completeText.SetPoint("CENTER", 0, 5);
    completeButton.HookScript("OnClick", (frame, evName, btnDown) => {
        let pkt = new attemptToComplete(0);
        pkt.write().Send();
    });
    completeButton.Show();

    let rewardButton = CreateFrame("Button", "", mframe);
    rewardButton.SetPoint("BOTTOMLEFT", mframe, "BOTTOMLEFT", 15, 13);
    rewardButton.SetWidth(40);
    rewardButton.SetHeight(40);
    let rewardTex = rewardButton.CreateTexture("tex1", "BACKGROUND");
    rewardTex.SetTexture("");
    rewardTex.SetAllPoints(rewardButton);
    let rewardCount = rewardButton.CreateFontString(
        "",
        "OVERLAY",
        "GameTooltipText"
    );
    rewardCount.SetText("");
    rewardCount.SetPoint("BOTTOMRIGHT", rewardButton, "BOTTOMRIGHT", -5, 5);

    OnCustomPacket(questInfoID, (packet) => {
        mframe.Show();
        let msg = new questInfo(0, 0, 0, 0, "", "", 0, 0);
        msg.read(packet);
        updateQuestInfo(
            msg.reqType,
            msg.reqID,
            msg.reqCountTotal,
            msg.reqCountCur,
            msg.reqName,
            msg.reqDescription,
            msg.rewID,
            msg.rewCount
        );
    });

    function updateQuestInfo(
        reqType: number,
        reqID: number,
        reqCountTotal: number,
        reqCountCur: number,
        reqName: string,
        reqDescription: string,
        rewID: number,
        rewCount: number
    ) {
        if (reqID > 0) {
            let s = "Kill ";
            if (reqType == 1) {
                s = "Loot ";
            }
            if (reqCountCur >= reqCountTotal) {
                reqCountCur = reqCountTotal;
                //completeButton.Show()
                completeButton.SetNormalTexture(
                    "Interface\\Buttons\\UI-DialogBox-Button-Up"
                );
                //highlight complete button?
            } else {
                //completeButton.Hide()
                completeButton.SetNormalTexture(
                    "Interface\\Buttons\\UI-DialogBox-Button-Disabled"
                );
                //grey complete button?
            }
            progressText.SetText(
                s + reqName + ": " + reqCountCur + "/" + reqCountTotal
            );
            descriptionText.SetText(reqDescription);
            rewardCount.SetText(rewCount + "");
            rewardTex.SetTexture(GetItemIcon(rewID));
            rewardButton.HookScript("OnEnter", (self) => {
                GameTooltip.ClearLines();
                GameTooltip.SetOwner(rewardButton, 'ANCHOR_CURSOR');
                GameTooltip.SetHyperlink("item:" + rewID);
                GameTooltip.Show();
            });
            rewardButton.HookScript("OnLeave", () => {
                GameTooltip.Hide();
            });

            //setup icon for item, send cache of item from server
        } else {
            progressText.SetText("You have no quest!");
            descriptionText.SetText("");
            rewardCount.SetText("");
            rewardTex.SetTexture("");
            rewardButton.HookScript("OnEnter", (self) => null);
            rewardButton.HookScript("OnLeave", () => null);
            //completeButton.Hide()
        }
    }
}
