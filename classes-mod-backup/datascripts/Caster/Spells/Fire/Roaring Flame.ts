import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FIRE_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

export const ROARINGFLAME = std.Spells.create(MODNAME,'roaring-flame',6161).SkillLines.add(FIRE_SKILL.ID).AcquireMethod.set(0).end;
    CASTER_SKILL_TRAINER.Trainer.addSpell(ROARINGFLAME.ID,10,69)//CHANGE LATER

ROARINGFLAME.Name.enGB.set('Roaring Flame')
ROARINGFLAME.Subtext.enGB.set('')
ROARINGFLAME.Description.enGB.set('Unleashes a torrent of Dragon Fire, dealing $s1 Fire Damage per second for $d1 seconds. This spell applies Ignite to all enemies hit.') //can change the %
ROARINGFLAME.AuraDescription.enGB.set('Dragon Fire bathes this target, dealing $s1 every second')
ROARINGFLAME.Icon.set('Interface\\Icons\\ability_warlock_fireandbrimstone.blp')
///ROARINGFLAME.Visual.Kits.Cast.AnimID.set(53)
///ROARINGFLAME.Visual.Kits.Channel.AnimID.set(124)
//ROARINGFLAME.Visual.cloneFromVisual(14755, true) //note, this has to be the visual ID, not the spell id 
ROARINGFLAME.Duration.set(4000,0,4000)
ROARINGFLAME.Range.HostileMax.set(35)
ROARINGFLAME.Power.setMana(20,5)
ROARINGFLAME.Cooldown.set(60000,0,0,0)

ROARINGFLAME.Effects.add()
    ROARINGFLAME.Effects.get(0).EffectType.setSchoolDamage()
    ROARINGFLAME.Effects.get(0).BasePoints.set(119)
    ROARINGFLAME.Effects.get(0).DieSides.set(1)
    ROARINGFLAME.Effects.get(0).ImplicitTargetA.setUnitConeEnemy24()
    ROARINGFLAME.Effects.get(0).Radius.set(30,0,30)
    ROARINGFLAME.Effects.get(0).ClassMask.A.set(12582935)

ROARINGFLAME.Effects.add()
    ROARINGFLAME.Effects.get(1).EffectType.setApplyAura
    ROARINGFLAME.Effects.get(1).BasePoints.set(120)
    ROARINGFLAME.Effects.get(1).DieSides.set(1)
    ROARINGFLAME.Effects.get(1).AuraType.setPeriodicDamage()
    ROARINGFLAME.Effects.get(1).MiscValueA.set(10)
    ROARINGFLAME.Effects.get(1).ImplicitTargetA.setUnitConeEnemy24()
    ROARINGFLAME.Effects.get(1).ClassMask.A.set(12582935)
