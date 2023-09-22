import { Currency } from "./currency";
import { BitPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";
import { DC } from "./constants";
import { Effect } from "./game-mechanics/effect";

class MendingUpgradeState extends BitPurchasableMechanicState {
  constructor(config) {
    super(config);
    this.registerEvents(config.checkEvent, () => this.tryUnlock());
  }

  get name() {
    return this.config.name;
  }

  get shortDescription() {
    return this.config.shortDescription ? this.config.shortDescription() : "";
  }

  get requirement() {
    return typeof this.config.requirement === "function" ? this.config.requirement() : this.config.requirement;
  }

  get lockEvent() {
    return typeof this.config.lockEvent === "function" ? this.config.lockEvent() : this.config.lockEvent;
  }

  get currency() {
    return Currency.mendingPoints;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.mending.upgradeBits;
  }

  set bits(value) {
    player.mending.upgradeBits = value;
  }

  get hasPlayerLock() {
    return false
  }


  get isLockingMechanics() {
    const shouldBypass = this.config.bypassLock?.() ?? false;
    return this.hasPlayerLock && this.isPossible && !shouldBypass && !this.isAvailableForPurchase;
  }

  get isAvailableForPurchase() {
    return true;
  }

  get isPossible() {
    return this.config.hasFailed ? !this.config.hasFailed() : true;
  }

  tryUnlock() {
    const mendingReached = PlayerProgress.mendingUnlocked()
    if (!mendingReached || this.isAvailableForPurchase || !this.config.checkRequirement()) return;
    player.mending.upgReqs |= (1 << this.id);
    GameUI.notify.reality(`You've unlocked a Mending Upgrade: ${this.config.name}`);
    this.hasPlayerLock = false;
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.MENDING_UPGRADE_BOUGHT);
    const id = this.id;
    switch(id){
      case 2:{
        Currency.eternities.bumpTo(1e6);
        Currency.infinities.bumpTo(1e12);
        Currency.realities.bumpTo(10000);
        player.replicanti.unl = true;
        Glyphs.addToInventory(GlyphGenerator.randomGlyph({ actualLevel: 70, rawLevel:70 },undefined, 'power'));
        break;
      }
      case 3:{
        for (let i = 1; i <= 12; i++){
          EternityChallenge(i).completions = 5;
          if (i === 12) break;
        }
        break;
      }
      case 4:{
        if (!ImaginaryUpgrade(15).isAvailableForPurchase ) ImaginaryUpgrade(15).isAvailableForPurchase ;
        if (!ImaginaryUpgrade(15).isBought) ImaginaryUpgrade(15).isBought = true;
        if (player.celestials.laitela.difficultyTier < 8) player.celestials.laitela.difficultyTier = 8; //futureproffing, but idk how that would make sense
        break
      }
      case 5:{
        player.celestials.teresa.unlockBits += 2;
        break;
      }
      case 7:{
        player.celestials.enslaved.unlocks = [0, 1];
        player.celestials.enslaved.completed = true;
        break
      }
      case 9:{
        if (player.celestials.teresa.unlockBits % 2 != 1){
          player.celestials.teresa.unlockBits += 1;
        }
        if (player.celestials.teresa.bestRunAM.lt(DC.E1E10)){
          player.celestials.teresa.bestRunAM = DC.E1E10;
        }
        break;
      }
      case 14:{
        player.celestials.v.runUnlocks.forEach((unlock, index) => {
          player.celestials.v.runUnlocks[index] = Math.max(unlock, 3);
        });
        V.updateTotalRunUnlocks();
        break;
      }
      case 19:{
        Ra.checkForUnlocks();
        break;
      }
      default:{
          //apparently leaving this blank is equivalent to Python's "pass"
      }
    }
  }
}

class RebuyableMendingUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.mendingPoints;
  }

  get boughtAmount() {
    return player.mending.rebuyables[this.id];
  }

  set boughtAmount(value) {
    player.mending.rebuyables[this.id] = value;
  }
}

MendingUpgradeState.index = mapGameData(
  GameDatabase.mending.upgrades,
  config => (config.id % 5 === 1
    ? new RebuyableMendingUpgradeState(config)
    : new MendingUpgradeState(config))
);

/**
 * @param {number} id
 * @return {MendingUpgradeState|RebuyableMendingUpgradeState}
 */
export const MendingUpgrade = id => MendingUpgradeState.index[id];

export const MendingUpgrades = {
  /**
   * @type {(MendingUpgradeState|RebuyableMendingUpgradeState)[]}
   */
  all: MendingUpgradeState.index.compact(),
  get allBought() {
    return (player.mending.upgradeBits >> 6) + 1 === 1 << (GameDatabase.mending.upgrades.length - 5);
  }
};

export const MendingUpgradeMultiplier = new Effect(()=>{
  const upgradeBought = id => MendingUpgrade(id).isBought;
  let effect = 1;

  for(let i = 1; i < 20; i+=5){
    effect = effect << (upgradeBought(i+1) && upgradeBought(i+2) && upgradeBought(i+3) && upgradeBought(i+4));
  }
  return effect;
});