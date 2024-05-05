/* eslint-disable sort-imports */
/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
/* eslint-disable eqeqeq */
import { DC } from "./constants";
import { MendingUpgrade } from "./mending-upgrades";
import { GameUI } from "./ui";
import { Currency } from "./currency";
import { CorruptionData } from "./corruption";
import { CorruptionUpgrade, VUnlocks } from "./globals";
import { corruptionPenalties } from "./secret-formula/mending/corruption";

export function mendingResetRequest() {
  if (Player.canMend) askMendingConfirmation();
}


function askMendingConfirmation() {
  if (player.options.confirmations.mending) {
    Modal.mending.show();
  } else {
    mendingReset();
  }
}

// eslint-disable-next-line complexity
export function mendingReset(gain = true, toggleKohler = false) {
  // There seemed to be some jank with V's quoteBits being reset, lazy man's fix
  const vBitsEarned = player.celestials.v.quoteBits;
  EventHub.dispatch(GAME_EVENT.MENDING_RESET_BEFORE);
  // Finally, lets set up corruptions
  // hello, due to some upgrade need record to involve, corruption should be at first sry.--sxy

  // First, do respec before anything else. We dont want to fuck the player over
  // If HU20 is bought, however, we want to save this for score calc
  const HU20wasBought = CorruptionUpgrade(20).isBought;
  // Same from 13, for later
  const HU13wasBought = CorruptionUpgrade(13).isBought;
  let cuPreRespec = 0;
  for (let i = 1; i <= 25; i++) {
    if (CorruptionUpgrade(i).isBought) {
      cuPreRespec += CorruptionUpgrade(i).cost;
    }
  }
  if (player.mending.cuRespec) {
    player.mending.corruptedFragments += cuPreRespec;
    player.mending.corruptionUpgradeBits = 0;
  }
  // Lets be honest, people arent going to reach galGen if they cant reasonably get e9e15 out of it.
  // Also cause better code, we dont need to respec on corruption
  if (CorruptionData.isCorrupted && !Kohler.isRunning) {
    const score = CorruptionData.calcScore(HU20wasBought);
    const recScore = player.mending.corruptionChallenge.recordScore < score;
    player.mending.corruptionChallenge.recordScore = Math.max(player.mending.corruptionChallenge.recordScore, score);
    player.mending.corruptionChallenge.corruptedMend = false;
    // Calculate fragments, and take either this value or cuPreRespec (if respecing)
    const fragsFromScore = Math.log2(player.mending.corruptionChallenge.recordScore);
    player.mending.corruptedFragments += fragsFromScore - (cuPreRespec + player.mending.corruptedFragments);
    if (recScore) {
      player.mending.corruptionChallenge.records = player.mending.corruption;
    }
  }
  if (player.mending.corruptedFragments > Math.log2(CorruptionData.recordScore + 5)) {
    player.mending.corruptionChallenge.corruptedMend = false;
    player.mending.cuRespec = true;
    mendingReset();
    player.mending.corruptedFragments = 0;
    return;
  }
  // Only turns true if not already corrupted
  player.mending.corruptionChallenge.corruptedMend = player.mending.corruptNext;
  // Finally, turn off respec and update CorruptionData
  CorruptionData.update();
  player.mending.cuRespec = false;

  // Force to AM tab if the tab they are on is no longer unlocked, to prevent early cel access
  if ((Tabs.current._currentSubtab.config.condition !== undefined && !Tabs.current._currentSubtab.config.condition()) ||
  (Tabs.current.config.condition !== undefined && !Tabs.current.config.condition())) {
    Tab.dimensions.antimatter.show();
  }
  // Should check if Doomed and not END so people don't get free MvR and mend stat
  if (gain && (!Kohler.isRunning || !Pelle.isDoomed ||
    player.celestials.pelle.records.totalAntimatter.plus(1).log10() >= 9e15)) {
    Currency.mendingPoints.add(gainedMendingPoints(HU13wasBought));
    Currency.mends.add(1);
  }

  if (Kohler.isRunning) {
    Currency.kohlerPoints.add(gainedKohlerPoints());
    player.bestKohlerPoints = Decimal.max(Currency.kohlerPoints.value, player.bestKohlerPoints);
  }

  if (Effarig.isRunning && !EffarigUnlock.mend.isUnlocked &&
  Ra.unlocks.effarigMendUnlock.isUnlocked && !Kohler.isRunning) {
    Quotes.effarig.mendCompleted.show();
    player.celestials.effarig.maxUnlockBits |= 255;
    for (let i = 0; i < Glyphs.inventory.length; i++) {
      if (Glyphs.inventory[i] != null && Glyphs.inventory[i].type === "companion") {
        Quotes.effarig.hasCompanion.show();
        break;
      }
    }
    EffarigUnlock.mend.unlock();
    EffarigUnlock.infinity.unlock();
    EffarigUnlock.eternity.unlock();
    EffarigUnlock.reality.unlock();
  }

  const x = player.reality.glyphs.protectedRows;
  player.reality.glyphs.protectedRows = 0;
  for (let g = 0; g < 120; g++) {
    const glyph = Glyphs.inventory[g];
    if (glyph != null && glyph.type != "companion") GlyphSacrificeHandler.deleteGlyph(glyph, true);
  }
  Glyphs.unequipAll(true);
  for (let h = 0; h < 120; h++) {
    const glyph = Glyphs.inventory[h];
    if (glyph != null && glyph.type != "companion") GlyphSacrificeHandler.deleteGlyph(glyph, true);
  }
  player.reality.glyphs.protectedRows = x;
  /* If(Effarig.currentStage < 6){
      player.reality.glyphs.filter.trash = 0;
      player.reality.glyphs.filter.select = 1;
    }*/ // why reset--sxy
  player.blackHoleNegative = 1;
  player.isGameEnd = false;
  if (toggleKohler || Kohler.isRunning) {
    // Tab.dimensions.antimatter.show();
    player.transcendents.kohler.run = !player.transcendents.kohler.run;
  }
  player.celestials.pelle.doomed = false;
  player.options.hiddenTabBits = 0;
  // Start reseting all the things
  player.challenge = {
    normal: {
      current: 0,
      completedBits: 0,
      bestTimes: player.challenge.normal.bestTimes,
    },
    infinity: {
      current: 0,
      completedBits: 0,
      bestTimes: player.challenge.infinity.bestTimes,
    },
    eternity: {
      current: 0,
      unlocked: 0,
      requirementBits: 0,
    }
  };
  if (!Achievement(194).isUnlocked) {
    // eslint-disable-next-line no-unused-expressions
    player.records.totalAntimatter = DC.E1;
    player.challenge.normal.bestTimes = Array.repeat(Decimal.pow10(Number.MAX_VALUE), 11);
    player.challenge.infinity.bestTimes = Array.repeat(Decimal.pow10(Number.MAX_VALUE), 8);
  }
  // Celestials
  if (!MendingMilestone.ten.isReached || Kohler.isRunning) {
    player.celestials.teresa.pouredAmount = 0;
    player.celestials.teresa.unlockBits = 0;
  } else if (MendingMilestone.ten.isReached) {
    player.celestials.teresa.pouredAmount = player.celestials.teresa.recordPouredAmount;
    player.celestials.teresa.unlockBits = 63;
  }
  player.celestials.teresa.run = false;
  player.celestials.teresa.bestRunAM = (MendingUpgrade(9).isBought && !Kohler.isRunning) ? DC.E1E10 : DC.D1;
  player.celestials.teresa.bestAMSet = [];
  player.celestials.teresa.perkShop = Array.repeat(0, 5);
  if (MendingMilestone.seven.isReached && !Kohler.isRunning) {
    player.celestials.teresa.perkShop = [20, 20, 14, 6, 0, 0];
    if (CorruptionUpgrade(5).isBought && !Kohler.isRunning) player.celestials.teresa.perkShop = [65, 65, 14, 6, 0, 0];
  }
  player.celestials.teresa.lastRepeatedMachines = DC.D0;
  if (MendingUpgrade(9).isBought && !MendingMilestone.ten.isReached) {
    player.celestials.teresa.unlockBits += 1;
  }
  if (Effarig.currentStage < 6 || Kohler.isRunning) {
    player.celestials.effarig.relicShards = new Decimal(0);
    player.celestials.effarig.unlockBits = 7;
  }
  if (player.celestials.effarig.maxUnlockBits >= 255 && !Kohler.isRunning) {
    player.celestials.effarig.unlockBits = player.celestials.effarig.maxUnlockBits;
  }
  if (player.celestials.effarig.unlockBits >= 255) {
    player.celestials.effarig.maxUnlockBits = player.celestials.effarig.unlockBits;
  }
  player.celestials.effarig.run = false;
  player.celestials.enslaved.stored = DC.D0;
  player.celestials.enslaved.storedReal = 0;
  player.celestials.enslaved.isAutoReleasing = false;
  player.celestials.enslaved.unlocks = [];
  player.celestials.enslaved.run = false;
  player.celestials.enslaved.completed = false;
  player.celestials.enslaved.tesseracts = 0;
  player.celestials.enslaved.hasSecretStudy = false;
  player.celestials.enslaved.progressBits = 0;
  if (MendingUpgrade(7).isBought) {
    player.celestials.enslaved.unlocks = [0, 1];
    player.celestials.enslaved.completed = true;
  }
  if (!VUnlocks.vKeep.isUnlocked || Kohler.isRunning) {
    V.reset();
    if (MendingUpgrade(14).isBought && !Kohler.isRunning) {
      player.celestials.v.runUnlocks = [3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    if (player.celestials.v.recordSpaceTheorems >= 390 && !Kohler.isRunning) {
      player.celestials.v.runUnlocks = player.celestials.v.recordRunUnlocks;
      player.celestials.v.unlockBits |= 1;
      // This.spaceTheorems = player.celestials.v.recordSpaceTheorems;
    }
  }
  V.updateTotalRunUnlocks();
  player.celestials.v.quoteBits |= vBitsEarned;
  if (!Ra.unlocks.raNoReset.isUnlocked) Ra.reset();
  player.celestials.ra.petWithRemembrance = "";
  player.celestials.ra.alchemy = Array.repeat(0, 21)
    .map(() => ({
      amount: 0,
      reaction: false
    }));
  player.celestials.ra.highestRefinementValue = {
    power: 0,
    infinity: 0,
    time: 0,
    replication: 0,
    dilation: 0,
    effarig: 0
  };
  // Player.celestials.ra.quoteBits = 16383;
  player.celestials.ra.run = false;
  if (player.mending.corruptNext || !KohlerProgressUnlocks.hostileScore.isUnlocked) {
    player.celestials.ra.charged = new Set();
    player.celestials.ra.breakCharged = new Set();
  }
  Laitela.reset();
  if (MendingUpgrade(4).isBought) {
    player.celestials.laitela.difficultyTier = 8;
    player.celestials.laitela.fastestCompletion = 300;
  }
  if (Ra.unlocks.dmdAuto2.canBeApplied) {
    Currency.darkEnergy.bumpTo(2e7);
  }
  // Player.celestials.laitela.quoteBits = 1023;
  player.celestials.pelle.upgrades.clear();
  player.celestials.pelle.remnants = 0;
  player.celestials.pelle.realityShards = DC.D0;
  // eslint-disable-next-line no-unused-expressions
  player.celestials.pelle.records = {
    totalAntimatter: DC.D0,
    totalInfinityPoints: DC.D0,
    totalEternityPoints: DC.D0,
  };
  player.celestials.pelle.rebuyables.antimatterDimensionMult = 0;
  player.celestials.pelle.rebuyables.timeSpeedMult = 0;
  player.celestials.pelle.rebuyables.glyphLevels = 0;
  player.celestials.pelle.rebuyables.infConversion = 0;
  player.celestials.pelle.rebuyables.galaxyPower = 0;
  player.celestials.pelle.rebuyables.galaxyGeneratorAdditive = 0;
  player.celestials.pelle.rebuyables.galaxyGeneratorMultiplicative = 0;
  player.celestials.pelle.rebuyables.AntimatterMult = 0;
  player.celestials.pelle.rebuyables.galaxyGeneratorIPMult = 0;
  player.celestials.pelle.rebuyables.galaxyGeneratorEPMult = 0;
  player.celestials.pelle.rifts.vacuum.fill = DC.D0;
  player.celestials.pelle.rifts.vacuum.active = false;
  player.celestials.pelle.rifts.vacuum.reducedTo = 1;
  player.celestials.pelle.rifts.decay.fill = DC.D0;
  player.celestials.pelle.rifts.decay.active = false;
  player.celestials.pelle.rifts.decay.percentageSpent = 0;
  player.celestials.pelle.rifts.decay.reducedTo = 1;
  player.celestials.pelle.rifts.chaos.fill = 0;
  player.celestials.pelle.rifts.chaos.active = false;
  player.celestials.pelle.rifts.chaos.reducedTo = 1;
  player.celestials.pelle.rifts.recursion.fill = DC.D0;
  player.celestials.pelle.rifts.recursion.active = false;
  player.celestials.pelle.rifts.recursion.reducedTo = 1;
  player.celestials.pelle.rifts.paradox.fill = DC.D0;
  player.celestials.pelle.rifts.paradox.active = false;
  player.celestials.pelle.rifts.paradox.reducedTo = 1;
  player.celestials.pelle.progressBits = 0;
  player.celestials.pelle.galaxyGenerator.unlocked = false;
  player.celestials.pelle.galaxyGenerator.spentGalaxies = 0;
  player.celestials.pelle.galaxyGenerator.generatedGalaxies = 0;
  player.celestials.pelle.galaxyGenerator.phase = 0;
  player.celestials.pelle.galaxyGenerator.sacrificeActive = false;
  player.celestials.pelle.collapsed.upgrades = false;
  player.celestials.pelle.collapsed.rifts = false;
  player.celestials.pelle.collapsed.galaxies = false;
  // Reality
  // player.reality.autoAutoClean = false; //excuse me why you reset this option--sxy
  // player.reality.glyphs.trash = 0; //exm --sxy
  resetRealityRuns();
  // eslint-disable-next-line no-unused-expressions
  player.records.thisReality = {
    time: DC.D0,
    realTime: 0,
    maxAM: DC.D0,
    maxIP: DC.D0,
    maxEP: DC.D0,
    bestEternitiesPerMs: DC.D0,
    maxReplicanti: DC.D0,
    maxDT: DC.D0,
    bestRSmin: DC.D0,
    bestRSminVal: DC.D0,
    remWithoutGG: 0
  };
  player.records.bestReality = {
    time: Decimal.pow10(Number.MAX_VALUE),
    realTime: Number.MAX_VALUE,
    glyphStrength: 0,
    RM: DC.D0,
    RMSet: [],
    RMmin: DC.D0,
    RMminSet: [],
    glyphLevel: 0,
    glyphLevelSet: [],
    bestEP: DC.D0,
    bestEPSet: [],
    speedSet: [],
    iMCapSet: [],
    laitelaSet: [],
    remWithoutGG: player.records.bestReality.remWithoutGG
  };
  // Player.options.confirmations.glyphSelection = true;
  player.reality.unlockedEC = 0;
  Perks.find(0).isBought = true; // Give START to fix a bug for hardcoded first Reality Glyph reward
  Perks.find(0).onPurchased();

  player.realities = MendingUpgrade(2).isBought ? 10000 : 0;

  // Shoutout to earth for code,  could do dev.giveAllPerks or something, but futureproofing for post-Mend perks
  for (const perkId of [10, 12, 13, 14, 15, 16, 17, 30, 31, 40, 41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56,
    57, 60, 61, 62, 70, 71, 72, 73, 80, 81, 82, 83, 100, 101, 102, 103, 104, 105, 106, 201, 202, 203, 204, 205]) {
    const perk = Perks.find(perkId);
    perk.isBought = false;
    if (MendingMilestone.three.isReached && !Kohler.isRunning) {
      perk.isBought = true;
      perk.onPurchased();
    } else if (Kohler.isRunning) {
      if (KohlerMilestone(11).isUnlocked) {
        for (const perkIdKR of [10, 30]) {
          const perkKR = Perks.find(perkIdKR);
          perkKR.isBought = true;
          perkKR.onPurchased();
        }
      }
    }
  }
  GameUI.update();
  player.reality.upgReqs = 8192;
  player.reality.imaginaryUpgReqs = 0;
  player.reality.upgradeBits = 8192; // Give Telechemical
  if (MendingMilestone.three.isReached) {
    player.reality.upgReqs += 1048576; // Give Parity
    player.reality.upgradeBits += 1048576;
  }
  player.reality.imaginaryUpgradeBits = 0;
  if (MendingMilestone.three.isReached) {
    player.reality.imaginaryUpgReqs += 1048576; // Give Vacuum
    player.reality.imaginaryUpgradeBits += 1048576;
  }
  player.reality.upgReqs += 262144;
  player.reality.upgradeBits += 262144;
  // This gives Measure of Forever and fixes any bugs related to it
  player.reality.realityMachines = DC.D0;
  player.reality.reqLock.reality = 0;
  player.reality.reqLock.imaginary = 0;
  player.reality.imaginaryMachines = 0;
  player.reality.maxRM = DC.D0;
  player.reality.iMCap = 0;
  player.reality.glyphs.sac.power = DC.D0;
  player.reality.glyphs.sac.infinity = DC.D0;
  player.reality.glyphs.sac.replication = DC.D0;
  player.reality.glyphs.sac.time = DC.D0;
  player.reality.glyphs.sac.dilation = DC.D0;
  player.reality.glyphs.sac.effarig = DC.D0;
  player.reality.glyphs.sac.reality = DC.D0;
  player.reality.glyphs.undo = [];
  player.reality.perkPoints = 0;
  for (let i = 1; i <= 5; i++) {
    player.reality.rebuyables[i] = MendingMilestone.four.isReached ? 5 : 0;
  }
  for (let i = 1; i <= 10; i++) {
    player.reality.imaginaryRebuyables[i] = 0;
  }
  for (let i = 0; i < 2; i++) {
    player.blackHole[i].intervalUpgrades = 0;
    player.blackHole[i].powerUpgrades = 0;
    if (MendingMilestone.three.isReached) {
      player.blackHole[i].powerUpgrades = 3;
    }
    player.blackHole[i].durationUpgrades = 0;
    player.blackHole[i].phase = 0;
    player.blackHole[i].unlocked = false;
    player.blackHole[i].active = false;
    if (MendingMilestone.three.isReached) {
      player.blackHole[i].active = true;
      player.blackHole[i].unlocked = true;
    }
    player.blackHole[i].activations = 0;
    BlackHole(i + 1).powerUpgrade._lazyValue.invalidate();// Exm? It turns out that this was kept all along?--sxy
    BlackHole(i + 1).powerUpgrade._lazyCost.invalidate();
  }
  if (MendingUpgrade(4).isBought) {
    player.reality.imaginaryUpgReqs += 32768;
    player.reality.imaginaryUpgradeBits += 32768;
  }
  for (let i = 0; i < 1; i++) {
    player.expoBlackHole[i].powerUpgrades = 0;
    player.expoBlackHole[i].activations = 0;
    ExpoBlackHole(i + 1).powerUpgrade._lazyValue.invalidate();// There must be a better fix for this--sxy
    ExpoBlackHole(i + 1).powerUpgrade._lazyCost.invalidate();
  }
  // Eternity
  resetEternityRuns();
  player.respec = false;
  player.infinitiesBanked = DC.D0;
  player.eternityUpgrades.clear();
  Currency.eternityPoints.reset();
  fullResetTimeDimensions();
  resetTimeDimensions();
  Currency.eternities.reset();
  if (MendingUpgrade(2).isBought) {
    Currency.eternities.bumpTo(1000000);
  }
  Currency.timeShards.reset();
  Currency.timeTheorems.reset();
  // eslint-disable-next-line no-unused-expressions
  player.records.bestEternity = {
    time: Decimal.pow10(Number.MAX_VALUE),
    realTime: Number.MAX_VALUE,
    bestEPminReality: DC.D0,
  };
  player.records.thisEternity = {
    time: DC.D0,
    realTime: 0,
    maxAM: DC.D0,
    maxIP: DC.D0,
    bestIPMsWithoutMaxAll: DC.D0,
    bestEPmin: DC.D0,
    bestEPminVal: DC.D0,
    bestInfinitiesPerMs: DC.D0,
  };
  player.totalTickGained = 0;
  if (!MendingUpgrade(3).isBought || Kohler.isRunning) {
    player.eternityChalls = {};
  } else {
    for (let i = 1; i <= 12; i++) {
      EternityChallenge(i).completions = 5;
    }
  }
  player.eterc8ids = 50;
  player.eterc8repl = 40;
  player.dilation.studies = [];
  player.dilation.active = false;
  player.dilation.upgrades.clear();
  player.dilation.rebuyables = {
    1: 0,
    2: 0,
    3: 0,
    11: 0,
    12: 0,
    13: 0
  };
  Currency.tachyonParticles.reset();
  player.dilation.nextThreshold = DC.E3;
  player.dilation.baseTachyonGalaxies = 0;
  player.dilation.totalTachyonGalaxies = 0;
  Currency.dilatedTime.reset();
  // eslint-disable-next-line no-unused-expressions
  player.records.thisEternity = {
    time: DC.D0,
    realTime: 0,
    maxAM: DC.D0,
    maxIP: DC.D0,
    bestIPMsWithoutMaxAll: DC.D0,
    bestEPmin: DC.D0,
    bestEPminVal: DC.D0,
    bestInfinitiesPerMs: DC.D0,
  };
  player.dilation.lastEP = DC.DM1;
  player.eternityUpgrades.clear();
  EternityUpgrade.epMult.reset();
  // Infinity
  resetInfinityRuns();
  // eslint-disable-next-line no-unused-expressions
  player.records.thisInfinity = {
    time: DC.D0,
    realTime: 0,
    lastBuyTime: DC.D0,
    maxAM: DC.D0,
    bestIPmin: DC.D0,
    bestIPminVal: DC.D0,
  };
  player.records.bestInfinity = {
    time: Decimal.pow10(Number.MAX_VALUE),
    realTime: Number.MAX_VALUE,
    bestIPminEternity: DC.D0,
    bestIPminReality: DC.D0,
  };
  Currency.infinityPoints.reset();
  InfinityDimensions.fullReset();
  Currency.infinities.reset();
  if (MendingUpgrade(2).isBought) {
    Currency.infinities.bumpTo(1e12);
  }
  player.partInfinityPoint = 0;
  player.partInfinitied = 0;
  player.IPMultPurchases = 0;
  Currency.infinityPower.reset();
  Replicanti.reset();
  if (MendingUpgrade(2).isBought) {
    player.replicanti.unl = true;
  }
  if (MendingUpgrade(2).isBought) {
    for (let ic = 1; ic < 9; ic++)
      InfinityChallenge(ic).complete();
  } else {
    InfinityChallenges.clearCompletions();
  }
  playerInfinityUpgradesOnReset();
  player.IPMultPurchases = 0;
  // Pre-Infinity
  Currency.antimatter.reset();
  if (!Kohler.isRunning) {
    if (MendingMilestone.three.isReached) {
      Currency.antimatter.bumpTo(5e130);
    } else { // For some reason I still start with 10 AM even with r78 given, so this is a lazy man's fix
      Currency.antimatter.bumpTo(5e25);
    }
  }
  player.dimensionBoosts = (Kohler.isRunning && KohlerUpgrade(7).isBought) ? 5 : 0;
  player.galaxies = (Kohler.isRunning && KohlerUpgrade(7).isBought) ? 1 : 0;
  player.sacrificed = DC.D0;
  AntimatterDimensions.reset();
  if (Kohler.isRunning && KohlerUpgrade(8).isBought)player.dimensions.antimatter[7].amount = new Decimal(1);
  resetTickspeed();
  if (player.records.thisMend.realTime < player.records.bestMend.realTime) {
    player.records.bestMend.realTime = player.records.thisMend.realTime;
  }
  if (player.records.thisMend.time.lt(player.records.bestMend.time)) {
    player.records.bestMend.time = player.records.thisMend.time;
  }
  // Mending Timer
  player.records.thisMend = {
    time: DC.D0,
    realTime: 0,
    maxAM: DC.D0,
    maxIP: DC.D0,
    maxEP: DC.D0,
    maxRM: DC.D0,
    maxiM: 0,
    maxRem: 0,
  };

  // Its crucial we do this after, else the player will corrupt and instantly complete a corruption
  if (player.mending.corruptNext) {
    let corruptionZeroCheck = true;
    for (let i = 0; i < 10; i++) {
      if (CorruptionData.corruptions[i] != 0) corruptionZeroCheck = false;
    }
    player.mending.corruptNext = false;
    if (!corruptionZeroCheck)player.mending.corruptionChallenge.corruptedMend = true;
  }
  CorruptionData.update();

  if (MendingUpgrade(2).isBought) {
    let MedingInitLevel = 70;
    let MedingInitRarity = 70;
    if (player.mending.corruptionChallenge.corruptedMend) {
      MedingInitLevel = Math.pow(MedingInitLevel, corruptionPenalties.compGlyphs.level[player.mending.corruption[4]]);
      MedingInitLevel *= (corruptionPenalties.compGlyphs.level[player.mending.corruption[4]]);
      MedingInitLevel = Math.ceil(MedingInitLevel);
      MedingInitRarity = Math.pow(MedingInitRarity, corruptionPenalties.compGlyphs
        .rarity[player.mending.corruption[4]]);
      MedingInitRarity *= (corruptionPenalties.compGlyphs.rarity[player.mending.corruption[4]]);
      MedingInitRarity = Math.ceil(MedingInitRarity * 100) / 100;
    }
    Glyphs.addToInventory(GlyphGenerator.randomGlyph(
      { actualLevel: MedingInitLevel, rawLevel: MedingInitRarity }, undefined, "power"));
  } // Thanks to yodi555
  // this has to be moved here to get corrupt condition--sxy


  Player.resetRequirements("mending");
  // End reseting all the things


  NormalChallenges.completeAll();
  player.break = true;
  for (const autobuyer of Autobuyers.all) {
    if (autobuyer.data.interval !== undefined) autobuyer.maxIntervalForFree();
  }
  EventHub.dispatch(GAME_EVENT.MENDING_RESET_AFTER);

  Glyphs.refreshActive();
  EventHub.dispatch(GAME_EVENT.GLYPHS_EQUIPPED_CHANGED);
  if (player.options.automatorEvents.clearOnReality) AutomatorData.clearEventLog();
  if (Player.automatorUnlocked && AutomatorBackend.state.forceRestart) {
    // Make sure to restart the current script instead of using the editor script - the editor script might
    // not be a valid script to run; this at best stops it from running and at worst causes a crash
    AutomatorBackend.start(AutomatorBackend.state.topLevelScript);
  }
}

export class MendingMilestoneState {
  constructor(config) {
    this.config = config;
  }

  get isReached() {
    return Currency.mends.gte(this.config.mends);
  }

  get effect() {
    if (this.config.effect == undefined || !this.isReached || this.config.effect == null) return 1;
    return this.config.effect;
  }
}

export const MendingMilestone = mapGameDataToObject(
  GameDatabase.mending.milestones,
  config => new MendingMilestoneState(config)
);

