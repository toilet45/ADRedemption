import { BitPurchasableMechanicState, RebuyableMechanicState } from "../../game-mechanics";

class RaUpgradeState extends BitPurchasableMechanicState {
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
    return Currency.raPoints;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.celestials.ra.upgradeBits;
  }

  set bits(value) {
    player.celestials.ra.upgradeBits = value;
  }

  get hasPlayerLock() {
    return false;
  }

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
    return player.celestials.ra.pets.ra.level >= 40;
  }

  get isPossible() {
    return true;
  }

  tryUnlock() {
    const shopUnlocked = player.celestials.ra.pets.ra.level >= 40;
    if (shopUnlocked || this.isAvailableForPurchase || !this.config.checkRequirement()) return;
    player.celestials.ra.upgReqs |= (1 << this.id);
    GameUI.notify.reality(`You've unlocked a Ra Upgrade: ${this.config.name}`);
    this.hasPlayerLock = false;
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.REALITY_UPGRADE_BOUGHT);
  }
}

class RebuyableRaUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.raPoints;
  }

  get boughtAmount() {
    return player.celestials.ra.rebuyables[this.id];
  }

  set boughtAmount(value) {
    player.celestials.ra.rebuyables[this.id] = value;
  }
}

RaUpgradeState.index = mapGameData(
  GameDatabase.celestials.raUpgrades,
  config => (config.id < 6
    ? new RebuyableRaUpgradeState(config)
    : new RaUpgradeState(config))
);

/**
 * @param {number} id
 * @return {RaUpgradeState|RebuyableRaUpgradeState}
 */
export const RaUpgrade = id => RaUpgradeState.index[id];

export const RaUpgrades = {
  /**
   * @type {(RaUpgradeState|RebuyableRaUpgradeState)[]}
   */
  all: RaUpgradeState.index.compact(),
  get allBought() {
    return (player.celestials.ra.upgradeBits >> 6) + 1 === 1 << (GameDatabase.celestials.raUpgrades.length - 5);
  }
};
