import { std } from "wow/wotlk";
import { MODNAME } from "../../modname";
import { mobOne } from "./dungeon-1-mobs";


export let MiniBossBurdenofKnowledge = std.Spells.create(MODNAME,"minibossburdenofknowledge-spell",23187);
MiniBossBurdenofKnowledge.Name.enGB.set("Burden of Knowledge");
MiniBossBurdenofKnowledge.AuraDescription.enGB.set("Increases the time between attacks by $s2%.");
MiniBossBurdenofKnowledge.Description.enGB.set("Deals $s1 Frost damage to all enemies, drains $s3 mana and increases the time between attacks by $s2% for $d.");
MiniBossBurdenofKnowledge.CastTime.setSimple(3000)
MiniBossBurdenofKnowledge.Duration.setSimple(10000)
MiniBossBurdenofKnowledge.Effects.get(0).PointsBase.set(649);
MiniBossBurdenofKnowledge.Effects.get(0).PointsDieSides.set(140);
MiniBossBurdenofKnowledge.Effects.get(0).Radius.set(35);
MiniBossBurdenofKnowledge.Effects.get(1).PointsBase.set(-401);
MiniBossBurdenofKnowledge.Effects.get(1).PointsDieSides.set(1);
MiniBossBurdenofKnowledge.Effects.get(1).Radius.set(35)

export let MiniBossTouchofDeathDamage = std.Spells.load(57548);
MiniBossTouchofDeathDamage.Name.enGB.set("Death Touch");
MiniBossTouchofDeathDamage.Effects.get(0).PointsBase.set(199)
MiniBossTouchofDeathDamage.Effects.get(0).PointsDieSides.set(1)
export let MiniBossTouchofDeath = std.Spells.create(MODNAME,"minibosstouchofdeath-spell",57547);
MiniBossTouchofDeath.Name.enGB.set("Touch of Death");
MiniBossTouchofDeath.Description.enGB.set("Inflicts $57548s1 Shadow damage every $t1 sec for $d.");
MiniBossTouchofDeath.Stacks.set(100)
MiniBossTouchofDeath.CastTime.setSimple(2000);
MiniBossTouchofDeath.Duration.setSimple(7000)

export let MiniBossSummonSpell = std.Spells.create(MODNAME,"minibosssummonspell-spell",66705);
MiniBossSummonSpell.Name.enGB.set("Call Ally");
MiniBossSummonSpell.Description.enGB.set("Summons miniature mobs to assist the caster.");
MiniBossSummonSpell.Effects.get(0).PointsBase.set(2)
MiniBossSummonSpell.Effects.get(0).PointsDieSides.set(1)
MiniBossSummonSpell.Effects.get(0).MiscValueA.set(mobOne.ID)
MiniBossSummonSpell.Duration.setSimple(35000);
MiniBossSummonSpell.CastTime.setSimple(2000);

export let TorghastMiniBoss1 = std.CreatureTemplates.create(MODNAME,"torghastminiboss1",8912);
TorghastMiniBoss1.Name.enGB.set("Volgathok the Acrhivist");
TorghastMiniBoss1.Scale.set(1);
TorghastMiniBoss1.FactionTemplate.set(48);
TorghastMiniBoss1.Level.set(21, 21);
TorghastMiniBoss1.Rank.BOSS.set();
TorghastMiniBoss1.UnitClass.PALADIN.set();
TorghastMiniBoss1.DamageSchool.Normal.set();
TorghastMiniBoss1.Stats.ArmorMod.set(30);
TorghastMiniBoss1.Stats.DamageMod.set(4);
TorghastMiniBoss1.Stats.HealthMod.set(12);
TorghastMiniBoss1.Stats.ManaMod.set(50);
TorghastMiniBoss1.Stats.ExperienceMod.set(5);

TorghastMiniBoss1.InlineScripts.OnJustEnteredCombat((creature, target) => {
    function attemptCast(spellID: number,self: TSCreature,target: TSUnit,force: boolean) {
        if (!self.IsCasting() || force) {
            if (target.IsPlayer()) {
                self.CastSpell(target, spellID, false);
            } else {
                self.CastSpell(self.GetNearestPlayer(50, 1, 0), spellID, false);
            }
        }
    }
    //start of combat
    creature.CastSpell(target,GetID("Spell", "minecraft-mod", "minibossburdenofknowledge-spell"),true);
    //start of timers
    creature.AddNamedTimer("event1", 3000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "minibosstouchofdeath-spell"),self,target,false);
    });
    creature.AddNamedTimer("event2", 13000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "minibosssummonspell-spell"),self,target,false);
    });
});

TorghastMiniBoss1.InlineScripts.OnDeath((creature, killer) => {
    creature.RemoveTimer("event1");
    creature.RemoveTimer("event2");
});

TorghastMiniBoss1.InlineScripts.OnReachedHome((creature) => {
    creature.RemoveTimer("event1");
    creature.RemoveTimer("event2");
});