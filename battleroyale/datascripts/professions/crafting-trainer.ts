import { std } from "wow/wotlk";
import { craftingProfession, craftingProfessionApprentice, craftingProfessionJourneyman, craftingProfessionMaster, MODNAME } from "./crafting-profession";

export const craftingTrainerCreature = std.CreatureTemplates
    .create(MODNAME, 'profession-trainer')
    .Models.addDefaultBear()
    .Name.enGB.set('Profession Trainer')
    .Subname.enGB.set('True Crafter')
    .NPCFlags.TRAINER.set(true)
    .NPCFlags.VENDOR.set(true)
    .NPCFlags.GOSSIP.set(true)
    .Spawns.add(MODNAME, 'profession-trainer-spawn', [
        { map: 0, x: 14743.259766, y: 14431.877930, z: 75.872963, o: 0.849769 },
    ])
    .Gossip.modNew(x => x
        .Text.add({ enGB: 'How can I help you?' })
        .Options.addMod(o => o
            .Icon.TRAINER.set()
            .Action.TRAINER.setOwner()
            .Text.setSimple({ enGB: 'Teach me the Crafting Profession' })
        )
        // .Options.addMod(o=>o
        //     .Icon.VENDOR.set()
        //     .Action.VENDOR.set()
        //     .Text.setSimple({enGB:'Let me browse your goods'})
        // )
    )

// Trainer: Rank spells
craftingTrainerCreature.Trainer.getRef().Spells
    .addGet(craftingProfessionApprentice.LearnSpells()[0].ID)

    craftingTrainerCreature.Trainer.getRef().Spells
    .addGet(craftingProfessionJourneyman.LearnSpells()[0].ID)
    .RequiredSkill.set(craftingProfession.ID, 50)
    .ReqAbilities.addId(craftingProfessionApprentice.ProfessionSpell().ID)

    craftingTrainerCreature.Trainer.getRef().Spells
    .addGet(craftingProfessionMaster.LearnSpells()[0].ID)
    .RequiredSkill.set(craftingProfession.ID, 100)
    .ReqAbilities.addId(craftingProfessionJourneyman.ProfessionSpell().ID)