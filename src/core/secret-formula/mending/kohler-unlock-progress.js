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
        if (Ra.unlocks.kohlersRealmUnlock.isUnlocked && CorruptionData.corruptionChallenge.recordScore >= 5000000) return true;
        return false;
      },
      description: () => `Reach ${format(5e6)} Hostile score. Reward: Keep Charged Upgrades when not entering Hostile mend.`,
    },
    hostileFragments: {
      id: 2,
      progress: 35,
      condition: () => {
        if (Ra.unlocks.kohlersRealmUnlock.isUnlocked && CorruptionData.recordCorruptedFragments > 39) return true;
        return false;
      },
      description: () => `Reach 40 Hostile Fragments. Reward: Antimatter ^(1+best HF/100).`,
    },
    antimatterGalaxy: {
      id: 4,
      progress: 65,
      condition: () => {
        if (Ra.unlocks.kohlersRealmUnlock.isUnlocked && Math.log10(Decimal.log10(Currency.antimatter.value))>=25) return true;
        return false;
      },
      description: () => `Reach ${format(new Decimal("1e10000000000000000000000000"))} Antimatter. Reward: Tickspeed affect 1st Multiversal Dimension with ultra reduced rate.`,
      effect: () => {
        return Math.max(Math.pow(Decimal.log10(Tickspeed.perSecond.plus(1)),0.3),1);
      }
    },
    placeholder: {
      id: 6,
      progress: 100,
      condition:false,
      description: "Now for the ultimate test...waiting 5 hours™.",
    }
  }
};
