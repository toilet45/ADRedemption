import { GameMechanicState, SetPurchasableMechanicState } from "./game-mechanics";
import { DC } from "./constants";
import { clearCelestialRuns } from "./reality";
import { eternity } from "./eternity";
import { UpgradeableAutobuyerState } from "./autobuyers/autobuyer";
import { perks } from "./secret-formula/reality/perks";
import { MendingUpgrade } from "./mending-upgrades";
import { GameUI } from "./ui";
import { Currency } from "./currency";
import { CorruptionData } from "./corruption";

function lockAchievementsOnMend() {
  //if (Perk.achievementGroup5.isBought) return;
  for (const achievement of Achievements.preMend) {
    achievement.lock();
  }
  player.reality.achTimer = DC.D0;
}

export function mendingResetRequest() {
  if (Player.canMend) askMendingConfirmation();
}
    
  
function askMendingConfirmation() {
  if (player.options.confirmations.mending) {
    Modal.mending.show();
  } 
  else {
    mendingReset();
  }
}

export function mendingReset() {
    Tab.dimensions.antimatter.show() // So before we call anything we force the player onto the antimatter tab, to prevent going to into cel realities wayyyy too early
    EventHub.dispatch(GAME_EVENT.MENDING_RESET_BEFORE)
    //lockAchievementsOnMend();
    if(!Pelle.isDoomed ||(player.isGameEnd && GameEnd.endState >= 14.5)){ //should check if Doomed and not END so people don't get free MvR and mend stat
      Currency.mendingPoints.add(gainedMendingPoints());
      Currency.mends.add(1);
    }
    let x = player.reality.glyphs.protectedRows;
    player.reality.glyphs.protectedRows = 0;
    for (let g = 0; g < 120; g++){
      let glyph = Glyphs.inventory[g];
      if (glyph != null && glyph.type != "companion") GlyphSacrificeHandler.deleteGlyph(glyph, true);
    }
    Glyphs.unequipAll(true);
    for (let h = 0; h < 120; h++){
      let glyph = Glyphs.inventory[h];
      if (glyph != null && glyph.type != "companion") GlyphSacrificeHandler.deleteGlyph(glyph, true);
    }
    player.reality.glyphs.protectedRows = x;
    if(Effarig.currentStage < 6){
      player.reality.glyphs.filter.trash = 0;
      player.reality.glyphs.filter.select = 1;
    }
    player.blackHoleNegative = 1;
    player.isGameEnd = false;
    player.celestials.pelle.doomed = false;
    player.options.hiddenTabBits = 0;
    //Start reseting all the things
    player.challenge= {
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
    }
    if (!Achievement(194).isUnlocked) {
      player.records.totalAntimatter = DC.E1,
      player.challenge.normal.bestTimes = Array.repeat(new Decimal("9.999999999999998e999999999999999900000"), 11);
      player.challenge.infinity.bestTimes = Array.repeat(new Decimal("9.999999999999998e999999999999999900000"), 8);
    }
    //Celestials
    if(!MendingMilestone.ten.isReached){
      player.celestials.teresa.pouredAmount = 0;
      player.celestials.teresa.unlockBits = 0;
    }
    player.celestials.teresa.run = false;
    player.celestials.teresa.bestRunAM = MendingUpgrade(9).isBought ? DC.E1E10 : DC.D1;
    player.celestials.teresa.bestAMSet = [];
    player.celestials.teresa.perkShop = Array.repeat(0, 5);
    if (MendingMilestone.seven.isReached) {
      player.celestials.teresa.perkShop = [20, 20, 14, 6, 0, 0]
    }
    player.celestials.teresa.lastRepeatedMachines = DC.D0;
    if (MendingUpgrade(9).isBought && !MendingMilestone.ten.isReached){
      player.celestials.teresa.unlockBits += 1;
    }
    if(Effarig.currentStage < 6){
      player.celestials.effarig.relicShards = new Decimal(0);
      player.celestials.effarig.unlockBits = 7;
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
    if(MendingUpgrade(7).isBought){
      player.celestials.enslaved.unlocks = [0, 1];
      player.celestials.enslaved.completed = true;
    }
    V.reset();
    if(MendingUpgrade(14).isBought){
      player.celestials.v.runUnlocks = [3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    V.updateTotalRunUnlocks();
    player.celestials.v.quoteBits = 2047;
    if(!Ra.unlocks.raNoReset.isUnlocked) Ra.reset();
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
    player.celestials.ra.quoteBits = 16383;
    Laitela.reset();
    if (MendingUpgrade(4).isBought){
      player.celestials.laitela.difficultyTier = 8;
    }
    player.celestials.laitela.quoteBits = 1023;
    player.celestials.pelle.upgrades.clear();
    player.celestials.pelle.remnants = 0;
    player.celestials.pelle.realityShards = DC.D0;
    player.celestials.pelle.records = {
      totalAntimatter: DC.D0,
      totalInfinityPoints: DC.D0,
      totalEternityPoints: DC.D0,
    },
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
    //Reality
    player.reality.autoAutoClean = false;
    player.reality.glyphs.trash = 0;
    resetRealityRuns();
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
    },
    player.records.bestReality = {
      time: new Decimal("9.999999999999998e999999999999999900000"),
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
    },
    //player.options.confirmations.glyphSelection = true;
    player.reality.unlockedEC = 0;
    Perks.find(0).isBought = true; //give START to fix a bug for hardcoded first Reality Glyph reward
    Perks.find(0).onPurchased();
    if (MendingUpgrade(2).isBought){
      Glyphs.addToInventory(GlyphGenerator.randomGlyph({ actualLevel: 70, rawLevel:70 },undefined, 'power'));
    } // thanks to yodi555
    player.realities = MendingUpgrade(2).isBought ? 10000 : 0;
    for (const perkId of [10, 12, 13, 14, 15, 16, 17, 30, 31, 40, 41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56, 57, 60, 61, 62, 70, 71, 72, 73, 80, 81, 82, 83, 100, 101, 102, 103, 104, 105, 106, 201, 202, 203, 204, 205]) {
      const perk = Perks.find(perkId); //shoutouts to earth for code, yes I could do dev.giveAllPerks or something, but I'm futureproofing for post-Mend perks
      perk.isBought = false;
      if (MendingMilestone.three.isReached){
        perk.isBought = true;
        perk.onPurchased();
      }
    }
    GameUI.update();
    player.reality.upgReqs = 8192;
    player.reality.imaginaryUpgReqs = 0;
    player.reality.upgradeBits = 8192; //Give Telechemical
    if (MendingMilestone.three.isReached){
      player.reality.upgReqs += 1048576; //give Parity
      player.reality.upgradeBits += 1048576;
    }
    player.reality.imaginaryUpgradeBits = 0;
    if (MendingMilestone.three.isReached){
      player.reality.imaginaryUpgReqs += 1048576; //give Vacuum
      player.reality.imaginaryUpgradeBits += 1048576;
    }
    player.reality.upgReqs += 262144
    player.reality.upgradeBits += 262144
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
    for (let i = 1; i <= 5; i++){
      player.reality.rebuyables[i] = MendingMilestone.four.isReached ? 5 : 0;
    }
    for (let i = 1; i <= 10; i++){
      player.reality.imaginaryRebuyables[i] = 0;
    }
    for (let i = 0; i < 2; i++){
      player.blackHole[i].intervalUpgrades = 0;
      player.blackHole[i].powerUpgrades = 0;
      if(MendingMilestone.three.isReached){
        player.blackHole[i].powerUpgrades = 3;
      }
      player.blackHole[i].durationUpgrades = 0;
      player.blackHole[i].phase = 0;
      player.blackHole[i].unlocked = false;
      player.blackHole[i].active = false;
      if (MendingMilestone.three.isReached){
        player.blackHole[i].active = true;
        player.blackHole[i].unlocked = true;
      }
      player.blackHole[i].activations = 0;
    }
    if (MendingUpgrade(4).isBought){
      player.reality.imaginaryUpgReqs += 32768;
      player.reality.imaginaryUpgradeBits += 32768;
    }
    player.expoBlackHole[0].powerUpgrades = 0;
    //Eternity
    resetEternityRuns();
    player.respec = false;
    player.infinitiesBanked = DC.D0;
    player.eternityUpgrades.clear();
    Currency.eternityPoints.reset();
    fullResetTimeDimensions();
    resetTimeDimensions();
    Currency.eternities.reset();
    if (MendingUpgrade(2).isBought){
      Currency.eternities.bumpTo(1000000);
    }
    Currency.timeShards.reset();
    Currency.timeTheorems.reset();
    player.records.bestEternity = {
      time: new Decimal("9.999999999999998e999999999999999900000"),
      realTime: Number.MAX_VALUE,
      bestEPminReality: DC.D0,
    },
    player.records.thisEternity = {
      time: DC.D0,
      realTime: 0,
      maxAM: DC.D0,
      maxIP: DC.D0,
      bestIPMsWithoutMaxAll: DC.D0,
      bestEPmin: DC.D0,
      bestEPminVal: DC.D0,
      bestInfinitiesPerMs: DC.D0,
    },
    player.totalTickGained = 0;
    if (!MendingUpgrade(3).isBought){
      player.eternityChalls = {}
    }
    else{
      for (let i = 1; i <= 12; i++){
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
    player.records.thisEternity = {
      time: DC.D0,
      realTime: 0,
      maxAM: DC.D0,
      maxIP: DC.D0,
      bestIPMsWithoutMaxAll: DC.D0,
      bestEPmin: DC.D0,
      bestEPminVal: DC.D0,
      bestInfinitiesPerMs: DC.D0,
    },
    player.dilation.lastEP = DC.DM1;
    player.eternityUpgrades.clear();
    EternityUpgrade.epMult.reset();
    //Infinity
    resetInfinityRuns();
    player.records.thisInfinity = {
      time: DC.D0,
      realTime: 0,
      lastBuyTime: DC.D0,
      maxAM: DC.D0,
      bestIPmin: DC.D0,
      bestIPminVal: DC.D0,
    },
    player.records.bestInfinity = {
      time: new Decimal("9.999999999999998e999999999999999900000"),
      realTime: Number.MAX_VALUE,
      bestIPminEternity: DC.D0,
      bestIPminReality: DC.D0,
    },
    Currency.infinityPoints.reset();
    InfinityDimensions.fullReset();
    Currency.infinities.reset();
    if (MendingUpgrade(2).isBought){
      Currency.infinities.bumpTo(1e12);
    }
    player.partInfinityPoint = 0;
    player.partInfinitied = 0;
    player.IPMultPurchases = 0;
    Currency.infinityPower.reset();
    Replicanti.reset();
    if(MendingUpgrade(2).isBought){
      player.replicanti.unl = true;
    }
    if(MendingUpgrade(2).isBought){
      InfinityChallenges.completeAll();
    }
    else{
      InfinityChallenges.clearCompletions();
    }
    playerInfinityUpgradesOnReset();
    player.IPMultPurchases = 0;
    //Pre-Infinity
    Currency.antimatter.reset();
    if(MendingMilestone.three.isReached){
      Currency.antimatter.bumpTo(5e130);
    }
    else{ //for some reason I still start with 10 AM even with r78 given, so this is a lazy man's fix
      Currency.antimatter.bumpTo(5e25);
    }
    player.dimensionBoosts =  0;
    player.galaxies =  0;
    player.sacrificed = DC.D0;
    AntimatterDimensions.reset();
    resetTickspeed();
    if (player.records.thisMend.realTime < player.records.bestMend.realTime){
      player.records.bestMend.realTime = player.records.thisMend.realTime;
    }
    if (player.records.thisMend.time.lt(player.records.bestMend.time)){
      player.records.bestMend.time = player.records.thisMend.time;
    }
    //Mending Timer
    player.records.thisMend = {
      time: DC.D0,
      realTime: 0,
      maxAM: DC.D0,
      maxIP: DC.D0,
      maxEP: DC.D0,
      maxRM: DC.D0,
      maxiM: 0,
      maxRem: 0,
    }
    // Finally, lets set up corruptions
    if (CorruptionData.isCorrupted) {
      let scoreCalc = CorruptionData.calcScore()
    // console.log(corruptionChallengeScoreCalculation())
      if (CorruptionData.corruptionChallenge.recordScore < scoreCalc) {
        player.mending.corruptionChallenge.records = player.mending.corruption
        player.mending.corruptionChallenge.recordScore = scoreCalc
      }
     player.mending.corruptedFragments = Math.ceil(Math.max(CorruptionData.corruptedFragments, Math.log2(scoreCalc))) // Make sure the player doesnt decrease their own corrupted frag count
     player.mending.corruptionUpgradeBits = 0 // Basically a respec call
     player.mending.corruptionChallenge.corruptedMend = false
   }
   // Its crucial we do this after, else the player will corrupt and instantly complete a corruption
    if (player.mending.corruptNext) {
      player.mending.corruptNext = false
      player.mending.corruptionChallenge.corruptedMend = true
    }
    CorruptionData.update()
    Player.resetRequirements("mending");
    //end reseting all the things


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

export class MendingMilestoneState{
    constructor(config) {
      this.config = config;
    }
  
    get isReached() {
      return Currency.mends.gte(this.config.mends);
    }

    get effect() {
      if (this.config.effect == undefined || !this.isReached || this.config.effect == null) return 1;
      return this.config.effect
    }
  }

export const MendingMilestone = mapGameDataToObject(
    GameDatabase.mending.milestones,
    config => new MendingMilestoneState(config)
  );


  