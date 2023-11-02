import { BitPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";

class WarpUpgradeState extends BitPurchasableMechanicState {
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
    return Currency.mendingPoints;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.mending.warpUpgradeBits;
  }

  set bits(value) {
    player.mending.warpUpgradeBits = value;
  }

  get hasPlayerLock() {
    return (player.mending.reqLock.warp & (1 << this.bitIndex)) !== 0;
  }

  set hasPlayerLock(value) {
    if (value) player.mending.reqLock.warp |= 1 << this.bitIndex;
    else player.mending.reqLock.warp &= ~(1 << this.bitIndex);
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
    return (player.mending.warpUpgReqs & (1 << this.id)) !== 0;
  }

  get isPossible() {
    return this.config.hasFailed ? !this.config.hasFailed() : true;
  }

  tryUnlock() {
    const warpReached = player.reality.warped;
    if (!warpReached || this.isAvailableForPurchase || !this.config.checkRequirement()) return;
    player.mending.warpUpgReqs |= (1 << this.id);
    GameUI.notify.reality(`You've unlocked a Warp Upgrade: ${this.config.name}`);
    this.hasPlayerLock = false;
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.WARP_UPGRADE_BOUGHT);
    const id = this.id;
    //insert code here
    GameCache.staticGlyphWeights.invalidate();
  }
}

class RebuyableWarpUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.mendingPoints;
  }

  get boughtAmount() {
    return player.mending.warpRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.mending.warpRebuyables[this.id] = value;
  }
}

WarpUpgradeState.index = mapGameData(
  GameDatabase.mending.warpUpgrades,
  config => (config.id < 3
    ? new RebuyableWarpUpgradeState(config)
    : new WarpUpgradeState(config))
);

/**
 * @param {number} id
 * @return {WarpUpgradeState|RebuyableWarpUpgradeState}
 */
export const WarpUpgrade = id => WarpUpgradeState.index[id];

export const WarpUpgrades = {
  /**
   * @type {(WarpUpgradeState|RebuyableWarpUpgradeState)[]}
   */
  all: WarpUpgradeState.index.compact(),
  get allBought() {
    return (player.mending.warpUpgradeBits >> 3) + 1 === 1 << (GameDatabase.mending.warpUpgrades.length - 2);
  }
};
