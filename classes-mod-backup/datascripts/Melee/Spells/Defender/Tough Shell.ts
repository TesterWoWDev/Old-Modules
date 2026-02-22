import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { DEFENDER_SKILL } from "../../Melee";
import { MELEE_SKILL_TRAINER } from "../MeleeTrainer";

const TOUGHSKINPROC = std.Spells.create(MODNAME, 'tough-skin-proc', 4111).SkillLines.add(DEFENDER_SKILL.ID).end;
TOUGHSKINPROC.Duration.set(12000,0,12000)
TOUGHSKINPROC.AuraDescription.enGB.set('Increased the Defender\'s armor by $s1')
TOUGHSKINPROC.Icon.set('Interface\\Icons\\ability_defend.blp')
TOUGHSKINPROC.Proc.Chance.set(101)
TOUGHSKINPROC.Effects.add()
    TOUGHSKINPROC.Effects.get(0).EffectType.setApplyAura()
    TOUGHSKINPROC.Effects.get(0).BasePoints.set(9)//change to adjust to where we want it
    TOUGHSKINPROC.Effects.get(0).DieSides.set(1)
    TOUGHSKINPROC.Effects.get(0).PointsPerLevel.set(10)
    TOUGHSKINPROC.Effects.get(0).ImplicitTargetA.setUnitCaster()
    TOUGHSKINPROC.Effects.get(0).AuraType.setModResistance()
    
    
const TOUGHSKIN = std.Spells.create (MODNAME,'tough-skin',4114).SkillLines.add(DEFENDER_SKILL.ID).AcquireMethod.set(0).end;
    MELEE_SKILL_TRAINER.Trainer.addSpell(TOUGHSKIN.ID,10,11)//CHANGE LATER
TOUGHSKIN.Name.enGB.set("Tough Skin")
TOUGHSKIN.Subtext.enGB.set("Passive")
TOUGHSKIN.Description.enGB.set('Has a chance to grant the Defender temporary armor upon taking melee damage')
TOUGHSKIN.AuraDescription.enGB.set('The Defender has gritted their teeth, and now will withstand more hits')
TOUGHSKIN.Icon.set('Interface\\Icons\\ability_defend.blp')
TOUGHSKIN.row.DurationIndex.set(21) //perma passive duration
TOUGHSKIN.Proc.TypeMask.set(8)//pull these from dbc itself -- col 35
TOUGHSKIN.Proc.Chance.set(100) // change this to balance it
TOUGHSKIN.SchoolMask.set(1)
TOUGHSKIN.Attributes.isPassive.check()
TOUGHSKIN.Effects.add()
    TOUGHSKIN.Effects.get(0).EffectType.setApplyAura()
    TOUGHSKIN.Effects.get(0).BasePoints.set(0)
    TOUGHSKIN.Effects.get(0).DieSides.set(0)
    TOUGHSKIN.Effects.get(0).ImplicitTargetA.setUnitCaster()
    TOUGHSKIN.Effects.get(0).AuraType.setProcTriggerSpell()
    TOUGHSKIN.Effects.get(0).TriggerSpell.set(TOUGHSKINPROC.ID)



