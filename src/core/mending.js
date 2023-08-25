import { GameMechanicState, SetPurchasableMechanicState } from "./game-mechanics";
import { DC } from "./constants";
import { clearCelestialRuns } from "./reality";
import { eternity } from "./eternity";
import { UpgradeableAutobuyerState } from "./autobuyers/autobuyer";
import { perks } from "./secret-formula/reality/perks";
import { MendingUpgrade } from "./mending-upgrades";
import { GameUI } from "./ui";
import { Currency } from "./currency";

function lockAchievementsOnMend() {
  //if (Perk.achievementGroup5.isBought) return;
  for (const achievement of Achievements.preMend) {
    achievement.lock();
  }
  player.reality.achTimer = 0;
}

export function mendingResetRequest() {
  if (Player.canMend) askMendingConfirmation();
}
    
  
function askMendingConfirmation() {
  mendingReset();
  /*if (player.options.confirmations.mending) {
    Modal.mending.show();
  } 
  else {
      mendingReset();
  }*/
}

export function mendingReset() {
    EventHub.dispatch(GAME_EVENT.MENDING_RESET_BEFORE)
    //lockAchievementsOnMend();
    Tab.dimensions.antimatter.show();
    player.blackHoleNegative = 1;
    player.isGameEnd = false;
    player.celestials.pelle.doomed = false;
    player.options.hiddenTabBits = 0;
    Currency.mendingPoints.add(gainedMendingPoints());
    Currency.mends.add(1);
    //Start reseting all the things
    player.records.totalAntimatter = DC.E1,
    //Challenge Times
    player.challenge= {
      normal: {
        current: 0,
        bestTimes: Array.repeat(Number.MAX_VALUE, 11),
        completedBits: 0,
      },
      infinity: {
        current: 0,
        bestTimes: Array.repeat(Number.MAX_VALUE, 8),
        completedBits: 0,
      },
      eternity: {
        current: 0,
        unlocked: 0,
        requirementBits: 0,
      }
    },
    //Celestials
    player.celestials.teresa.pouredAmount = 0;
    player.celestials.teresa.unlockBits = 0;
    if (MendingUpgrade(9).isBought){
      player.celestials.teresa.unlockBits += 1;
    }
    player.celestials.teresa.run = false;
    player.celestials.teresa.bestRunAM = MendingUpgrade(9).isBought ? DC.E1E10 : DC.D1;
    player.celestials.teresa.bestAMSet = [];
    player.celestials.teresa.perkShop = Array.repeat(0, 5);
    player.celestials.teresa.lastRepeatedMachines = DC.D0;
    player.celestials.effarig.relicShards = 0;
    player.celestials.effarig.unlockBits = 7;
    player.celestials.effarig.run = false;
    player.celestials.enslaved.stored = 0;
    player.celestials.enslaved.storedReal = 0;
    player.celestials.enslaved.isAutoReleasing = false;
    player.celestials.enslaved.unlocks = [];
    player.celestials.enslaved.run = false;
    player.celestials.enslaved.completed = false;
    player.celestials.enslaved.tesseracts = 0;
    player.celestials.enslaved.hasSecretStudy = false;
    player.celestials.enslaved.progressBits = 0;
    V.reset();
    player.celestials.v.quoteBits = 2047;
    Ra.reset();
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
      time: 0,
      realTime: 0,
      maxAM: DC.D0,
      maxIP: DC.D0,
      maxEP: DC.D0,
      bestEternitiesPerMs: DC.D0,
      maxReplicanti: DC.D0,
      maxDT: DC.D0,
      bestRSmin: 0,
      bestRSminVal: 0,
    },
    player.records.bestReality = {
      time: Number.MAX_VALUE,
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
    },
    player.options.confirmations.glyphSelection = true;
    player.reality.unlockedEC = 0;
    Glyphs.unequipAll(true);
    let x = player.reality.glyphs.protectedRows;
    player.reality.glyphs.protectedRows = 0;
    Glyphs.deleteAllUnprotected();
    player.reality.glyphs.protectedRows = x;
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

    player.reality.realityMachines = DC.D0;
    player.reality.reqLock.reality = 0;
    player.reality.reqLock.imaginary = 0;
    player.reality.imaginaryMachines = 0;
    player.reality.maxRM = DC.D0;
    player.reality.iMCap = 0;
    player.reality.glyphs.sac.power = 0;
    player.reality.glyphs.sac.infinity = 0;
    player.reality.glyphs.sac.replication = 0;
    player.reality.glyphs.sac.time = 0;
    player.reality.glyphs.sac.dilation = 0;
    player.reality.glyphs.sac.effarig = 0;
    player.reality.glyphs.sac.reality = 0;
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
      time: Number.MAX_VALUE,
      realTime: Number.MAX_VALUE,
      bestEPminReality: DC.D0,
    },
    player.records.thisEternity = {
      time: 0,
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
      time: 0,
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
      time: 0,
      realTime: 0,
      lastBuyTime: 0,
      maxAM: DC.D0,
      bestIPmin: DC.D0,
      bestIPminVal: DC.D0,
    },
    player.records.bestInfinity = {
      time: Number.MAX_VALUE,
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
    //Mending Timer
    player.records.thisMend = {
      time: 0,
      realTime: 0,
      maxAM: DC.D0,
      maxIP: DC.D0,
      maxEP: DC.D0,
      maxRM: DC.D0,
      maxiM: DC.D0,
      maxRem: 0,
    },
    Player.resetRequirements("mending");
    //end reseting all the things


    NormalChallenges.completeAll();
    player.break = true;
    for (const autobuyer of Autobuyers.all) {
      if (autobuyer.data.interval !== undefined) autobuyer.maxIntervalForFree();
    }
    EventHub.dispatch(GAME_EVENT.MENDING_RESET_AFTER)
}


export class MendingMilestoneState{
    constructor(config) {
      this.config = config;
    }
  
    get isReached() {
      return Currency.mends.gte(this.config.mends);
    }
  }

export const MendingMilestone = mapGameDataToObject(
    GameDatabase.mending.milestones,
    config => new MendingMilestoneState(config)
  );


  