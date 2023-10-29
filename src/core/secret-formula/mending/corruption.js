export function corruptionChallengeScoreCalculation() {
    let corruptionScores = [1, 1.2, 1.45, 1.7, 2, 2.5, 3, 3.5, 4, 5, 7, 11]
    let finalScore = corruptionScores[Player.mending.corruption[0]]
    for (i = 1; i < 9; i++) {
        finalscore *= corruptionScores[Player.mending.corruption[i]]
    }
};

export const corruptionPenalties = {
    prestigeLimits: [1, 0.85, 0.55, 0.35, 0.15, 0.06, 0.02, 0.01, 0.005, 0.001, 1/2e4, 1/3e5],
    dimLimits: {
        preNerf: [1, 0.85, 0.55, 0.35, 0.15, 0.06, 0.02, 0.01, 0.005, 0.001, 1/2e4, 1/3e5],
        postNerf: [1, 0.98, 0.915, 0.8, 0.6, 0.5, 0.3, 0.2, 0.15, 0.1, 0.06, 0.03]
    },
    timeCompression: {
        power: [1, 0.95, 0.8, 0.65, 0.5, 0.35, 0.3, 0.05, 0.01, 0, 0, 0],
        mult: [1, new Decimal(1).div(1e8), new Decimal(1).div(1e45), new Decimal(1).div(1e120), new Decimal(1).div(1e265), new Decimal(1).div("1e655"), new Decimal(1).div("1e1275"), new Decimal(1).div("1e2250"), new Decimal(1).div("1e5000"), new Decimal(1).div("1e15000"), new Decimal(1).div("1e65000"), new Decimal(1).div("1e450000")],
    },
    galWeak: {
        scaling: [1, 1.1, 1.3, 1.5, 2, 2.55, 4, 7, 12, 20, 50, 450],
        strength: [1, 0.98, 0.95, 0.85, 0.8, 0.725, 0.6, 0.4, 0.25, 0.1, 0.025],
    },
    compGlyphs: {
        level: [1, 0.99, 0.95, 0.9, 0.8, 0.75, 0.4, 0.4, 0.25, 0.2, 0.15, 0.05],
        rarity: [1, 0.99, 0.975, 0.95, 0.9, 0.75, 0.8, 0.5, 0.5, 0.4, 0.2, 0.1],
    },
}