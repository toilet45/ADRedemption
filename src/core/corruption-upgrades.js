import { BitPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";

class CorruptionUpgradeState extends BitPurchasableMechanicState {
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
    return Currency.corruptionFragments;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.mending.corruptionUpgradeBits;
  }

  set bits(value) {
    player.mending.corruptionUpgradeBits = value;
  }

  get hasPlayerLock() {
    return (player.mending.reqLock.corruption & (1 << this.bitIndex)) !== 0;
  }

  set hasPlayerLock(value) {
    if (value) player.mending.reqLock.corruption |= 1 << this.bitIndex;
    else player.mending.reqLock.corruption &= ~(1 << this.bitIndex);
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

  respecCorruptionUpgrades() {
    Currency.corruptionFragments.respecCall()
    player.mending.corruptionUpgradeBits = 0
  }

  get isAvailableForPurchase() {
    return true;
  }

  get isPossible() {
    return this.config.hasFailed ? !this.config.hasFailed() : true;
  }

  tryUnlock() {
    const isCorrupted = player.mending.corruptionChallenge.corruptedMend;
    if (!isCorrupted || this.isAvailableForPurchase || !this.config.checkRequirement()) return;
    player.mending.corruptionUpgReqs |= (1 << this.id);
    GameUI.notify.reality(`You've unlocked a Corruption Upgrade: ${this.config.name}`);
    this.hasPlayerLock = false;
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.CORRUPTION_UPGRADE_BOUGHT);
    const id = this.id;
    // insert code here
    GameCache.staticGlyphWeights.invalidate();
  }
}

class RebuyableCorruptionUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.corruptionFragments;
  }

  get boughtAmount() {
    return player.mending.corruptionRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.mending.corruptionRebuyables[this.id] = value;
  }
}

CorruptionUpgradeState.index = mapGameData(
  GameDatabase.mending.corruptionUpgrades,
  config => (config.id < 0
    ? new RebuyableCorruptionUpgradeState(config)
    : new CorruptionUpgradeState(config))
);

/**
 * @param {number} id
 * @return {CorruptionUpgradeState|RebuyableCorruptionUpgradeState}
 */
export const CorruptionUpgrade = id => CorruptionUpgradeState.index[id];

export const CorruptionUpgrades = {
  /**
   * @type {(CorruptionUpgradeState|RebuyableCorruptionUpgradeState)[]}
   */
  all: CorruptionUpgradeState.index.compact(),
  get allBought() {
    return (player.mending.corruptionUpgradeBits >> 6) + 1 === 1 << (GameDatabase.mending.corruptionUpgrades.length - 5);
  }
};
