import { BitUpgradeState, RebuyableMechanicState } from "../game-mechanics";
import { GameDatabase } from "../secret-formula/game-database";

import { Quotes } from "./quotes";

export const Kohler = {
  get displayName(){
    return false ? "Kohler" : "???"
  },
  get possessiveName(){
    return false ? "Kohler's" : "???'s"
  },
  get isUnlocked() {
    return false;
  },
  quotes: Quotes.kohler,
  get symbol(){ 
    return false ? "<i class='fa-solid fa-staff-snake'></i>" : "?"
  },

  get unlockProgress() {
    let Progress = 5;
    let stage1 = Math.min(15*Math.log10(CorruptionData.corruptionChallenge.recordScore)/7,15)
    Progress += stage1;
    if(stage1<15){
      return parseFloat(Progress.toFixed(2));
    }
    let stage2 = Math.min(15*Math.ceil(CorruptionData.recordCorruptedFragments)/30,15);
    Progress += stage2;
    return parseFloat(Progress.toFixed(2));
  },
  checkForUnlocks() {
    for (const info of KohlerProgressUnlocks.all) {
      info.unlock();
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
    return /*!this.isUnlocked &&*/ typeof this.config.condition === "function" ? this.config.condition() : this.config.condition;
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