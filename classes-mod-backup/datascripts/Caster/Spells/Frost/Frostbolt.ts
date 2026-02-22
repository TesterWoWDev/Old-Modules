import { std } from "tswow-stdlib";
import { MODNAME } from "../../../moduleName";
import { FROST_SKILL } from "../../Caster";
import { CASTER_SKILL_TRAINER } from "../CasterTrainer";

const FROSTBOLT = std.Spells.create (MODNAME,'frostbolt',61730).SkillLines.add(FROST_SKILL.ID).setAutolearn().end; //Frostbolt casts will add stacks of frostbite.
FROSTBOLT.Name.enGB.set('Frostbolt')
FROSTBOLT.Subtext.enGB.set('Basic Spell')
FROSTBOLT.AuraDescription.enGB.set('Freezing...')
FROSTBOLT.Description.enGB.set('Hurls a bolt of frost at your enemy, causing $s1 damage and slowing their movement speed by 15% (up to a maximum of 30%). Victims succumb to frostbite and take an additional 15% damage for every frost bolt up to a maximum of 100% increased damage taken.')
FROSTBOLT.Icon.set('Interface\\Icons\\spell_frost_chillingblast.blp')

const FROSTBITE = std.Spells.create (MODNAME,'frostbite',54996).SkillLines.add(FROST_SKILL.ID).end; //When players stack to 2 stacks of frostbite, they will become a frostbomb.
FROSTBITE.Name.enGB.set('Frostbite')
FROSTBITE.Subtext.enGB.set('Passive')
FROSTBOLT.AuraDescription.enGB.set('Movement speed decreased by $s1%.')
FROSTBITE.Description.enGB.set('Freezing... this enemies movement is slowed, and they are taking increased damage from frost spells.')
FROSTBITE.Icon.set('Interface\\Icons\\spell_shadow_darkritual.blp')

const FROSTBOMB = std.Spells.create (MODNAME,'frostbomb',54996).SkillLines.add(FROST_SKILL.ID).end; //Frostbomb will stack 4 times (up to +60% increased damage taken), so 15% per frostbolt.
FROSTBOMB.Name.enGB.set('Frostbomb')
FROSTBOMB.Subtext.enGB.set('Passive')
FROSTBOLT.AuraDescription.enGB.set('Damage taken increased by $s1%.')
FROSTBOMB.Description.enGB.set('This target has become frozen, shards of ice shatter and deal damage to surrounding allies whenever they are hit by a frostbolt.')
FROSTBOMB.Icon.set('Interface\\Icons\\spell_frost_frostward.blp')

const SHATTER = std.Spells.create (MODNAME,'shatter',54996).SkillLines.add(FROST_SKILL.ID).end; //Shatter is the explosion from Frostbomb at 4 stacks that does mass AoE Damage.
SHATTER.Name.enGB.set('Shatter')
SHATTER.Subtext.enGB.set('Passive')
SHATTER.Description.enGB.set('A shard of ice fractured from a frostbomb, this deals substantial aoe damage.')
SHATTER.Icon.set('Interface\\Icons\\spell_fire_blueflamebolt.blp')

FROSTBOLT.Effects.clearAll()
FROSTBOLT.CastTime.set(1250,0,1250)
FROSTBOLT.Range.set(0,35,0,35)
FROSTBOLT.Effects.add()
FROSTBOLT.Visual.cloneFromSpell(61730)
    FROSTBOLT.Effects.get(0).EffectType.setSchoolDamage()
    FROSTBOLT.Effects.get(0).BasePoints.set(100)
    FROSTBOLT.Effects.get(0).DieSides.set(35)
    FROSTBOLT.Effects.get(0).PointsPerLevel.set(1)
    FROSTBOLT.Effects.get(0).ImplicitTargetA.setDestTargetEnemy()
    FROSTBOLT.Effects.get(0).BonusMultiplier.set(1)

FROSTBITE.Effects.clearAll()
    FROSTBITE.Stacks.set(2)
    FROSTBITE.Effects.add()
        FROSTBITE.Effects.get(0).EffectType.setApplyAura()
        FROSTBITE.Duration.set(8000,0,8000)
        FROSTBITE.Effects.get(0).AuraType.setModDecreaseSpeed()
        FROSTBITE.Effects.get(0).BasePoints.set(-16)
        FROSTBITE.Effects.get(0).DieSides.set(1)

FROSTBOMB.Effects.clearAll()
        FROSTBOMB.Stacks.set(4)
        FROSTBOMB.Effects.add()
            FROSTBOMB.Effects.get(0).EffectType.setApplyAura()
            FROSTBOMB.Duration.set(10000,0,10000)
            FROSTBOMB.Effects.get(0).AuraType.setModDamagePercentTaken()
            FROSTBOMB.Effects.get(0).BasePoints.set(14)
            FROSTBOMB.Effects.get(0).DieSides.set(1)

SHATTER.Effects.clearAll()
    SHATTER.Effects.add()
        SHATTER.Effects.get(0).EffectType.setSchoolDamage()
        SHATTER.Effects.get(0).BasePoints.set(25)
        SHATTER.Effects.get(0).DieSides.set(5)
        SHATTER.Effects.get(0).ImplicitTargetA.setUnitDestAreaAlly()
        SHATTER.Effects.get(0).Radius.set(10,0,10)

