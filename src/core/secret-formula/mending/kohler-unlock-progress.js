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
      description: "Reach 1e6 Hostile score: idk adward.",
    },
    placeholder: {
      id: 2,
      progress: 50,
      condition:false,
      description: "A placeholder that cannot be unlocked to see style.",
    }
  }
};
