export const kohlerProgress = {
  progressUnlocks: {
    kohlerUnlocked: {
      id: 0,
      progress: 5,
      condition: () => Ra.unlocks.kohlersRealmUnlock.isUnlocked,
      description: "You may have made it here Destroyer, but I have a few more tests...",
    },
    hostileScore: {
      id: 1,
      progress: 20,
      condition: () => {
        if (Ra.unlocks.kohlersRealmUnlock.isUnlocked && CorruptionData.corruptionChallenge.recordScore >= 50000000) return true;
        return false;
      },
      description: () => `Reach ${format(5e7)} Hostile score. Reward: Keep Charged Upgrades when not entering Hostile mend.`,
    },
    hostileFragments: {
      id: 2,
      progress: 35,
      condition: () => {
        if (Ra.unlocks.kohlersRealmUnlock.isUnlocked && CorruptionData.recordCorruptedFragments > 29) return true;
        return false;
      },
      description: () => `Reach 30 Hostile Fragments. Reward: Antimatter ^(1+best HF/100).`,
    },
    antimatterGalaxy: {
      id: 4,
      progress: 65,
      condition: () => {
        return false;
      },
      description: () => `Reach ${format(new Decimal("1e10000000000000000000000000"))} Antimatter. Reward: Tickspeed affect 1st Multiversal Dimension with ultra reduced rate. [NYI because of balancing]`,
    },
    placeholder: {
      id: 6,
      progress: 100,
      condition:false,
      description: "Now for the ultimate test...waiting 5 hours™.",
    }
  }
};
