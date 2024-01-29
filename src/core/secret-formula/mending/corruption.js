export function corruptionChallengeScoreCalculation() {
    let corruptionScores = [1, 1.2, 1.45, 1.7, 2, 2.5, 3, 3.5, 4, 5, 7, 11]
    let finalScore = corruptionScores[player.mending.corruption[0]]
    for (let i = 1; i < 9; i++) {
        finalScore *= corruptionScores[player.mending.corruption[i]]
    }
    return finalScore
};

// These nerfs make no sense on their own, so ill explain them here:
// (Hidden nerfs exist for balancing purposes, and hidden just means they arent directly shown on the tab, not that they dont show at all)
// Prestige Limits: 1 nerf: All prestige currencies are ^x
// Dimensional Limits: 1 nerf: All dimensions are ^x, and even stronger w/o pelle 90
// Time Compression: 4 Nerfs:
//                   Power - Game time recieves an exponent
//                   Multiplier - Game time then recieve a multiplier (or divisor)
//                   IP gain - Beyond TC3, IP gain will recieve an exponent (hidden)
//                   AD mult nerf - Beyond TC7, AD will recieve an exponent (hidden) 
// Galactic Weakness: 5 Nerfs:
//                   Scaling - Galaxies scale faster
//                   Power - Galaxies are less effective
//                   Dimboost Cap - Beyond GW2, dimboosts will recieve a hardcap
//                   GS mult - Beyond GW5, gamespeed recieves an exponent nerf (hidden)
//                   IPo Conversion - Beyond GW7, infinity power conversion recieves a divisor (hidden)
// Complex Glyphs: 4 Nerfs:
//                   Level - Level recieves a power effect
//                   Rarity - Rarity recieves a power effect
//                   Forced Cursed Glyphs - Beyond CG3, some glyph slots will be forced cursed glyphs (hidden)
//                   Alchemy Effectiveness - Beyond CG6, alchemy is disabled (hidden)
// Tick Extension: 3 Nerfs:
//                   Power - Tickspeed recieves an exponent
//                   Shard Scaling - Time shards are less efficient
//                   No Triads - Beyond TE5, Triads cannot be purchased (hidden)
// Atom Dilution: 1 Nerf: AM gain exponent ^x
// Theory of Dilation: 4 Nerfs:
//                   Power - DT and TP gain a power effect
//                   Divisor - DT gains a divisor
//                   TT cost - Beyond ToD4, TT costs scale faster (hidden)
//                   Dimension scaling - Beyond ToD7, dimension cost scaling gains an exponent
// Replicative Singularities: 5 Nerfs:
//                   Replicanti: Replicanti gains a power exponent
//                   Singularity mult - Singularity recieves a multiplier (or divisor)
//                   DM mult - DM gain gains a mult (or div) (hidden)
//                   Prestige Gain - Prestige gain recieves an exponent (hidden)
//                   Rebuyable disablers - Beyond RS4, rebuyable upgrades are disabled (hidden)
// Study of Forever: 5 Nerfs:
//                   TT cost - TT cost is more expensive
//                   TT disabled - TT generation from glyphs is disabled
//                   TD nerf - TD gain an exponent
//                   Triad Disabler - Beyond SoF3, Triad studies are disabled and some studies recieve heavy nerfs (hidden)
//                   Uncharged Infinity - Beyond SoF7, Charged upgrades are disabled and so are EC rewards (hidden)
export const corruptionPenalties = {
    prestigeLimits: [1, 0.85, 0.55, 0.35, 0.15, 0.06, 0.02, 0.01, 0.005, 0.001, 5e-4, 3e-5],
    dimLimits: {
        preNerf: [1, 0.85, 0.55, 0.35, 0.15, 0.06, 0.02, 0.01, 0.005, 0.001, 5e-4, 3e-5],
        postNerf: [1, 0.98, 0.915, 0.8, 0.6, 0.5, 0.3, 0.2, 0.15, 0.1, 0.06, 0.03]
    },
    timeCompression: {
        power: [1, 0.95, 0.8, 0.65, 0.5, 0.35, 0.3, 0.05, 0.01, 0, 0, 0], // Yes in practise 1e-8, 1e-45, 1e-120, 1e-265, 1e-655, etc wouldve worked but whatever
        mult: [1, new Decimal(1).div(1e8), new Decimal(1).div(1e45), new Decimal(1).div(1e120), new Decimal(1).div(1e265), new Decimal(1).div("1e655"), new Decimal(1).div("1e1275"), new Decimal(1).div("1e2250"), new Decimal(1).div("1e5000"), new Decimal(1).div("1e15000"), new Decimal(1).div("1e65000"), new Decimal(1).div("1e450000")],
        hiddenFour: [1, 1, 1, 1, 0.999, 0.995, 0.99, 0.98, 0.95, 0.8, 0.5, 0.1],
        hiddenEight: [1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.7, 0.5, 0.3]
    }, 
    galWeak: {
        scaling: [1, 1.1, 1.3, 1.5, 2, 2.55, 4, 7, 12, 20, 50, 450],
        strength: [1, 0.98, 0.95, 0.85, 0.8, 0.725, 0.6, 0.4, 0.25, 0.1, 0.025],
        hiddenThree: [1e15, 1e15, 1e15, 1e8, 1e7, 999999, 88888, 7777, 666, 55, 4, 3],//so that I realize default cap is 1e15--sxy
        hiddenSix: [1, 1, 1, 1, 1, 1, 0.99, 0.96, 0.9, 0.7, 0.4, 0.1],
        hiddenEight: [1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 6, 9]
    },
    compGlyphs: {
        level: [1, 0.99, 0.95, 0.9, 0.8, 0.75, 0.4, 0.4, 0.25, 0.2, 0.15, 0.05],
        rarity: [1, 0.99, 0.975, 0.95, 0.9, 0.8, 0.8, 0.5, 0.5, 0.4, 0.2, 0.1],//below 0.7 will freeze the game, investigating--sxy
        hiddenFour: [0, 0, 0, 0, 1, 1, 2, 2, 3, 4, 6, 8],
        hiddenSeven: [false, false, false, false, false, false, false, true, true, true, true, true] // Dumb, i know, but atleast its clearly defined HERE and not around the place
    },
    tickExtension: [1, 2.5, 10, 40, 220, 950, 3150, 9000, 25000, 100000, 5e5, 1e7, 1e12], //these are inverse powers, so 10 actually means ^(1/10), 1000 actually means ^(1/1000), etc
    atomDilution: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.35, 0.3, 0.275, 0.25, 0.2],
    toD: {
        power: [1, 0.65, 0.33, 0.19, 0.1, 0.045, 0.02, 0.006, 0.002, 0, 0],
        mult: [1, 1e-2, 1e8, new Decimal(1e-22), new Decimal(1e-65), new Decimal(1e-185), new Decimal(1e-300), new Decimal("1e-1500"), new Decimal("1e-7777"), new Decimal("1e-98765"), 0, 0],
        hiddenFive: [1, 1, 1, 1, 1, 3, 12, 50, 500, 6000, 15000, 1e5],
        hiddenEight: [1, 1, 1, 1, 1, 1, 1, 1, 8, 75, 1050, 11752]
    },
    repSing: {
        rep: [1, 0.25, 0.05, 0.01, 0.004, 0.00065, 0.0001, 1e-5, 1e-8, 1e-20, 0, 0],
        sing: [1, 0.9, 0.75, 0.5, 0.325, 0.15, 0.01, 0.001, 1e-4, 1e-5, 1e-8, 0],
        dm: [1, 0.75, 0.5, 0.325, 0.15, 0.075, 0.001, 1e-4, 1e-6, 0, 0, 0],//Laitela is a place where vue display and actuall game number won't match. So like each dimensions' upgrade effect are in fact not exist. Better just dm pow.--sxy
        presGain: [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.5, 0.4, 0.25],
        hiddenFour: [false, false, false, false, false, true, true, true, true, true, true, true]
    },
    soF: {
        ttcost: [1, 1e10,1e20, 1e50, 1e75,1e100,1e125, 1e150, 1e200, 1e233, 1e267, 1e299], // wait did TT cost number or decimal?--sxy
        ttgen: [false, true, true, true, true, true, true, true, true, true, true, true], // the dumbest thing ive ever put in code but again, atleast its defined here so i dont have someone bitch about this later
        tdpow: [1, 0.7, 0.3, 0.08, 0.01, 3e-3, 1e-5, 1e-8, 1e-15, 1e-33, 1e-100, 0],
        hiddenThree: [false, false, false, false, true, true, true, true, true, true, true, true],
        hiddenEight: [false, false, false, false, false, false, false, false, true, true, true, true]
    },
}