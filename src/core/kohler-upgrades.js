import { BitPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";

class KohlerUpgradeState extends BitPurchasableMechanicState {
  constructor(config) {
    super(config);
    this.registerEvents(config.checkEvent, () => this.tryUnlock());
  }
  get isBought() {
    return (this.bits & (1 << this.bitIndex)) !== 0;
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
    return Currency.kohlerPoints;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.mending.kohlerUpgradeBits;
  }

  set bits(value) {
    player.mending.kohlerUpgradeBits = value;
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
    return true;
  }

  get isPossible() {
    return true;
  }

  tryUnlock() {
    /*const realityReached = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
    if (!realityReached || this.isAvailableForPurchase || !this.config.checkRequirement()) return;
    player.reality.upgReqs |= (1 << this.id);
    GameUI.notify.reality(`You've unlocked a Kohler Upgrade: ${this.config.name}`);
    this.hasPlayerLock = false;*/
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.Kohler_UPGRADE_BOUGHT);
    const id = this.id;
    switch(id){
      case 7:
        player.dimensionBoosts = Math.max(5, player.dimensionBoosts);
        player.galaxies = Math.max(1, player.galaxies);
        break;
      case 8:
        player.dimensions.antimatter[7].amount = Decimal.max(1, player.dimensions.antimatter[7].amount);
        break;
      default:

    }
  }
}

class RebuyableKohlerUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.kohlerPoints;
  }

  get boughtAmount() {
    return player.mending.kohlerRebuyables[this.id];
  }

  get isAvailableForPurchase() {
    return true;
  }

  set boughtAmount(value) {
    player.mending.kohlerRebuyables[this.id] = value;
  }
}

KohlerUpgradeState.index = mapGameData(
  GameDatabase.mending.kohlerUpgrades,
  config => (config.id < 6
    ? new RebuyableKohlerUpgradeState(config)
    : new KohlerUpgradeState(config))
);

/**
 * @param {number} id
 * @return {KohlerUpgradeState|RebuyableKohlerUpgradeState}
 */
export const KohlerUpgrade = id => KohlerUpgradeState.index[id];

export const KohlerUpgrades = {
  /**
   * @type {(KohlerUpgradeState|RebuyableKohlerUpgradeState)[]}
   */
  all: KohlerUpgradeState.index.compact(),
  get allBought() {
    return (player.mending.kohlerUpgradeBits >> 6) + 1 === 1 << (GameDatabase.mending.kohlerUpgrades.length - 5);
  }
};
