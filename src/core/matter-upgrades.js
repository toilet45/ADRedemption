import { BitPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";

class MatterUpgradeState extends BitPurchasableMechanicState {
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
    return Currency.matter;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.infinity.matterUpgradeBits;
  }

  set bits(value) {
    player.infinity.matterUpgradeBits = value;
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
    return InfinityChallenge(9).isRunning;
  }

  get isPossible() {
    return InfinityChallenge(9).isRunning;
  }

  tryUnlock() {
    /*const realityReached = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
    if (!realityReached || this.isAvailableForPurchase || !this.config.checkRequirement()) return;
    player.reality.upgReqs |= (1 << this.id);
    GameUI.notify.reality(`You've unlocked a Kohler Upgrade: ${this.config.name}`);
    this.hasPlayerLock = false;*/
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.MATTER_UPGRADE_BOUGHT);
    const id = this.id;
    switch(id){
      default:
    }
  }
}

class RebuyableMatterUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.matter;
  }

  get boughtAmount() {
    return player.infinity.matterRebuyables[this.id];
  }

  get isAvailableForPurchase() {
    return InfinityChallenge(9).isRunning;
  }

  set boughtAmount(value) {
    player.infinity.matterRebuyables[this.id] = value;
  }
}

MatterUpgradeState.index = mapGameData(
  GameDatabase.mending.matterUpgrades,
  config => (config.id < 6
    ? new RebuyableMatterUpgradeState(config)
    : new MatterUpgradeState(config))
);

/**
 * @param {number} id
 * @return {MatterUpgradeState|RebuyableMatterUpgradeState}
 */
export const MatterUpgrade = id => MatterUpgradeState.index[id];

export const MatterUpgrades = {
  /**
   * @type {(MatterUpgradeState|RebuyableMatterUpgradeState)[]}
   */
  all: MatterUpgradeState.index.compact(),
  get allBought() {
    return (player.infinity.matterUpgradeBits >> 6) + 1 === 1 << (GameDatabase.infinity.matterUpgrades.length - 5);
  }
};
