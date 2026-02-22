import { Events, SendToServer } from "./lib/Events";
import { powerUpdate, resetFrame } from "../shared/Messages";

//life
const lifeItem = 100001
const maxLifeResource = 5
//death
const deathItem = 20880
const maxDeathResource = 5
let frames = []
let allButtons = []
let setup = false
let mframe = CreateFrame('Frame','test',UIParent);
    //mframe.Hide()

Events.AddOns.OnMessage(mframe,powerUpdate,(msg)=>{
    chooseUpdateFunction(msg)
})

Events.AddOns.OnMessage(mframe,resetFrame,(msg)=>{
    setup = false
    for(let i=0;i<frames.length;i++){
        frames[i].Hide()
    }
    frames = []
})

function chooseUpdateFunction(msg){
    if(GetItemCount(lifeItem,true,false) > 0){//life
        makeLifeFrame()
        updateLeaves(msg.powerCnt)
    }else if(GetItemCount(deathItem,true,false) > 0){//death
        makeDeathFrame()
        updateSouls(msg.powerCnt)
    }
}

//life
function makeLifeFrame(){
    if(!setup){
        let frame = CreateFrame('Frame','life',mframe)
        frame.SetWidth(240)
        frame.SetHeight(70)
        frame.SetBackdrop({bgFile : "Interface/TutorialFrame/TutorialFrameBackground", 
            edgeFile : "Interface/DialogFrame/UI-DialogBox-Border", 
            tile : true, tileSize : 22, edgeSize : 22, 
            insets : { left : 4, right : 4, top : 4, bottom : 4 }});
            frame.SetBackdropColor(0,0,0,1);
            frame.SetPoint("TOPLEFT",50,-100)

            frame.SetMovable(true)
            frame.EnableMouse(true)
            frame.Show()
        setup = true
        frames.push(frame)
    }
}

function updateLeaves(count){
    for(let i=0;i<allButtons.length;i++){
        allButtons[i].Hide()
    }
    allButtons = []

    for(let i=1;i<=maxLifeResource;i++){
        let lifeFrame: WoWAPI.Frame = frames[1]
        let button = CreateFrame("Button", "leaf"+i, lifeFrame)
            button.SetPoint("TOPLEFT", lifeFrame, "TOPLEFT", -13+(i*23),-8)
            button.SetWidth(20)
            button.SetHeight(20)
            let tex = button.CreateTexture('','BACKGROUND')
                tex.SetAllPoints(button)
                tex.SetPoint("CENTER",0,0)
            if(count > 0){
                tex.SetTexture("Interface\\BUTTONS\\UI-CheckBox-Check.blp")
                count--
            }else{
                tex.SetTexture("Interface\\BUTTONS\\UI-CheckBox-Check-Disabled.blp")
            }  
        allButtons.push(button)
    }
}

function makeDeathFrame(){
    if(!setup){
        let frame = CreateFrame('StatusBar','death',mframe)
        frame.SetPoint("TOPLEFT", UIParent, "TOPLEFT", 90, -75)
        frame.SetWidth(115)
        frame.SetHeight(15)
        frame.SetStatusBarTexture("Interface\\TARGETINGFRAME\\UI-StatusBar")
        frame.SetStatusBarColor(0, 0.65, 0,1)
        frame.SetMinMaxValues(0,maxDeathResource)

        // frame.RegisterForDrag("LeftButton")
        // frame.SetMovable(true)
        // frame.SetScript("OnDragStart",(frame,button)=>{
        //     frame.StartMoving()
        // })

        let border = CreateFrame("Frame", "dd", frame)
		border.SetPoint("CENTER",frame,"CENTER")
		border.SetWidth(120)
		border.SetHeight(20)
        border.SetBackdrop({bgFile : "", 
            edgeFile : "Interface/DialogFrame/UI-DialogBox-Border", 
            tile : true, tileSize : 5, edgeSize : 10, 
            insets : { left : 1, right : 1, top : 1, bottom : 1 }});
        
        let bg = frame.CreateTexture(null, "BACKGROUND")
		bg.SetTexture("Interface\\TARGETINGFRAME\\UI-StatusBar")
		bg.SetAllPoints()
		bg.SetVertexColor(0, 0.35, 0, 1)

        let value = frame.CreateFontString(null, "OVERLAY")
        value.SetPoint("CENTER", frame, "CENTER")
        value.SetFont("Fonts\\FRIZQT__.TTF", 12, "OUTLINE")
        value.SetShadowOffset(1, -1)
        value.SetTextColor(1, 1, 1)

        value.SetText(0+"/"+maxDeathResource)
        frame.SetValue(0)
        frame.Show()
        setup = true
        frames.push(frame)
        frames.push(value)
    }
}
function updateSouls(count){
   let frame: WoWAPI.StatusBar = frames[1]
   let value: WoWAPI.FontString = frames[2]
   frame.SetValue(count)
   value.SetText(count + "/" + maxDeathResource)
   
}

//test setup for greying out spells 
// let ActionBars = [ "Action", "MultiBarBottomLeft", "MultiBarBottomRight", "MultiBarRight", "MultiBarLeft" ]
// function findButtonByName(searchID){
//     for(let i=1;i<=60;i++){
//     let buttonName = ActionBars[Math.floor(i/12)] + "Button" + i
//         let actionInfo = GetActionInfo(i)
//         if (actionInfo[1] == "spell") {
//             let spellInfo = GetSpellInfo(actionInfo[2])
//             if(spellInfo[1] == searchID){
//                 return button
//             }
//         }
//     }
// }