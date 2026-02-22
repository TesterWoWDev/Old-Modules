export function allStats() {
    //create frame
    let itemArray = [];
    let allButtons = [];
    let page = 0;
    let columns = 4;
    let rows = 7;
    let shown = false;
    let aframe = CreateFrame('Frame', 'stats', PaperDollFrame);
    aframe.SetHeight(500)
    aframe.SetWidth(190)
    aframe.SetPoint("RIGHT")
    
    aframe.SetBackdrop({
        bgFile: "Interface\PaperDollInfoFrame\UI-Character-StatBackground",
        edgeFile: "Interface/DialogFrame/UI-DialogBox-Border",
        tile: true, tileSize: 22, edgeSize: 22,
        insets: { left: 4, right: 4, top: 4, bottom: 4 }
    });
    //

    //UnitStat("player",statID)//this returns the main 5 stats by id
}
