import { CorruptionData } from "../../corruption"
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
    bonusMult: () => [0, 1, 3, 10, 35, 126, 462, 1716, 6435, 24310, 92378][Math.floor(Math.min(player.mending.corruption.countWhere(u => u > 0), player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0)/player.mending.corruption.countWhere(u => u > 0) - 1))],
    incBonusText: () => {
        return "In order to increase your bonus multiplier, you should " + (player.mending.corruption.countWhere(u => u > 0) < player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0)/player.mending.corruption.countWhere(u => u > 0) - 1 ? "increase the number of Hostilities active." : "increase the average level of your Hostilities."
        )
    },
    desc: () => {
        return player.mending.corruption.countWhere(u => u > 0) == 0 ? "You have not selected any Hostilities, you cannot enter this challenge" : "Reach e9e15 antimatter and Mend outside of Doom while in a more difficult Reality, in order to gain Hostile Fragments. All upgrades will be reset if you complete a reality with more Hostile Fragments then you are carrying."
    },
    reward: () => {
        return CorruptionData.corruptedFragments > (Math.log2(CorruptionData.calcScore())) ? (`If you completed this challenge, you would not gain any Hostile Fragments, because ${player.mending.corruption.countWhere(u => u > 0) == 0 ? "you have no enabled Hostilities." : "you have more Hostile Fragments then you would gain."}`) : `If you completed this challenge, you would gain ${quantifyInt("Hostile Fragment", (Math.ceil(Math.log2(CorruptionData.calcScore())) - player.mending.corruptedFragments))}.`
    },
    unlocked: () => { return Ra.pets.pelle.level >= 75}
}