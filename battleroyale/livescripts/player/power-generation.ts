export function powerGeneration(events: TSEvents) {
    events.Unit.OnMeleeDamageLate((info, damage, type, index) => {//rage
        if (info.GetAttacker().GetClass() == UTAG("battle-royale", 'adventurer-class')) {
            let attacker = info.GetAttacker()
            let addRage: number = 0;
            let rageconversion: number = ((0.0091107836 * attacker.GetLevel() * attacker.GetLevel()) + 3.225598133 * attacker.GetLevel()) + 4.2652911;
            if (attacker.GetLevel() > 70)
                rageconversion += 13.27 * (attacker.GetLevel() - 70);
            addRage = (damage.get() / rageconversion * 7.5) / 2;
            attacker.SetPower(Powers.RAGE, attacker.GetPower(Powers.RAGE) + <uint32>(addRage * 10) + 1)
        }
        if (info.GetTarget().GetClass() == UTAG("battle-royale", 'adventurer-class')) {
            let target = info.GetTarget()
            let rageconversion: number = ((0.0091107836 * target.GetLevel() * target.GetLevel()) + 3.225598133 * target.GetLevel()) + 4.2652911;
            if (target.GetLevel() > 70)
                rageconversion += 13.27 * (target.GetLevel() - 70);
            let addRage: number = damage.get() / rageconversion * 2.5;
            // Berserker Rage effect
            if (target.HasAura(18499))
                addRage *= 2.0;
            target.SetPower(Powers.RAGE, target.GetPower(Powers.RAGE) + <uint32>(addRage * 10) + 1)
        }
    })
    events.Player.OnUpdateMaxPower((player, power, type, bonus) => {//runic power
        if (player.GetClass() == UTAG("battle-royale", 'adventurer-class'))
            if (type == Powers.RUNIC_POWER)
                power.set(1000 + bonus);
    })
}