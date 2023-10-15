import { corruptionChallengeScoreCalculation } from "../mending/corruption"

export const corruptionChallenge = {
    active: () => player.mending.corruption.countWhere(u => u > 0),
    /*
    bonus mult takes the nth nth simplical polytopic number.
    In simple terms:
    0 would be the first row (Basically an array of 1's, but we take 0 (special case))
    1 would be the second row (triangular numbers: 1, 3, 6, 10 ,15, 21 - we take 3 (second num))
    2 would be the third row (tetrahedral numbers: 1, 4, 10, 20, 35 - we take 10 (3rd num))
    3 would be the fourth row (pentachoron numbers: 1, 5, 15, 35, 70 - we take 35 (4th num))
    So on and so forth. List of them can be found https://oeis.org/wiki/Simplicial_polytopic_numbers
    */
    bonusMult: () => [0, 1, 3, 10, 35, 126, 462, 1716, 6435, 24310, 92378][Math.floor(Math.min(player.mending.corruption.countWhere(u => u > 0), player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) + 2))],
    incBonusText: () => {
        return "In order to increase your bonus multiplier, you should " + player.mending.corruption.countWhere(u => u > 0) > player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) + 2 ? "increase the number of corruptions active." : "increase the average level of your corruptions."
    },
    desc: () => {
        return player.mending.corruption.countWhere(u => u > 0) == 0 ? "You have not selected any corruptions, you cannot enter this challenge" : "Reach e9e15 antimatter and mend outside of doom while in a more difficult reality, in order to gain corrupted fragments."
    },
    reward: () => {
        return player.mending.corruptedFragments > (this.bonusMult * corruptionChallengeScoreCalculation) ? `If you completed this challenge, you would not gain any corrupted fragments, because ${this.active > 0 ? "you have no enabled corruptions." : "you have more corrupted fragments then you would gain."}` : `If you completed this challenge, you would gain ${quanifyInt("Corrupted Fragment", Math.floor((this.bonusMult * corruptionChallengeScoreCalculation) - player.mending.corruptedFragments))}.`
    },
    unlocked: () => { return Ra.pets.pelle.level >= 75}
}