import { BitPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";

class KohlerInfinityUpgradeState extends BitPurchasableMechanicState {
  constructor(config) {
    super(config);
    this.registerEvents(config.checkEvent, () => this.tryUnlock());
  }
  get isBought() {
    return (this.bits & (1 << this.bitIndex)) !== 0 && Kohler.isRunning;
  }

  set isBought(value) {
    if (value) {
      this.bits |= (1 << this.bitIndex);
    } else {
      this.bits &= ~(1 << this.bitIndex);
    }
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
    return Currency.infinityPoints;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.infinity.kohlerUpgradeBits;
  }

  set bits(value) {
    player.infinity.kohlerUpgradeBits = value;
  }

  get hasPlayerLock() {
    return false;// (player.reality.reqLock.reality & (1 << this.bitIndex)) !== 0;
  }

  /*set hasPlayerLock(value) {
    /*if (value) player.reality.reqLock.reality |= 1 << this.bitIndex;
    else player.reality.reqLock.reality &= ~(1 << this.bitIndex);
  }*/

  get isLockingMechanics() {
    const shouldBypass = this.config.bypassLock?.() ?? false;
    return this.hasPlayerLock && this.isPossible && !shouldBypass && !this.isAvailableForPurchase;
  }

  // Required to be changed this way to avoid direct prop mutation in Vue components
  setMechanicLock(value) {
    this.hasPlayerLock = value;
  }

  toggleMechanicLock() {
    this.hasPlayerLock = !this.hasPlayerLock;
  }

  // Note we don't actually show the modal if we already failed or unlocked it
  tryShowWarningModal(specialLockText) {
    if (this.isPossible && !this.isAvailableForPurchase) {
      Modal.upgradeLock.show({ upgrade: this, isImaginary: false, specialLockText });
    }
  }

  get isAvailableForPurchase() {
    return Kohler.isRunning && KohlerUpgrade(20).isBought;
  }

  get isPossible() {
    return Kohler.isRunning && KohlerUpgrade(20).isBought;
  }

  tryUnlock() {
    /*const realityReached = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
    if (!realityReached || this.isAvailableForPurchase || !this.config.checkRequirement()) return;
    player.reality.upgReqs |= (1 << this.id);
    GameUI.notify.reality(`You've unlocked a Kohler Upgrade: ${this.config.name}`);
    this.hasPlayerLock = false;*/
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.KOHLER_INFINITY_UPGRADE_BOUGHT);
    const id = this.id;
    switch(id){
      case 10:
        GameUI.notify.infinity(`You have unlocked Infinity Challenge 9`, 7000);
      default:
    }
  }
}

class RebuyableKohlerInfinityUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.infinityPoints;
  }

  get boughtAmount() {
    return player.infinity.kohlerRebuyables[this.id];
  }

  get isAvailableForPurchase() {
    return Kohler.isRunning && KohlerUpgrade(20).isBought;
  }

  set boughtAmount(value) {
    player.infinity.kohlerRebuyables[this.id] = value;
  }
}

KohlerInfinityUpgradeState.index = mapGameData(
  GameDatabase.mending.kohlerInfinityUpgrades,
  config => (config.id < 6
    ? new RebuyableKohlerInfinityUpgradeState(config)
    : new KohlerInfinityUpgradeState(config))
);

/**
 * @param {number} id
 * @return {KohlerInfinityUpgradeState|RebuyableKohlerInfinityUpgradeState}
 */
export const KohlerInfinityUpgrade = id => KohlerInfinityUpgradeState.index[id];

export const KohlerInfinityUpgrades = {
  /**
   * @type {(KohlerInfinityUpgradeState|RebuyableKohlerInfinityUpgradeState)[]}
   */
  all: KohlerInfinityUpgradeState.index.compact(),
  get allBought() {
    return (player.infinity.kohlerUpgradeBits >> 6) + 1 === 1 << (GameDatabase.infinity.kohlerUpgrades.length - 5);
  }
};
