export const CorruptionData = {
  corruptions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  corruptionChallenge: {
    recordCorruptions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    recordScore: 0,
    bGLwC: 0,
  },
  isCorrupted: false,
  nextCorrupted: false,
  corruptedFragments: 0,
  recordCorruptedFragments: 0,
  update() {
    this.corruptions = player.mending.corruption;
    this.corruptionChallenge.recordCorruptions = player.mending.corruptionChallenge.records;
    this.corruptionChallenge.recordScore = player.mending.corruptionChallenge.recordScore;
    this.isCorrupted = player.mending.corruptionChallenge.corruptedMend;
    this.nextCorrupted = player.mending.corruptionChallenge.corruptNext;
    this.corruptedFragments = player.mending.corruptedFragments;
    this.recordCorruptedFragments = Math.log2(player.mending.corruptionChallenge.recordScore);
  },
  calcBaseScore() {
    const corruptionScores = [1, 1.2, 1.45, 1.7, 2, 2.5, 3, 3.5, 4, 5, 7, 11];
    let finalScore = corruptionScores[player.mending.corruption[0]];
    for (let i = 1; i < 10; i++) {
      finalScore *= corruptionScores[player.mending.corruption[i]];
    }
    return finalScore;
  },
  calcScore(hasHU20 = CorruptionUpgrade(20).isBought) {
    let scoreCalc = this.calcBaseScore();
    if (scoreCalc === 1) return 1;
    // eslint-disable-next-line max-len
    scoreCalc *= [0, 1, 3, 10, 35, 126, 462, 1716, 6435, 24310, 92378][Math.floor(Math.max(1, Math.min(player.mending.corruption.countWhere(u => u > 0), (player.mending.corruption.reduce((partialSum, a) => partialSum + a, 0) / player.mending.corruption.countWhere(u => u > 0) - 1))))];
    if (hasHU20) {
      scoreCalc = Math.pow(scoreCalc, CorruptionUpgrade(20).effectValue);
    }
    return scoreCalc;
  }
};