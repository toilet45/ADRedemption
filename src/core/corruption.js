export const CorruptionData = {
    get corruptions() {
       return player.mending.corruption;
    },
    corruptionChallenge: {
        get recordCorruptions() {
            return player.mending.corruptionChallenge.records;
        },
        get recordScore() {
            return player.mending.corruptionChallenge.recordScore;
        }
    },

    get isCorrupted() {
        return player.mending.corruptionChallenge.corruptedMend;
    },

    get nextCorrupted() {
        return player.mending.corruptNext;
    },

    get totalCorruptedFragments() {
        return player.corruptedFragments;
    },

    get availableCorruptedFragments() {
        return player.corruptedFragments.minus(player.mending.spentCF);
    },

    get spentCorruptedFragments() {
        return player.mending.spentCF;
    }
}