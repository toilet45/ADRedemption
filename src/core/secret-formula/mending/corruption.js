export function corruptionChallengeScoreCalculation() {
    let corruptionScores = [1, 1.2, 1.45, 1.7, 2, 2.5, 3, 3.5, 4, 5, 7, 11]
    let finalScore = corruptionScores[player.mending.corruption[0]]
    for (let i = 1; i < 9; i++) {
        finalScore *= corruptionScores[player.mending.corruption[i]]
    }
    return finalScore
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
    }, // Yes in practise 1e-8, 1e-45, 1e-120, 1e-265, 1e-655, etc wouldve worked but whatever
    galWeak: {
        scaling: [1, 1.1, 1.3, 1.5, 2, 2.55, 4, 7, 12, 20, 50, 450],
        strength: [1, 0.98, 0.95, 0.85, 0.8, 0.725, 0.6, 0.4, 0.25, 0.1, 0.025],
    },
    compGlyphs: {
        level: [1, 0.99, 0.95, 0.9, 0.8, 0.75, 0.4, 0.4, 0.25, 0.2, 0.15, 0.05],
        rarity: [1, 0.99, 0.975, 0.95, 0.9, 0.75, 0.8, 0.5, 0.5, 0.4, 0.2, 0.1],
    },
    tickExtension: [1, 2.5, 10, 40, 220, 950, 3150, 9000, 25000, 100000, 5e5, 1e7, 1e12], //these are inverse powers, so 10 actually means ^(1/10), 1000 actually means ^(1/1000), etc
    atomDilution: [1, 0.7, 0.55, 0.4, 0.38, 0.35, 0.32, 0.3, 0.288, 0.27, 0.25, 0.2]
}