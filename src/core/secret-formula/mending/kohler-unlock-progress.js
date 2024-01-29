export const kohlerProgress = {
  progressUnlocks: {
    kohlerUnlocked: {
      id: 0,
      progress: 5,
      condition: () => Ra.unlocks.kohlersRealmUnlock.isUnlocked,
      description: "Kohler tab is unlocked, yet too early...",
    },
    hostileScore: {
      id: 1,
      progress: 20,
      condition: () => {
        if (CorruptionData.corruptionChallenge.recordScore >= 1000000) return true;
        return false;
      },
      description: "Reach 1e6 Hostile score: Keep Charged Upgrades when not entering Hostile mend.",
    },
    placeholder: {
      id: 6,
      progress: 100,
      condition:false,
      description: "idk condition: Coming in 5 hours™.",
    }
  }
};
