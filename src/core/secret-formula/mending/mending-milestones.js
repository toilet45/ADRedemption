export const mendingMilestones = {
  one: {
    mends: 1,
    reward: "Start with Infinity broken, all pre-Reality autobuyers maxed (kept in Doomed Reality), and the START perk. Gain multipliers to various resources (hover for details).",
    activeCondition: () => (true ? `${formatX(1e20,0)} IP, ${formatX(1000,0)} Replicanti Speed, ${formatX(100000,0)} EP, ${formatX(10000,0)} Eternities, ${formatX(100,0)} Dilated Time, ${formatX(5,0)} Perk Points, ${formatX(25,0)} Memory Gain, ${formatX(50, 0, )} Dark Energy Gain, ${formatX(5, 0)} Singularity Gain, ${formatX(1.1, 0, 1)} Remnant Gain, ${formatX(10, 0)} Reality Shard Gain` : "this is a bug if this text appears"),
  },
  two: {
    mends: 2,
    reward: "The Pelle-exclusive dilation upgrades are available outside of Doomed Reality (and also unlock the autobuyers for them), but they are nerfed outside of it. Dilation Autobuyers buy max.",
  },
  three: {
    mends: 3,
    reward: "Start every Mend with all perks, the rebuyable Reality Upgrade and Black Hole Autobuyers, Vacuum Acceleration, and both Black Holes unlocked and permanently active, with 3 power upgrades each.",
  },
  ten: {
    mends: 4,
    reward: "Teresa's container is no longer reset on Mend and Teresa, Effarig, Nameless, and V's Memories at Level 10",
  },
  four: {
    mends: 5,
    reward: "Remove all requirements for Reality/Imaginary Upgrades (except for Lai'tela,  Pelle and their Unlocks) and start with 5 of each rebuyable Reality Upgrade.",
  },
  five: {
    mends: 7,
    reward: "Gain 3 additional Glyph slots (disabled in Doomed Reality), and have the ability to equip TWO Effarig and Reality Glyphs each.",
  },
  seven: {
    mends: 8,
    reward: "Begin each Mend with Teresa's perk shop maxed, and gain an autobuyer which can automatically purchase and remove Music Glyphs.",
  },
  six: {
    mends: 10,
    reward: "You can now Mend outside of Doomed Reality.",
  },
  eleven: {
    mends: 15,
    reward: "Gain a Multiversal Remain multiplier based on lowest Glyph count during the entire Reality when you reach END antimatter this Mend.",
    activeCondition: () => (`Your current MvR multiplier from this milestone ${MendingMilestone.eleven.isReached ? "is":"would be"} ${formatX(mendingMilestoneElevenMultiplier(true),2 ,2)}, affected by Cursed Glyphs.`),
    // We dont define the effect here because this codebase will shit itself if you do, so we instead define it at the MvR code.
  },
  eight: {
    mends: 20,
    reward: "Unlock an autobuyer for non-rebuyable Reality and Imaginary Upgrades once you can afford them (includes Lai and Pelle unlocks)",
  }
};
