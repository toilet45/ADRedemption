export const kohlerQuotes = {
    postWarp: {
        id: 0,
        lines: [
            "...",
            "Hmm...",
            "That can't be good."
        ]
    },
    pelle75:{
        id: 1,
        requirement: () => Ra.pets.pelle.level >= 75,
        lines: [
            "...",
            "...They are progressing too fast.",
            "...need to slow them down."
        ]
    },
    pelle100:{
        id: 2,
        requirement: () => player.celestials.ra.quoteBits >= 131071 && Ra.totalPetLevel >= 700,
        lines: [
            "...Ok, it might be time to step in.",
            "I've been observing you Destroyer...",
            "No, this isn't Teresa talking...I've been watching you ever since you bested Pelle for the first time.",
            "It's finally time to reveal myself."
        ]
    }
}