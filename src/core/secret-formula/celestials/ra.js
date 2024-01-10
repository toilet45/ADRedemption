export const ra = {
  pets: {
    teresa: {
      id: "teresa",
      name: "Teresa",
      color: "#8596ea",
      chunkGain: "Eternity Points",
      memoryGain: "current RM",
      secondaryMemoryChunkGain: "Perk Points",
      requiredUnlock: () => undefined,
      rawMemoryChunksPerSecond: () => {
        let x = Ra.unlocks.placeholderR4.isUnlocked ? Math.log10(Math.max(1, Currency.perkPoints.value)) : 1;
        return 4 * Math.pow((Ra.unlocks.placeholderR9.isUnlocked ? Math.max(Currency.eternityPoints.value.ln(), 0) : Currency.eternityPoints.value.pLog10()) / 1e4, 3) * x;
      },
      memoryProductionMultiplier: () => Ra.unlocks.teresaXP.effectOrDefault(1)
    },
    effarig: {
      id: "effarig",
      name: "Effarig",
      color: "#ea8585",
      chunkGain: "Relic Shards gained",
      memoryGain: "best Glyph level",
      secondaryMemoryChunkGain: "Glyph Sacrifice totals",
      requiredUnlock: () => (MendingMilestone.ten.isReached ? undefined : Ra.unlocks.effarigUnlock),
      rawMemoryChunksPerSecond: () =>{
        let x = new Decimal(0);
        if(Ra.unlocks.placeholderR4.isUnlocked){
          Object.values(player.reality.glyphs.sac).every(value => x = x.add(value))
        }
        x = x.div(7);
        return (Ra.unlocks.placeholderR9.isUnlocked ? 100 : 4) * Decimal.pow(Effarig.shardsGained, (Ra.unlocks.placeholderP9.isUnlocked ?  0.105 : 0.1)).min(1e308).toNumber() * Math.max(1, Decimal.log10(x));
      },
      memoryProductionMultiplier: () => Ra.unlocks.effarigXP.effectOrDefault(1)
    },
    enslaved: {
      id: "enslaved",
      name: "The Nameless Ones",
      color: "#f1aa7f",
      chunkGain: "Time Shards",
      memoryGain: "total time played",
      secondaryMemoryChunkGain: "Stored Real Time",
      requiredUnlock: () => (MendingMilestone.ten.isReached ? undefined : Ra.unlocks.enslavedUnlock),
      rawMemoryChunksPerSecond: () =>{
        let x = Ra.unlocks.placeholderR4.isUnlocked ?  1 + (player.celestials.enslaved.storedReal / 3.6e6) : 1;
        return Ra.unlocks.placeholderR9.isUnlocked ? 4 * Math.pow(Math.max(Currency.timeShards.value.ln(), 0) / 3e5, 2) * x : 4 * Math.pow(Currency.timeShards.value.pLog10() / 3e5, 2) * x;
      },
      memoryProductionMultiplier: () => Ra.unlocks.enslavedXP.effectOrDefault(1)
    },
    v: {
      id: "v",
      name: "V",
      color: "#ead584",
      chunkGain: "Infinity Power",
      memoryGain: "total Memory levels",
      secondaryMemoryChunkGain: "Achievement Multiplier for Dimensions",
      requiredUnlock: () => (MendingMilestone.ten.isReached ? undefined : Ra.unlocks.vUnlock),
      rawMemoryChunksPerSecond: () =>{
        let x = Ra.unlocks.placeholderR4.isUnlocked ? Math.max(1, Math.log10(Achievements.power.toNumber())) * 4 : 1;
        return Ra.unlocks.placeholderR9.isUnlocked ? 4 * Math.pow(Math.max(Currency.infinityPower.value.ln(),0) / 1e7, 1.5) *x : 4 * Math.pow(Currency.infinityPower.value.pLog10() / 1e7, 1.5) *x;
      },
      memoryProductionMultiplier: () => Ra.unlocks.vXP.effectOrDefault(1)
    },
    ra: {
      id: "ra",
      name: "Ra",
      color: "#9575cd",
      chunkGain: "Dimension Boosts",
      memoryGain: "current iM",
      secondaryMemoryChunkGain: "Total Celestial Memories",
      requiredUnlock: () => (MendingUpgrade(19).isBought ? undefined : false),
      rawMemoryChunksPerSecond: () =>{
        let x = 0;
        if(Ra.unlocks.placeholderR4.isUnlocked){
          x += Ra.pets.teresa.memories;
          x += Ra.pets.effarig.memories;
          x += Ra.pets.enslaved.memories;
          x += Ra.pets.v.memories
          x += Ra.pets.ra.memories
          x += Ra.pets.laitela.memories
          x += Ra.pets.pelle.memories
        }
        x /= 7;
        return 4 * Math.pow((DimBoost.purchasedBoosts + DimBoost.imaginaryBoosts)/7e4, (Ra.unlocks.placeholderR9.isUnlocked ? 1.75 : 1.5)) * Math.max(Math.log10(Math.min(0, x)), 1);
      },
      memoryProductionMultiplier: () => Ra.unlocks.raXP.effectOrDefault(1)
    },
    laitela: {
      id: "laitela",
      name: "Lai'tela",
      color: "white",
      chunkGain: "Continuum",
      memoryGain: "Singularity amount",
      secondaryMemoryChunkGain: "Dark Matter",
      requiredUnlock: () => (MendingUpgrade(19).isBought ? undefined : false),
      rawMemoryChunksPerSecond: () =>{
        let x = Ra.unlocks.placeholderR4.isUnlocked ? Math.max(Decimal.log10(Currency.darkMatter.value) / 10, 1) : 1;
        return (4 * Math.pow((AntimatterDimensions.all.reduce((totalContinuum,dim) => totalContinuum+dim.continuumValue, 0) + Tickspeed.continuumValue)/1e6, (Ra.unlocks.placeholderP9.isUnlocked ? 1.667 : 1.5))) * x;
      },
      memoryProductionMultiplier: () => Ra.unlocks.laitelaXP.effectOrDefault(1)
    },
    pelle: {
      id: "pelle",
      name: "Pelle",
      color: "crimson",
      chunkGain: "Remnants (Only increases in Doomed Reality)",
      memoryGain: "best Remnants without Galaxy Generator",
      secondaryMemoryChunkGain: "Reality Shards",
      requiredUnlock: () => (MendingUpgrade(19).isBought ? undefined : false),
      rawMemoryChunksPerSecond: () =>{
        let x = Ra.unlocks.placeholderR4.isUnlocked ? Math.max(Math.log10(Currency.realityShards.value.toNumber()), 1) : 1;
        let y = Ra.unlocks.placeholderR9.isUnlocked ? 1.05 : 1;
        return (x * player.celestials.pelle.remnants) ** y;
      },
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
      effect: () => 100 * Math.pow(Decimal.log10(Decimal.max(Effarig.shardsGained, 1)), 2),
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
      effect: () => 1 + Decimal.log10(player.records.totalTimePlayed) / 200,
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
      effect: () => Math.max(Math.pow(Decimal.log10(player.celestials.ra.peakGamespeed) - 90, 3), 1),
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
        ttGen: () => Decimal.pow(10, 5 * Ra.theoremBoostFactor()),
        eternity: () => Decimal.pow(10, 2 * Ra.theoremBoostFactor()),
        infinity: () => Decimal.pow(10, 15 * Ra.theoremBoostFactor()),
        replicanti: () => Decimal.pow(10, 20 * Ra.theoremBoostFactor()),
        dilatedTime: () => Decimal.pow(10, 3 * Ra.theoremBoostFactor()),
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
      reward: "Current Imaginary Machine amount is always set to cap",
      pet: "teresa",
      level: 30,
      displayIcon: `<span class="fas fa-level-up-alt"></span>`
    },
    chargedBreakInfinityUpgrades: {
      id: 1,
      id2: 0,
      reward: () => `Unlock Charged Break Infinity Upgrades. You get one more maximum
        Charged Break Infinity Upgrade every ${formatInt(6)} levels past ${formatInt(40)}`,
      effect: () => Math.min(9, Math.floor((Ra.pets.teresa.level-40) / 6)),
      pet: "teresa",
      level: 40,
      displayIcon: "∝",
      disabledByPelle: true
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
    realityMachinesBoostIpAndEpGain: {
      id: 4,
      id2: 0,
      reward: "Reality Machines boost Infinity Point and Eternity Point gain",
      pet: "teresa",
      level: 75,
      displayIcon: '*',
      effect: () => Decimal.log10(Currency.realityMachines) / 100
    },
    realitiesBoostInfinityAndEternityProduction: {
      id: 5,
      id2: 0,
      reward: "Realities boost Infinity and Eternity production",
      pet: "teresa",
      level: 90,
      displayIcon: '*'
    },
    postWarpRealityMachineBoost: {
      id: 6,
      id2: 0,
      reward: "Post-Warp Reality Machine gain is affected by Elliptic Materiality",
      pet: "teresa",
      level: 100,
      displayIcon: '<i class="fa-solid fa-check"></i>'
    },
    alchSetToCapAndCapIncrease: {
      id: 8,
      id2: 0,
      reward: () => `Alchemy passively occurs, and increase the hardcap by ${formatInt(10)} per level`,
      effect: () => 10 * Ra.pets.effarig.level,
      pet: "effarig",
      level: 30,
      displayIcon: '<span class="fas fa-vial"</span>'
    },
    passiveRelicShardGain: {
      id: 9,
      id2: 0,
      reward: "You gain 100% of relic shards on reality every second",
      pet: "effarig",
      level: 40,
      displayIcon: '*'
    },
    harshInstabilityDelay: {
      id: 10,
      id2: 0,
      reward: () => `Logarithmic glyph instability is delayed by ${formatInt(500)} for every ${formatInt(5)} levels past ${formatInt(50)}`,
      effect: () => 500*Math.floor((Ra.pets.effarig.level-50)/5),
      pet: "effarig",
      level: 50,
      displayIcon: '<i class="fa-solid fa-check-double"></i>'
    },
    relicShardBoost: {
      id: 11,
      id2: 0,
      reward: "Relic shards boost dimensional sacrifice, replicanti speed, infinity power conversion rate, tachyon particle to dilated time factor and time dimensions",
      pet: "effarig",
      level: 65,
      displayIcon: '*'
    },
    effarigGlyphIncreaseImCap: {
      id: 12,
      id2: 0,
      reward: "Effarig Glyphs' first effect also increases Imaginary Machine cap",
      pet: "effarig",
      level: 75,
      displayIcon: '*'
    },
    maxGlyphRarityIncrease: {
      id: 13,
      id2: 0,
      reward: () => `Maximum Glyph rarity is increased by ${formatPercents(.02)} per level past ${formatInt(90)}`,
      effect: () => 2*(Ra.pets.effarig.level-90),
      pet: "effarig",
      level: 90,
      displayIcon: '*'
    },
    effarigMendUnlock: {
      id: 14,
      id2: 0,
      reward: "Unlock Effarig's Mend",
      pet: "effarig",
      level: 100,
      displayIcon: '<i class="fa-solid fa-check"></i>'
    },
    uncapGamespeed: {
      id: 15,
      id2: 0,
      reward: "Reomve the 1e300 Gamespeed Cap",
      pet: "enslaved",
      level: 30,
      displayIcon: '*'
    },
    uncap8TdPurchaseMult: {
      id: 16,
      id2: 0,
      reward: "Uncap 8th Time Dimension purchase multiplier",
      pet: "enslaved",
      level: 40,
      displayIcon: '*'
    },
    unlock3rdBH: {
      id: 17,
      id2: 0,
      reward: "Unlock the 3rd Black Hole which costs Imaginary Machines and boosts Game Speed exponentially instead of multiplicatively",
      pet: "enslaved",
      level: 50,
      displayIcon: '*'
    },
    twinTachyonGalaxyCapIncrease: {
      id: 18,
      id2: 0,
      reward: "Increase Pelle Tachyon Galaxy multiplier upgrade base based on Dilated Time",
      pet: "enslaved",
      level: 65,
      displayIcon: '*'
    },
    gamespeedGalaxyBoost: {
      id: 19,
      id2: 0,
      reward: "Game Speed increases Galaxy strength",
      pet: "enslaved",
      level: 75,
      displayIcon: '*',
      effect: () => Math.max(1 ,1 + (Decimal.log10(getGameSpeedupFactor()) / 1000)) //this shouldn't be 100% until e1000 gamespeed
    },
    freeTickspeedSoftcapDelay: {
      id: 20,
      id2: 0,
      reward: "Tesseracts increase free tickspeed upgrade softcap",
      pet: "enslaved",
      level: 90,
      displayIcon: '*'
    },
    improvedIpowConversion: {
      id: 21,
      id2: 0,
      reward: "Improve Infinity Power conversion (based on effective Tesseract count)",
      pet: "enslaved",
      level: 100,
      displayIcon: '*'
    },
    improvedECRewards: {
      id: 22,
      id2: 0,
      reward: "Improve some Eternity Challenge rewards",
      pet: "v",
      level: 30,
      displayIcon: '*'
    },
    placeholderV2: {
      id: 23,
      id2: 0,
      reward: "Unlock More V-Achievements and V-Milestones",
      pet: "v",
      level: 40,
      displayIcon: "?"
    },
    vAchMilestone2AffectsIDsAndTDs: {
      id: 24,
      id2: 0,
      reward: "The 5 V-Achievement milestone affects Infinity and Time Dimensions with reduced effect",
      pet: "v",
      level: 50,
      displayIcon: '*'
    },
    repIncreasesAchMult: {
      id: 25,
      id2: 0,
      reward: "Replicanti increases achievement multiplier",
      pet: "v",
      level: 65,
      displayIcon: '*'
    },
    totalSTBoostTTGen: {
      id: 26,
      id2: 0,
      reward: "Total Space Theorems boost Time Theorem generation",
      pet: "v",
      level: 75,
      displayIcon: '*'
    },
    placeholderV6: {
      id: 27,
      id2: 0,
      reward: "Unlock a Myriad Study every 2 Memory Levels past 90",
      pet: "v",
      level: 90,
      effect: () => Math.floor((Ra.pets.v.level - 90) / 2) + 1,
      displayIcon: "?"
    },
    achMultBaseImprovementV: {
      id: 28,
      id2: 0,
      reward: "Improve Base Achievemnt Multiplier",
      pet: "v",
      level: 100,
      displayIcon: "*"
    },
    raRealUncapDimboost: {
      id: 29,
      id2: 0,
      reward: "Uncap Dimension Boosts in Ra's reality",
      pet: "ra",
      level: 1,
      displayIcon: GLYPH_SYMBOLS.power
    },
    rautobuyers: {
      id: 30,
      id2: 0,
      reward: "Unlock Autobuyers for Memory Levels, Recollections and Fragmentations (kept on Mend).",
      pet: "ra",
      level: 2,
      displayIcon: `<span class="fas fa-sync-alt"</span>`
    },
    raXP: {
      id: 31,
      id2: 0,
      reward: "All Memory Chunks produce more Memories based on Imaginary Machines",
      pet: "ra",
      level: 5,
      displayIcon: '*',
      effect: () => Math.max(1, Math.pow(Math.log(Math.max(1,Currency.imaginaryMachines.value)), 0.5))
    },
    upgradesDontSpendMems: {
      id: 0,
      id2: 1,
      reward: "Level Up, Recollection and Fragmentation don't spend memories",
      pet: "ra",
      level: 8,
      displayIcon: '<i class="fa-solid fa-check-double"></i>'
    },
    placeholderR4: {
      id: 1,
      id2: 1,
      reward: "Add a secondary source for Memory Chunk Gain for each Celestial",
      pet: "ra",
      level: 10,
      displayIcon: "*"
    },
    remembranceBoost: {
      id: 2,
      id2: 1,
      reward: "Remembrance is ×15 as powerful",
      pet: "ra",
      level: 15,
      displayIcon: "*"
    },
    generateMemChunksOutOfRasReality: {
      id: 3,
      id2: 1,
      reward: "You can generate Memory Chunks outside of Ra's reality at a heavily reduced rate",
      pet: "ra",
      level: 25,
      displayIcon: '*'
    },
    imaginaryBoostsRa: {
      id: 4,
      id2: 1,
      reward: "Free Dimension Boosts are effective in Ra's Reality",
      pet: "ra",
      level: 30,
      displayIcon: "*"
    },
    remembranceAlwaysActiveAndShopUnlock: {
      id: 5,
      id2: 1,
      reward: "Remembrance has no downside, affects all celestials and is always active, unlock Ra's Shop",
      pet: "ra",
      level: 40,
      displayIcon: '*'
    },
    placeholderR9: {
      id: 6,
      id2: 1,
      reward: "Base Memory Chunk formula for all Celestials is slightly improved",
      pet: "ra",
      level: 50,
      displayIcon: "*"
    },
    raNoReset: {
      id: 7,
      id2: 1,
      reward: "Ra no longer resets on Mend",
      pet: "ra",
      level: 65,
      displayIcon: '<i class="fa-solid fa-check-double"></i>'
    },
    placeholderR11: {
      id: 8,
      id2: 1,
      reward: "Gain Free Dimension Boosts based on Ra Level",
      pet: "ra",
      level: 75,
      displayIcon: "*"
    },
    placeholderR12: {
      id: 9,
      id2: 1,
      reward: "Increase Recollection and Fragmentation bases based on Memories",
      pet: "ra",
      level: 90,
      displayIcon: "?"
    },
    placeholderR13: {
      id: 10,
      id2: 1,
      reward: "Gain a Multiversal Remain Multiplier based on total Memory Levels",
      pet: "ra",
      level: 100,
      displayIcon: "*"
    },
    increaseDarkMatterCap: {
      id: 11,
      id2: 1,
      reward: "Increase dark matter cap based on Laitela level",
      effect: () => (Ra.pets.laitela.level),
      pet: "laitela",
      level: 1,
      displayIcon: '*'
    },
    annihilationDarkEnergyBoost: {
      id: 12,
      id2: 1,
      reward: "Annihilation increases dark energy production with reduced effect",
      pet: "laitela",
      level: 2,
      displayIcon: '*'
    },
    laitelaXP: {
      id: 13,
      id2: 1,
      reward: "All Memory Chunks produce more Memories based on Singularities",
      effect: () => Math.max(Math.log10(Currency.singularities.value) / 10, 1),
      pet: "laitela",
      level: 5,
      displayIcon: '*'
    },
    totalAntimatterDarkMatterBoost: {
      id: 14,
      id2: 1,
      reward: "Total Antimatter boosts dark matter gain",
      pet: "laitela",
      level: 8,
      displayIcon: '<i class="fa-solid fa-check"></i>'
    },
    infinityPowerConversionBoost: {
      id: 15,
      id2: 1,
      reward:() => `Increase the base infinity power conversion by ${formatFloat(0.25, 2)} every ${formatInt(10)} levels`,
      effect: () => .25 * Math.floor(Ra.pets.laitela.level/10),
      pet: "laitela",
      level: 10,
      displayIcon: '*'
    },
    passiveAnnihilationGen: {
      id: 16,
      id2: 1,
      reward: `Passively generate half of your Annihilation multiplier every second`,
      pet: "laitela",
      level: 15,
      displayIcon: '*'
    },
    unlockDMD: {
      id: 17,
      id2: 1,
      reward: () => `Unlock a new Dark Matter Dimension every ${formatInt(25)} levels`,
      pet: "laitela",
      level: 25,
      displayIcon: '*'
    },
    continuumBoost: {
      id: 18,
      id2: 1,
      reward: () => `Improve Continuum effect for every ${format("1e308")} Dark Matter`,
      pet: "laitela",
      level: 30,
      displayIcon: '<i class="fa-solid fa-check"></i>'
    },
    increaseSingLimits: {
      id: 19,
      id2: 1,
      reward: () => `You can increase the max singularity cap by ${formatInt(2)} every ${formatInt(5)} levels`,
      pet: "laitela",
      level: 40,
      displayIcon: '*'
    },
    dmdAuto1: {
      id: 20,
      id2: 1,
      reward: "(Kept without Ra 65) Unlock Permanent autobuyers for all Dark Matter Dimensions",
      pet: "laitela",
      level: 50,
      displayIcon: `<span class="fas fa-sync-alt"</span>`
    },
    dmdAuto2: {
      id: 21,
      id2: 1,
      reward: "(Kept without Ra 65) Unlock Permanent autobuyers for Annihilation, Singularities and Singularity Caps. Manual Annihilations are 500x stronger.",
      pet: "laitela",
      level: 65,
      displayIcon: `<span class="fas fa-sync-alt"</span>` 
    },
    continuumAffectsIDsAndTDs: {
      id: 22,
      id2: 1,
      reward: "Continuum affects Infinity and Time Dimensions (With reduced effect)",
      pet: "laitela",
      level: 75,
      displayIcon: `*`
    },
    dmdScaling: {
      id: 23,
      id2: 1,
      reward: "Slightly weaken post infinity DMD scaling, Entropic Condensing is far stronger.",
      pet: "laitela",
      level: 90,
      displayIcon: "??"
    },
    placeholderL14: {
      id: 24,
      id2: 1,
      reward: "Unlock Multiversal Dimensions [name TBD]",
      pet: "laitela",
      level: 100,
      displayIcon: "*"
    },
    pelleAutobuyers: {
      id: 25,
      id2: 1,
      reward: "Pelle Upgrades are purchased automatically",
      pet: "pelle",
      level: 1,
      displayIcon: `<span class="fas fa-sync-alt"</span>`
    },
    boostMVRGain: {
      id: 26,
      id2: 1,
      reward: "Triple Multiversal Remain gain when Mending in a Doomed Reality, you can now fill up to 5 rifts at once",
      effect: () => Pelle.isDoomed ? 3 : 1,
      pet: "pelle",
      level: 2,
      displayIcon: '<i class="fa-solid fa-check-double"></i>'
    },
    pelleXP: {
      id: 27,
      id2: 1,
      reward: "All Memory Chunks produce more Memories based on highest Remnants without Galaxy Generator.",
      pet: "pelle",
      level: 5,
      displayIcon: '*'
    },
    placeholderP4: {
      id: 28,
      id2: 1,
      reward: "Re-enable Tachyon Particle Multiplier in Doomed Reality, but it's decreased to ×1.1",
      pet: "pelle",
      level: 8,
      displayIcon: "*"
    },
    placeholderP5: {
      id: 29,
      id2: 1,
      reward: "Doomed Reality can be exitied, but it causes a Mending Reset (with no benefits)",
      pet: "pelle",
      level: 10,
      displayIcon: "*"
    },
    placeholderP6: {
      id: 30,
      id2: 1,
      reward: "Doomed Reality no longer disables rebuyable IP and EP multipliers, but they are decreased to ×1.01 and ×1.5 respectively",
      pet: "pelle",
      level: 15,
      displayIcon: "*"
    },
    placeholderP7: {
      id: 31,
      id2: 1,
      reward: "Disabled Glyph Effects are re-enabled in Doomed Reality, but are severely nerfed",
      pet: "pelle",
      level: 25,
      displayIcon: "?"
    },
    placeholderP8: {
      id: 0,
      id2: 2,
      reward: "Memory Gain for all Celestials is boosted in Doomed Reality",
      pet: "pelle",
      level: 30,
      displayIcon: "*"
    },
    placeholderP9: {
      id: 1,
      id2: 2,
      reward: "Continuum is re-enabled in Doomed Reality, but is severely weakened, and only effective for Antimatter Dimensions",
      pet: "pelle",
      level: 40,
      displayIcon: "*"
    },
    placeholderP10: {
      id: 2,
      id2: 2,
      reward: "Glyph Rarity in Doomed Reality is boosted based on Memory Levels past 50",
      pet: "pelle",
      level: 50,
      displayIcon: "*"
    },
    omegaScalingBuff: {
      id: 3,
      id2: 2,
      reward: "Make the scaling at glyph level 100,000 weaker.",
      pet: "pelle",
      level: 65,
      displayIcon: "*"
    },
    Hostility: {
      id: 4,
      id2: 2,
      reward: () => Ra.unlocks.Hostility.isUnlocked ? "Unlock Hostilities" : "Reach Pelle 75 to see reward",
      pet: "pelle",
      level: 75,
      displayIcon: () => Ra.unlocks.Hostility.isUnlocked ?`<i class="fa-solid fa-biohazard"></i>`:"?"
    },
    DimLimitCorruptionImprovementPelle: {
      id: 5,
      id2: 2,
      reward: () => Ra.unlocks.Hostility.isUnlocked ? "Make Dimensional Limitations slightly Weaker" : "Reach Pelle 75 to see reward",
      pet: "pelle",
      level: 90,
      displayIcon: () => Ra.unlocks.Hostility.isUnlocked ?`<i class="fa-solid fa-biohazard"></i>`:"?"
    },
    kohlersRealmUnlock: {
      id: 6,
      id2: 2,
      reward: () => {
        const remainingLevels = 600 - (Ra.totalPetLevel-Ra.pets.pelle.level);
        const remainingText = remainingLevels===0?"":` (Requires all celestials to be level ${formatInt(100)}, ${quantifyInt("level", remainingLevels)} remaining)`;
        const kohlerUnlocked = Ra.unlocks.kohlersRealmUnlock.isUnlocked;
        const kohlerName = processText("Kohler", makeGarbledTemplate("Kohler"), kohlerUnlocked);
        return `Unlock ${kohlerName}'s Realm${remainingText}`;
      },
      pet: "pelle",
      level: 100,
      displayIcon: () => Ra.unlocks.kohlersRealmUnlock.isUnlocked?`<i class="fa-solid fa-staff-snake"></i>`:"?"
    },
  }
};
