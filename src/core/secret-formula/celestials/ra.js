export const ra = {
  pets: {
    teresa: {
      id: "teresa",
      name: "Teresa",
      color: "#8596ea",
      chunkGain: "Eternity Points",
      memoryGain: "current RM",
      requiredUnlock: () => undefined,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(Currency.eternityPoints.value.pLog10() / 1e4, 3),
      memoryProductionMultiplier: () => Ra.unlocks.teresaXP.effectOrDefault(1)
    },
    effarig: {
      id: "effarig",
      name: "Effarig",
      color: "#ea8585",
      chunkGain: "Relic Shards gained",
      memoryGain: "best Glyph level",
      requiredUnlock: () => Ra.unlocks.effarigUnlock,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(Effarig.shardsGained, 0.1),
      memoryProductionMultiplier: () => Ra.unlocks.effarigXP.effectOrDefault(1)
    },
    enslaved: {
      id: "enslaved",
      name: "The Nameless Ones",
      color: "#f1aa7f",
      chunkGain: "Time Shards",
      memoryGain: "total time played",
      requiredUnlock: () => Ra.unlocks.enslavedUnlock,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(Currency.timeShards.value.pLog10() / 3e5, 2),
      memoryProductionMultiplier: () => Ra.unlocks.enslavedXP.effectOrDefault(1)
    },
    v: {
      id: "v",
      name: "V",
      color: "#ead584",
      chunkGain: "Infinity Power",
      memoryGain: "total Memory levels",
      requiredUnlock: () => Ra.unlocks.vUnlock,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(Currency.infinityPower.value.pLog10() / 1e7, 1.5),
      memoryProductionMultiplier: () => Ra.unlocks.vXP.effectOrDefault(1)
    },
    ra: {
      id: "ra",
      name: "Ra",
      color: "#9575cd",
      chunkGain: "Dimension Boosts",
      memoryGain: "?",
      requiredUnlock: () => MendingUpgrade(19).isBought? undefined : false,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(DimBoost.purchasedBoosts/7e4, 1.5),
      memoryProductionMultiplier: () => 1
    },
    laitela: {
      id: "laitela",
      name: "Lai 'tela",
      color: "white",
      chunkGain: "Continuum",
      memoryGain: "?",
      requiredUnlock: () => MendingUpgrade(19).isBought? undefined : false,
      rawMemoryChunksPerSecond: () => (
        4 * Math.pow((AntimatterDimensions.all.reduce((totalContinuum,dim) => totalContinuum+dim.continuumValue, 0) + Tickspeed.continuumValue)/1e6, 1.5)
      ),
      memoryProductionMultiplier: () => 1
    },
    pelle: {
      id: "pelle",
      name: "Pelle",
      color: "crimson",
      chunkGain: "Remnants (Only increases in Doomed Reality)",
      memoryGain: "?",
      requiredUnlock: () => MendingUpgrade(19).isBought? undefined : false,
      rawMemoryChunksPerSecond: () => player.celestials.pelle.remnants,
      memoryProductionMultiplier: () => 1
    }
  },
  unlocks: {
    autoTP: {
      id: 0,
      reward: "Tachyon Particles are given immediately when Time Dilation is active",
      pet: "teresa",
      level: 1,
      displayIcon: `<span class="fas fa-atom"></span>`,
      disabledByPelle: true
    },
    chargedInfinityUpgrades: {
      id: 1,
      reward: () => `Unlock Charged Infinity Upgrades. You get one more maximum
        Charged Infinity Upgrade every ${formatInt(2)} levels`,
      effect: () => Math.min(12, Math.floor(Ra.pets.teresa.level / 2)),
      pet: "teresa",
      level: 2,
      displayIcon: `<span class="fas fa-infinity"></span>`,
      disabledByPelle: true
    },
    teresaXP: {
      id: 2,
      reward: "All Memory Chunks produce more Memories based on Reality Machines",
      effect: () => 1 + Math.pow(Currency.realityMachines.value.pLog10() / 100, 0.5),
      pet: "teresa",
      level: 5,
      displayIcon: `Ϟ`
    },
    alteredGlyphs: {
      id: 3,
      reward: "Unlock Altered Glyphs, which grant new effects to Glyphs based on Glyph Sacrifice",
      pet: "teresa",
      level: 10,
      displayIcon: `<span class="fas fa-bolt"></span>`,
      disabledByPelle: true
    },
    effarigUnlock: {
      id: 4,
      reward: "Unlock Effarig's Memories",
      pet: "teresa",
      level: 8,
      displayIcon: `Ϙ`
    },
    perkShopIncrease: {
      id: 5,
      reward: "Purchase caps are raised in Teresa's Perk Point Shop",
      pet: "teresa",
      level: 15,
      displayIcon: `<span class="fas fa-project-diagram"></span>`
    },
    unlockDilationStartingTP: {
      id: 6,
      reward: `In non-Celestial Realities, gain Tachyon Particles as if you reached the square root of your total
        antimatter in Dilation. Any multipliers to TP gain are applied retroactively, even outside Dilation`,
      effect: () => player.records.totalAntimatter.pow(0.5),
      pet: "teresa",
      level: 25,
      displayIcon: `<i class="far fa-dot-circle"></i>`
    },
    extraGlyphChoicesAndRelicShardRarityAlwaysMax: {
      id: 7,
      reward: () => `Get ${formatX(2)} Glyph choices and the bonus to Glyph rarity from Relic Shards
        is always its maximum value`,
      effect: 2,
      pet: "effarig",
      level: 1,
      displayIcon: `<i class="fas fa-grip-horizontal"></i>`
    },
    unlockGlyphAlchemy: {
      id: 8,
      reward: `Unlock Glyph Alchemy, which adds alchemical resources you can increase by Refining Glyphs. You unlock
        more resources through Effarig levels. Access through a new Reality tab.`,
      pet: "effarig",
      level: 2,
      displayIcon: `<span class="fas fa-vial"></span>`
    },
    effarigXP: {
      id: 9,
      reward: "All Memory Chunks produce more Memories based on highest Glyph level",
      effect: () => 1 + player.records.bestReality.glyphLevel / 7000,
      pet: "effarig",
      level: 5,
      displayIcon: `<span class="fas fa-clone"></span>`
    },
    glyphEffectCount: {
      id: 10,
      reward: () => `Glyphs always have ${formatInt(4)} effects, and Effarig Glyphs can now have up to ${formatInt(7)}`,
      pet: "effarig",
      level: 10,
      displayIcon: `<span class="fas fa-braille"></span>`
    },
    enslavedUnlock: {
      id: 11,
      reward: "Unlock Nameless's Memories",
      pet: "effarig",
      level: 8,
      displayIcon: `<span class="c-ra-pet-milestones-effarig-link">\uf0c1</span>`
    },
    relicShardGlyphLevelBoost: {
      id: 12,
      reward: "Glyph level is increased based on Relic Shards gained",
      effect: () => 100 * Math.pow(Math.log10(Math.max(Effarig.shardsGained, 1)), 2),
      pet: "effarig",
      level: 15,
      displayIcon: `<span class="fas fa-fire"></span>`
    },
    maxGlyphRarityAndShardSacrificeBoost: {
      id: 13,
      reward: () => `Glyphs are always generated with ${formatPercents(1)} rarity and
        Glyph Sacrifice gain is raised to a power based on Relic Shards`,
      effect: () => 1 + Effarig.maxRarityBoost / 100,
      pet: "effarig",
      level: 25,
      displayIcon: `<i class="fas fa-ankh"></i>`
    },
    blackHolePowerAutobuyers: {
      id: 14,
      reward: "Unlock Black Hole power upgrade autobuyers",
      pet: "enslaved",
      level: 1,
      displayIcon: `<span class="fas fa-circle"></span>`,
      disabledByPelle: true
    },
    improvedStoredTime: {
      id: 15,
      reward: "Stored game time is amplified and you can store more real time, increasing with Nameless levels",
      effects: {
        gameTimeAmplification: () => Math.pow(20, Math.clampMax(Ra.pets.enslaved.level, Ra.levelCap)),
        realTimeCap: () => 1000 * 3600 * Ra.pets.enslaved.level,
      },
      pet: "enslaved",
      level: 2,
      displayIcon: `<span class="fas fa-history"></span>`,
      disabledByPelle: true
    },
    enslavedXP: {
      id: 16,
      reward: "All Memory Chunks produce more Memories based on total time played",
      effect: () => 1 + Math.log10(player.records.totalTimePlayed) / 200,
      pet: "enslaved",
      level: 5,
      displayIcon: `<span class="fas fa-stopwatch"></span>`
    },
    autoPulseTime: {
      id: 17,
      reward: () => `Black Hole charging now only uses ${formatPercents(0.99)} of your game speed and you can
        automatically discharge ${formatPercents(0.01)} of your stored game time every ${formatInt(5)} ticks.`,
      pet: "enslaved",
      level: 10,
      displayIcon: `<span class="fas fa-expand-arrows-alt"></span>`,
      disabledByPelle: true
    },
    vUnlock: {
      id: 18,
      reward: "Unlock V's Memories",
      pet: "enslaved",
      level: 8,
      displayIcon: `⌬`
    },
    peakGamespeedDT: {
      id: 19,
      reward: "Gain more Dilated Time based on peak game speed in each Reality",
      effect: () => Math.max(Math.pow(Math.log10(player.celestials.ra.peakGamespeed) - 90, 3), 1),
      pet: "enslaved",
      level: 15,
      displayIcon: `<span class="fas fa-tachometer-alt"></span>`,
      disabledByPelle: true
    },
    allGamespeedGlyphs: {
      id: 20,
      reward: `All basic Glyphs gain the increased game speed effect from Time Glyphs,
        and Time Glyphs gain an additional effect`,
      pet: "enslaved",
      level: 25,
      displayIcon: `<span class="fas fa-clock"></span>`,
      onUnlock: () => {
        const allGlyphs = player.reality.glyphs.active.concat(player.reality.glyphs.inventory);
        for (const glyph of allGlyphs) {
          Glyphs.applyGamespeed(glyph);
        }
      }
    },
    instantECAndRealityUpgradeAutobuyers: {
      id: 21,
      reward: "Rebuyable Reality upgrades are bought automatically and Auto-Eternity Challenges happen instantly",
      pet: "v",
      level: 1,
      displayIcon: `<span class="fas fa-sync-alt"></span>`,
      disabledByPelle: true
    },
    autoUnlockDilation: {
      id: 22,
      reward: () => `In non-Celestial Realities, Time Dilation is unlocked automatically for free at
        ${formatInt(TimeStudy.dilation.totalTimeTheoremRequirement)} Time Theorems`,
      pet: "v",
      level: 2,
      displayIcon: `<span class="fas fa-fast-forward"></span>`
    },
    vXP: {
      id: 23,
      reward: "All Memory Chunks produce more Memories based on total Celestial levels.",
      effect: () => 1 + Ra.totalPetLevel / 50,
      pet: "v",
      level: 5,
      displayIcon: `<span class="fas fa-book"></span>`
    },
    unlockHardV: {
      id: 24,
      reward: () => `Unlock Hard V-Achievements and unlock a Triad Study every ${formatInt(6)} levels.
        Triad Studies are located at the bottom of the Time Studies page`,
      effect: () => Math.floor(Ra.pets.v.level / 6),
      pet: "v",
      level: 6,
      displayIcon: `<span class="fas fa-trophy"></span>`,
      disabledByPelle: true
    },
    continuousTTBoost: {
      id: 25,
      reward: "Time Theorems boost all forms of continuous non-dimension production",
      effects: {
        ttGen: () => Math.pow(10, 5 * Ra.theoremBoostFactor()),
        eternity: () => Math.pow(10, 2 * Ra.theoremBoostFactor()),
        infinity: () => Math.pow(10, 15 * Ra.theoremBoostFactor()),
        replicanti: () => Math.pow(10, 20 * Ra.theoremBoostFactor()),
        dilatedTime: () => Math.pow(10, 3 * Ra.theoremBoostFactor()),
        memories: () => 1 + Ra.theoremBoostFactor() / 50,
        memoryChunks: () => 1 + Ra.theoremBoostFactor() / 50,
        autoPrestige: () => 1 + 2.4 * Ra.theoremBoostFactor()
      },
      pet: "v",
      level: 10,
      displayIcon: `<span class="fas fa-university"></span>`,
      disabledByPelle: true
    },
    achievementTTMult: {
      id: 26,
      reward: "Achievement multiplier applies to Time Theorem generation",
      effect: () => Achievements.power,
      pet: "v",
      level: 15,
      displayIcon: `<span class="fas fa-graduation-cap"></span>`,
      disabledByPelle: true
    },
    achievementPower: {
      id: 27,
      reward: () => `Achievement multiplier is raised ${formatPow(1.5, 1, 1)}`,
      effect: 1.5,
      pet: "v",
      level: 25,
      displayIcon: `<i class="fab fa-buffer"></i>`,
      disabledByPelle: true
    },
    imaginaryMachinesSetToCap: {
      id: 0,
      id2: 0,
      reward: "Current Imaginary Machine amount is always set to cap and the cap passively increases",
      pet: "teresa",
      level: 30,
      displayIcon: `<span class="fas fa-level-up-alt"></span>`
    },
    chargedBreakInfinityUpgrades: {
      id: 1,
      id2: 0,
      reward: () => `Unlock Charged Break Infinity Upgrades. You get one more maximum
        Charged Break Infinity Upgrade every ${formatInt(5)} levels`,
      effect: () => Math.min(12, Math.floor((Ra.pets.teresa.level-35) / 5)),
      pet: "teresa",
      level: 40,
      displayIcon: "∝"
    },
    uncapGlyphSacEffects: {
      id: 2,
      id2: 0,
      reward: "Some Glyph Sacrifice effects are uncapped",
      pet: "teresa",
      level: 50,
      displayIcon: `<span class="fas fa-clone"></span>`
    },
    retroactiveTeresaRealityReward: {
      id: 3,
      id2: 0,
      reward: () => `Your record antimatter in Teresa's Reality is retroactively set to the square root of your total antimatter`,
      pet: "teresa",
      level: 65,
      displayIcon: "Ϟ"
    },
    placeholderT5: {
      id: 4,
      id2: 0,
      reward: "TBD",
      pet: "teresa",
      level: 75,
      displayIcon: "T"
    },
    placeholderT6: {
      id: 5,
      id2: 0,
      reward: "TBD",
      pet: "teresa",
      level: 90,
      displayIcon: "B"
    },
    placeholderT7: {
      id: 6,
      id2: 0,
      reward: "TBD",
      pet: "teresa",
      level: 100,
      displayIcon: "D"
    },
    placeholderE1: {
      id: 8,
      id2: 0,
      reward: "TBD",
      pet: "effarig",
      level: 30,
      displayIcon: "?"
    },
    placeholderE2: {
      id: 9,
      id2: 0,
      reward: "TBD",
      pet: "effarig",
      level: 40,
      displayIcon: "?"
    },
    placeholderE3: {
      id: 10,
      id2: 0,
      reward: "TBD",
      pet: "effarig",
      level: 50,
      displayIcon: "?"
    },
    placeholderE4: {
      id: 11,
      id2: 0,
      reward: "TBD",
      pet: "effarig",
      level: 65,
      displayIcon: "?"
    },
    placeholderE5: {
      id: 12,
      id2: 0,
      reward: "TBD",
      pet: "effarig",
      level: 75,
      displayIcon: "?"
    },
    placeholderE6: {
      id: 13,
      id2: 0,
      reward: "TBD",
      pet: "effarig",
      level: 90,
      displayIcon: "?"
    },
    placeholderE7: {
      id: 14,
      id2: 0,
      reward: "TBD",
      pet: "effarig",
      level: 100,
      displayIcon: "?"
    },
    placeholderN1: {
      id: 15,
      id2: 0,
      reward: "TBD",
      pet: "enslaved",
      level: 30,
      displayIcon: "?"
    },
    placeholderN2: {
      id: 16,
      id2: 0,
      reward: "TBD",
      pet: "enslaved",
      level: 40,
      displayIcon: "?"
    },
    placeholderN3: {
      id: 17,
      id2: 0,
      reward: "TBD",
      pet: "enslaved",
      level: 50,
      displayIcon: "?"
    },
    placeholderN4: {
      id: 18,
      id2: 0,
      reward: "TBD",
      pet: "enslaved",
      level: 65,
      displayIcon: "?"
    },
    placeholderN5: {
      id: 19,
      id2: 0,
      reward: "TBD",
      pet: "enslaved",
      level: 75,
      displayIcon: "?"
    },
    placeholderN6: {
      id: 20,
      id2: 0,
      reward: "TBD",
      pet: "enslaved",
      level: 90,
      displayIcon: "?"
    },
    placeholderN7: {
      id: 21,
      id2: 0,
      reward: "TBD",
      pet: "enslaved",
      level: 100,
      displayIcon: "?"
    },
    placeholderV1: {
      id: 22,
      id2: 0,
      reward: "TBD",
      pet: "v",
      level: 30,
      displayIcon: "?"
    },
    placeholderV2: {
      id: 23,
      id2: 0,
      reward: "TBD",
      pet: "v",
      level: 40,
      displayIcon: "?"
    },
    placeholderV3: {
      id: 24,
      id2: 0,
      reward: "TBD",
      pet: "v",
      level: 50,
      displayIcon: "?"
    },
    placeholderV4: {
      id: 25,
      id2: 0,
      reward: "TBD",
      pet: "v",
      level: 65,
      displayIcon: "?"
    },
    placeholderV5: {
      id: 26,
      id2: 0,
      reward: "TBD",
      pet: "v",
      level: 75,
      displayIcon: "?"
    },
    placeholderV6: {
      id: 27,
      id2: 0,
      reward: "TBD",
      pet: "v",
      level: 90,
      displayIcon: "?"
    },
    placeholderV7: {
      id: 28,
      id2: 0,
      reward: "TBD",
      pet: "v",
      level: 100,
      displayIcon: "?"
    },
    raRealUncapDimboost: {
      id: 29,
      id2: 0,
      reward: "Uncap Dimension Boosts in Ra's reality.",
      pet: "ra",
      level: 1,
      displayIcon: GLYPH_SYMBOLS.power
    },
    rautobuyers: {
      id: 30,
      id2: 0,
      reward: "Memory Levels, Recollections and Fragmentations are bought automatically.",
      pet: "ra",
      level: 2,
      displayIcon: `<span class="fas fa-sync-alt"</span>`
    },
    placeholderR2: {
      id: 31,
      id2: 0,
      reward: "TBD",
      pet: "ra",
      level: 5,
      displayIcon: "?"
    },
    placeholderR3: {
      id: 0,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 8,
      displayIcon: "?"
    },
    placeholderR4: {
      id: 1,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 10,
      displayIcon: "?"
    },
    placeholderR5: {
      id: 2,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 15,
      displayIcon: "?"
    },
    placeholderR6: {
      id: 3,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 25,
      displayIcon: "?"
    },
    placeholderR7: {
      id: 4,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 30,
      displayIcon: "?"
    },
    placeholderR8: {
      id: 5,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 40,
      displayIcon: "?"
    },
    placeholderR9: {
      id: 6,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 50,
      displayIcon: "?"
    },
    placeholderR10: {
      id: 7,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 65,
      displayIcon: "?"
    },
    placeholderR11: {
      id: 8,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 75,
      displayIcon: "?"
    },
    placeholderR12: {
      id: 9,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 90,
      displayIcon: "?"
    },
    placeholderR13: {
      id: 10,
      id2: 1,
      reward: "TBD",
      pet: "ra",
      level: 100,
      displayIcon: "?"
    },
    placeholderL1: {
      id: 11,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 1,
      displayIcon: "?"
    },
    placeholderL2: {
      id: 12,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 2,
      displayIcon: "?"
    },
    placeholderL3: {
      id: 13,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 5,
      displayIcon: "?"
    },
    placeholderL4: {
      id: 14,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 8,
      displayIcon: "?"
    },
    placeholderL5: {
      id: 15,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 10,
      displayIcon: "?"
    },
    placeholderL6: {
      id: 16,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 15,
      displayIcon: "?"
    },
    placeholderL7: {
      id: 17,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 25,
      displayIcon: "?"
    },
    placeholderL8: {
      id: 18,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 30,
      displayIcon: "?"
    },
    placeholderL9: {
      id: 19,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 40,
      displayIcon: "?"
    },
    placeholderL10: {
      id: 20,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 50,
      displayIcon: "?"
    },
    placeholderL11: {
      id: 21,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 65,
      displayIcon: "?"
    },
    placeholderL12: {
      id: 22,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 75,
      displayIcon: "?"
    },
    placeholderL13: {
      id: 23,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 90,
      displayIcon: "?"
    },
    placeholderL14: {
      id: 24,
      id2: 1,
      reward: "TBD",
      pet: "laitela",
      level: 100,
      displayIcon: "?"
    },
    pelleAutobuyers: {
      id: 25,
      id2: 1,
      reward: "Pelle Upgrades are purchased automatically",
      pet: "pelle",
      level: 1,
      displayIcon: `<span class="fas fa-sync-alt"</span>`
    },
    placeholderP2: {
      id: 26,
      id2: 1,
      reward: "TBD",
      pet: "pelle",
      level: 2,
      displayIcon: "?"
    },
    placeholderP3: {
      id: 27,
      id2: 1,
      reward: "TBD",
      pet: "pelle",
      level: 5,
      displayIcon: "?"
    },
    placeholderP4: {
      id: 28,
      id2: 1,
      reward: "TBD",
      pet: "pelle",
      level: 8,
      displayIcon: "?"
    },
    placeholderP5: {
      id: 29,
      id2: 1,
      reward: "TBD",
      pet: "pelle",
      level: 10,
      displayIcon: "?"
    },
    placeholderP6: {
      id: 30,
      id2: 1,
      reward: "TBD",
      pet: "pelle",
      level: 15,
      displayIcon: "?"
    },
    placeholderP7: {
      id: 31,
      id2: 1,
      reward: "TBD",
      pet: "pelle",
      level: 25,
      displayIcon: "?"
    },
    placeholderP8: {
      id: 0,
      id2: 2,
      reward: "TBD",
      pet: "pelle",
      level: 30,
      displayIcon: "?"
    },
    placeholderP9: {
      id: 1,
      id2: 2,
      reward: "TBD",
      pet: "pelle",
      level: 40,
      displayIcon: "?"
    },
    placeholderP10: {
      id: 2,
      id2: 2,
      reward: "TBD",
      pet: "pelle",
      level: 50,
      displayIcon: "?"
    },
    placeholderP11: {
      id: 3,
      id2: 2,
      reward: "TBD",
      pet: "pelle",
      level: 65,
      displayIcon: "?"
    },
    placeholderP12: {
      id: 4,
      id2: 2,
      reward: "TBD",
      pet: "pelle",
      level: 75,
      displayIcon: "?"
    },
    placeholderP13: {
      id: 5,
      id2: 2,
      reward: "TBD",
      pet: "pelle",
      level: 90,
      displayIcon: "?"
    },
    placeholderP14: {
      id: 6,
      id2: 2,
      reward: "TBD",
      pet: "pelle",
      level: 100,
      displayIcon: "?"
    },
  }
};
