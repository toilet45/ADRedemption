import { Currency } from "../currency";
import { BitUpgradeState, RebuyableMechanicState } from "../game-mechanics";
import { GameDatabase } from "../secret-formula/game-database";

import { Quotes } from "./quotes";

export const Kohler = {
  get displayName(){
    return player.celestials.kohler.quoteBits >= 7 ? "Kohler" : "???"
  },
  get possessiveName(){
    return player.celestials.kohler.quoteBits >= 7 ? "Kohler's" : "???'s"
  },
  get isUnlocked() {
    return false;
  },
  get isRunning(){
    return player.transcendents.kohler.run;
  },
  get isTrueRunning(){ //this is the final Transcendent
    return player.transcendents.kohler.trueRun;
  },
  quotes: Quotes.kohler,
  get symbol(){ 
    return player.celestials.kohler.quoteBits >= 7 ? "<i class='fa-solid fa-staff-snake'></i>" : "?"
  },

  get unlockProgress() {
    let Progress = 5;
    let stage1 = Math.min(15*Math.log10(CorruptionData.corruptionChallenge.recordScore)/Math.log10(5e6),15)
    Progress += stage1;
    if(stage1<15){
      return parseFloat(Progress.toFixed(2));
    }
    let stage2 = Math.min(15*Math.ceil(CorruptionData.recordCorruptedFragments)/40,15);
    Progress += stage2;
    if(stage2<15){
      return parseFloat(Progress.toFixed(2));
    }
    let stage3 = Math.min(30*(Math.log10(Decimal.log10(Currency.antimatter.value))-20)/5,30);
    if(stage3<0) stage3=0;
    if(player.celestials.kohler.unlockMilestone[4]) stage3=30;
    Progress += stage3;
    if (MultiversalDimension(3).amount.gt(0) && Progress === 65){
      return 100;
    }
    return parseFloat(Progress.toFixed(2));
  },
  checkForUnlocks() {
    for (const info of KohlerProgressUnlocks.all) {
      info.unlock();
    }
  },
  checkForQuotes() {
    for (const quote of Kohler.quotes.all) {
      // Quotes without requirements will be shown in other ways
      if (quote.requirement) {
        quote.show();
      }
    }
  },
  setUnlockProgress() {
    player.celestials.kohler.unlockProgress = this.unlockProgress();
  }
};

class KohlerProgressUnlockState extends BitUpgradeState {
  get bits() { return player.celestials.kohler.unlockProgress; }
  set bits(value) { player.celestials.kohler.unlockProgress = value; }

  get isEffectActive() {
    return this.isUnlocked;
  }

  get isUnlocked() {
    if(player.celestials.kohler.unlockMilestone[this.config.id]) return true;
    let unlocked = typeof this.config.condition === "function" ? this.config.condition() : this.config.condition;
    if (unlocked) player.celestials.kohler.unlockMilestone[this.config.id] = true;
    return /*!this.isUnlocked &&*/ unlocked;
  }

  get description() {
    return typeof this.config.description === "function" ? this.config.description() : this.config.description;
  }

  onUnlock() {
    this.config.onUnlock?.();
  }
}

export const KohlerProgressUnlocks = mapGameDataToObject(
  GameDatabase.mending.kohlerUnlockProgress.progressUnlocks,
  config => new KohlerProgressUnlockState(config)
);

EventHub.logic.on(GAME_EVENT.GAME_LOAD, () => Kohler.checkForUnlocks());