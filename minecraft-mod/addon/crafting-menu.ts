import {
    craftMessage,
    empty,
    returnCraftItemMessage,
    returnCraftItemMessageID,
    showScreenID,
} from "../shared/Messages";

export function craftingMenu() {
    let choices: TSArray<TSArray<uint32>> = [
        empty,
        empty,
        empty,
        empty,
        empty,
        empty,
        empty,
        empty,
        empty,
    ];
    let itemIDs = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let buttons = [];
    let enchants = [0, 0, 0, 0];
    let latestBagSlot = empty;
    let frameToggleCheck = 0;
    let mframe = CreateFrame("Frame", "minecraftMframe", UIParent);
    mframe.SetWidth(300);
    mframe.SetHeight(400);
    mframe.EnableMouse(true);
    mframe.SetMovable(true);
    mframe.RegisterForDrag("LeftButton");
    mframe.SetScript("OnDragStart", (self, button) => {
        self.StartMoving();
    });
    mframe.SetScript("OnDragStop", (self, button) => {
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
    mframe.SetBackdropColor(0, 0, 0, 0.1);

    let mtex = mframe.CreateTexture("tex", "BACKGROUND");
    mtex.SetPoint("CENTER", mframe, "CENTER");
    mtex.SetSize(293, 393);
    mtex.SetTexture("Interface/AchievementFrame/UI-Achievement-StatsBackground");
    mframe.SetPoint("CENTER", 0, 0);
    mframe.Hide();
    let exitbutn = CreateFrame("Button", "exitbtn", mframe);
    exitbutn.SetPoint("TOPRIGHT", mframe, "TOPRIGHT", 0, 0);
    exitbutn.SetWidth(50);
    exitbutn.SetHeight(50);
    let extex = exitbutn.CreateTexture("exittex", "BACKGROUND");
    extex.SetTexture("Interface\\BUTTONS\\UI-Panel-MinimizeButton-Up.blp");
    extex.SetAllPoints(exitbutn);
    extex.SetPoint("CENTER", 0, 0);
    exitbutn.HookScript("OnClick", (frame, evName, btnDown) => {
        closeAll();
    });

    let craftBtn = CreateFrame("Button", "craftbtn", mframe);
    craftBtn.SetPoint("CENTER", mframe, "CENTER", 0, -80);
    craftBtn.SetWidth(150);
    craftBtn.SetHeight(60);
    let craftTex = craftBtn.CreateTexture("", "BACKGROUND");
    craftTex.SetTexture("Interface\\BUTTONS\\UI-DialogBox-Button-Up.blp");
    craftTex.SetAllPoints(craftBtn);
    craftTex.SetPoint("CENTER", 0, 0);
    let craftText = craftBtn.CreateFontString(
        "",
        "OVERLAY",
        "GameFontNormalHuge"
    );
    craftText.SetPoint("CENTER", 0, 10);
    craftText.SetText("Craft");
    craftBtn.HookScript("OnClick", (frame, evName, btnDown) => {
        PlaySoundFile("Sound\\Interface\\GM_ChatWarning.wav");
        updateProduct(1);
        choices = [empty, empty, empty, empty, empty, empty, empty, empty, empty];
        itemIDs = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        enchants = [0, 0, 0, 0];
        for (let i = 0; i < 9; i++) {
            buttons[i][2].SetTexture("");
            buttons[i][1].SetScript("OnEnter", null);
            buttons[i][1].SetScript("OnLeave", null);
        }
        showTex.SetTexture("");
        showText.SetText("");
    });
    let showBtn = CreateFrame("Button", "showframe", mframe);
    showBtn.SetSize(64, 64);
    showBtn.SetPoint("CENTER", mframe, "BOTTOM", 0, 60);
    showBtn.SetBackdrop({
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true,
        tileSize: 22,
        edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 },
    });
    showBtn.SetBackdropColor(0, 0, 0, 1);
    let showTex = showBtn.CreateTexture("", "BACKGROUND");
    showTex.SetTexture("");
    showTex.SetSize(60, 60);
    showTex.SetPoint("CENTER", 0, 0);
    let showText = showBtn.CreateFontString("", "OVERLAY", "GameFontNormalHuge");
    showText.SetPoint("BOTTOMRIGHT", -10, 10);
    showText.SetTextColor(1, 1, 1, 1);
    showText.SetText("");

    let frameToggle = CreateFrame("Button", "toggleframe", UIParent);
    frameToggle.SetSize(25, 25);
    frameToggle.SetPoint("CENTER", UIParent, "TOPRIGHT", -150, -50);
    let frameTex = frameToggle.CreateTexture("", "BACKGROUND");
    frameTex.SetTexture(
        "Interface/PAPERDOLLINFOFRAME/UI-EquipmentManager-Toggle"
    );
    frameTex.SetAllPoints();
    frameToggle.SetScript("OnClick", (frame, button, down) => {
        ClearCursor();
        if (mframe.IsShown()) {
            closeAll();
        }
        mframe.Show();
        buttonCreate();
    });

    function buttonCreate() {
        for (let i = 0; i < 9; i++) {
            let slot = CreateFrame("Button", i.toString(), mframe);
            slot.SetSize(64, 64);
            slot.SetPoint(
                "TOPLEFT",
                mframe,
                "TOPLEFT",
                50 + (slot.GetWidth() + 5) * Math.floor(i % 3),
                -40 - (slot.GetHeight() + 5) * Math.floor(i / 3)
            );
            slot.RegisterForClicks("AnyDown");
            slot.SetBackdrop({
                edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
                tile: true,
                tileSize: 22,
                edgeSize: 22,
                insets: { left: 4, right: 4, top: 4, bottom: 4 },
            });
            slot.SetBackdropColor(0, 0, 0, 1);

            let texture = slot.CreateTexture("", "BACKGROUND");
            texture.SetTexture("");
            texture.SetSize(60, 60);
            texture.SetPoint("CENTER", 0, 0);
            slot.SetScript("OnClick", (frame, button, down) => {
                if (button == "LeftButton") {
                    select(frame);
                    updateProduct(0);
                } else if (button == "RightButton") {
                    deselect(frame);
                    updateProduct(0);
                }
            });
            buttons.push([slot, texture]);
        }
    }
    function select(frame: WoWAPI.Frame) {
        let itemid = GetCursorInfo()[1];
        if (itemid != null) {
            let info = GetItemInfo(itemid);
            if (info != null) {
                buttons[Number(frame.GetName())][2].SetTexture(info[9]);
                let m = latestBagSlot;
                choices[Number(frame.GetName())] = m;
                itemIDs[Number(frame.GetName())] = itemid;
                let itemstring: string = GetCursorInfo()[2];

                buttons[Number(frame.GetName())][1].SetScript("OnEnter", (self) => {
                    GameTooltip.ClearLines();
                    GameTooltip.SetOwner(self, "ANCHOR_CURSOR");
                    GameTooltip.SetHyperlink(itemstring);
                    GameTooltip.Show();
                });
                buttons[Number(frame.GetName())][1].SetScript("OnLeave", () => {
                    GameTooltip.Hide();
                });

                if (frame.GetName() == "4") {
                    let arr = itemstring.split(":");
                    enchants = [
                        Number(arr[2]),
                        Number(arr[3]),
                        Number(arr[4]),
                        Number(arr[5]),
                    ];
                }
            }
        }
    }

    function deselect(frame: WoWAPI.Frame) {
        buttons[Number(frame.GetName())][2].SetTexture("");
        choices[Number(frame.GetName())] = empty;
        itemIDs[Number(frame.GetName())] = 0;
        buttons[Number(frame.GetName())][1].SetScript("OnEnter", null);
        buttons[Number(frame.GetName())][1].SetScript("OnLeave", null);
        GameTooltip.Hide();
    }

    function updateProduct(purchase: uint32) {
        new craftMessage(itemIDs, choices, purchase, enchants).write().Send();
    }

    OnCustomPacket(returnCraftItemMessageID, (packet) => {
        let message = new returnCraftItemMessage(0, 0, [0, 0, 0, 0, 0]);
        message.read(packet);
        if (message.craftItem != 0) {
            showTex.SetTexture(GetItemInfo(message.craftItem)[9]);
            if (message.craftItemCount == 0) {
                showText.SetText("");
            } else {
                showText.SetText(message.craftItemCount.toString());
            }
            showBtn.SetScript("OnEnter", (self) => {
                GameTooltip.ClearLines();
                GameTooltip.SetOwner(showBtn, "ANCHOR_CURSOR");
                GameTooltip.SetHyperlink(
                    "item:" +
                    message.craftItem +
                    ":" +
                    message.enchantNum[0] +
                    ":0:" +
                    message.enchantNum[1] +
                    ":" +
                    message.enchantNum[2] +
                    ":" +
                    message.enchantNum[3] +
                    ":" +
                    message.enchantNum[4] +
                    ":0"
                );
                GameTooltip.Show();
            });
            showBtn.SetScript("OnLeave", () => {
                GameTooltip.Hide();
            });
        } else {
            showTex.SetTexture("");
            showText.SetText("");
            showBtn.SetScript("OnEnter", null);
            showBtn.SetScript("OnLeave", null);
        }
    });

    Events.Item.OnDeleteItemConfirm(mframe, (itemname, qual, bond, questWarn) => {
        closeAll();
    });
    Events.MerchantFrame.OnMerchantShow(mframe, () => {
        closeAll();
    });
    Events.MerchantFrame.OnMerchantUpdate(mframe, () => {
        closeAll();
    });
    Events.Container.OnBagUpdate(mframe, (bagid) => {
        closeAll();
        if (frameToggleCheck == 1) {
            waiter(0.1);
            frameToggleCheck = 0;
        }
    });

    function closeAll() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i][1].Hide();
            buttons[i][1].SetScript("OnEnter", null);
            buttons[i][1].SetScript("OnLeave", null);
            buttons[i][2].SetTexture("");
        }
        showTex.SetTexture("");
        showText.SetText("");
        showBtn.SetScript("OnEnter", null);
        showBtn.SetScript("OnLeave", null);
        buttons = [];
        choices = [empty, empty, empty, empty, empty, empty, empty, empty, empty];
        itemIDs = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        mframe.Hide();
    }

    Events.Container.OnItemLocked(mframe, (bag, slot) => {
        if (mframe.IsShown()) {
            if (slot == null || bag == null) {
                closeAll();
                print("Put that item into your bags!");
            } else {
                latestBagSlot = [bag, slot];
            }
        }
    });

    OnCustomPacket(showScreenID, (packet) => {
        frameToggleCheck = 1;
    });

    let pasTime = 0;
    let waitFrame: WoWAPI.Frame = null;

    function waiter(delay) {
        waitFrame = CreateFrame("Frame", "WaitFrame", UIParent);
        waitFrame.SetScript("OnUpdate", function (self, elapse) {
            pasTime += elapse;
            if (delay <= pasTime) {
                frameToggle.Click();
                self.SetScript("OnUpdate", null);
                pasTime = 0;
            }
        });
    }
    //causing error
    let mat = "INV_Misc_WartornScrap_Plate";
    let gem = "INV_Misc_Gem_Diamond_01";
    let epulet = "INV_Armor_Shoulder_Plate_Naxxramas_RaidWarrior_C_01";
    let chain = "INV_Belt_18";
    let metal = "INV_Gizmo_MithrilCasing_01";
    let reinforcedMetal = "INV_Gizmo_MithrilCasing_02";
    let stick = "INV_Fishingpole_06";
    let string = "INV_Misc_Thread_01";
    //add in enchanting
    let dust = "INV_Enchant_DustArcane";
    let unrefinedGem = "INV_Enchant_ShardShadowfrostLarge";

    let recipes = [
        [mat, mat, mat, mat, "", mat, "", "", ""],
        [mat, chain, mat, mat, gem, mat, "", mat, ""],
        [epulet, "", epulet, mat, "", mat, "", "", ""],
        [mat, chain, mat, mat, mat, mat, "", "", ""],
        [mat, "", mat, mat, mat, mat, mat, mat, mat],
        ["", mat, "", mat, "", mat, "", mat, ""],
        [mat, "", mat, mat, "", mat, "", "", ""],
        ["", "", "", mat, mat, mat, "", "", ""],
        [mat, mat, mat, mat, "", mat, mat, "", mat],
        ["", "", "", mat, "", mat, mat, "", mat],
        ["", gem, "", mat, "", mat, "", mat, ""],
        ["", mat, "", mat, gem, mat, "", mat, ""],
        ["", metal, "", "", metal, "", "", stick, ""],
        ["", "", "", "", metal, metal, "", stick, ""],
        ["", "", "", "", metal, "", "", stick, metal],
        ["", "", "", "", metal, "", "", stick, ""],
        ["", reinforcedMetal, "", "", reinforcedMetal, "", "", stick, ""],
        ["", "", "", "", reinforcedMetal, reinforcedMetal, "", stick, ""],
        ["", "", "", "", reinforcedMetal, "", "", stick, reinforcedMetal],
        ["", "", reinforcedMetal, "", reinforcedMetal, "", stick, "", ""],
        ["", gem, "", "", stick, "", "", stick, ""],
        ["", stick, "", metal, "", metal, "", "", ""],
        ["", stick, "", "", string, stick, "", stick, ""],
        [stick, "", stick, "", reinforcedMetal, "", stick, "", stick],
        ["", dust, "", dust, unrefinedGem, dust, "", dust, ""],
        ["", "", "", stick, stick, "", gem, stick, ""],
        ["", "", "", "", gem, "", "", stick, ""],
        ["skipforblank"],
    ]; //maybe add a spot for enchant
    let recipeIcons = [
        "INV_Misc_Desecrated_PlateHelm",
        "INV_Jewelry_Necklace_06",
        "INV_Misc_Desecrated_PlateShoulder",
        "INV_Misc_Cape_19",
        "INV_Misc_Desecrated_PlateChest",
        "INV_Misc_Desecrated_PlateBracer",
        "INV_Misc_Desecrated_PlateGloves",
        "INV_Misc_Desecrated_PlateBelt",
        "INV_Misc_Desecrated_PlatePants",
        "INV_Misc_Desecrated_PlateBoots",
        "INV_Jewelry_Ring_03",
        "INV_Jewelry_Talisman_01",
        "INV_Sword_01",
        "INV_Mace_03",
        "INV_Axe_03",
        "INV_Weapon_ShortBlade_14",
        "INV_Sword_2H_Blacksmithing_03",
        "INV_Mace_84",
        "INV_Axe_60",
        "INV_Weapon_Halberd15",
        "INV_Staff_13",
        "INV_Weapon_Hand_01",
        "INV_Weapon_Bow_01",
        "INV_Shield_17",
        "INV_Enchant_FormulaEpic_01",
        "INV_Misc_Book_01",
        "INV_Wand_07",
    ];
    let mframeRecipe = CreateFrame("Frame", "mframerecipe", mframe);
    mframeRecipe.SetWidth(260);
    mframeRecipe.SetHeight(400);
    mframeRecipe.SetPoint("RIGHT", mframe, "LEFT");
    mframeRecipe.Hide();
    mframeRecipe.SetBackdrop({
        bgFile: "Interface/TutorialFrame/TutorialFrameBackground",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true,
        tileSize: 22,
        edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 },
    });
    mframeRecipe.SetBackdropColor(0, 0, 0, 0.1);

    let mtexRecipe = mframeRecipe.CreateTexture("recipetex", "BACKGROUND");
    mtexRecipe.SetPoint("CENTER", mframeRecipe, "CENTER");
    mtexRecipe.SetSize(mframeRecipe.GetWidth() - 7, mframeRecipe.GetHeight() - 7);
    mtexRecipe.SetTexture(
        "Interface/AchievementFrame/UI-Achievement-StatsBackground"
    );
    let exitbutnRecipe = CreateFrame("Button", "exitbtnrec", mframe);
    exitbutnRecipe.SetPoint("TOPLEFT", mframe, "TOPLEFT", 5, -5);
    exitbutnRecipe.SetWidth(50);
    exitbutnRecipe.SetHeight(50);
    let extexRecipe = exitbutnRecipe.CreateTexture("exittexrec", "BACKGROUND");
    extexRecipe.SetTexture("Interface\\Calendar\\EventNotification.blp");
    extexRecipe.SetAllPoints(exitbutnRecipe);
    extexRecipe.SetPoint("CENTER", 0, 0);
    exitbutnRecipe.HookScript("OnClick", (frame, evName, btnDown) => {
        if (mframeRecipe.IsShown()) {
            mframeRecipe.Hide();
        } else {
            mframeRecipe.Show();
        }
    });
    recipes.forEach((value, index) => {
        let button = CreateFrame("Button", "recipebut", mframeRecipe);
        button.SetSize(45, 45);
        button.SetPoint(
            "CENTER",
            mframeRecipe,
            "TOPLEFT",
            55 + (button.GetWidth() + 5) * Math.floor(index % 4),
            -50 - (button.GetHeight() + 5) * Math.floor(index / 4)
        );
        button.CreateTexture;
        let butRecipe = button.CreateTexture("tex", "BACKGROUND");
        butRecipe.SetAllPoints(button);
        butRecipe.SetTexture("Interface/Icons/" + recipeIcons[index]); //set to

        button.SetScript("OnClick", (frame, button, down) => {
            choices = [empty, empty, empty, empty, empty, empty, empty, empty, empty];
            itemIDs = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            enchants = [0, 0, 0, 0];
            latestBagSlot = empty;

            buttons.forEach((element, i) => {
                element[2].SetTexture("");
                element[2].SetTexture("Interface/Icons/" + value[i]);
                if (value[i] != "") {
                    let tooltip = "";
                    if (value[i] == mat) {
                        tooltip = "Material";
                    } else if (value[i] == gem) {
                        tooltip = "Gem";
                    } else if (value[i] == epulet) {
                        tooltip = "Epulet";
                    } else if (value[i] == chain) {
                        tooltip = "Chain";
                    } else if (value[i] == metal) {
                        tooltip = "Metal";
                    } else if (value[i] == reinforcedMetal) {
                        tooltip = "Reinforced Metal";
                    } else if (value[i] == stick) {
                        tooltip = "Stick";
                    } else if (value[i] == string) {
                        tooltip = "String";
                    } else if (value[i] == dust) {
                        tooltip = "Enchantment Dust";
                    } else if (value[i] == unrefinedGem) {
                        tooltip = "Enchantment Gem";
                    }
                    element[1].SetScript("OnEnter", (self) => {
                        GameTooltip.ClearLines();
                        GameTooltip.SetOwner(element[1], "ANCHOR_CURSOR");
                        GameTooltip.SetText(tooltip);
                        GameTooltip.Show();
                    });
                    element[1].SetScript("OnLeave", () => {
                        GameTooltip.Hide();
                    });
                } else {
                    element[1].SetScript("OnEnter", null);
                    element[1].SetScript("OnLeave", null);
                }
            });
        });
    });
}
