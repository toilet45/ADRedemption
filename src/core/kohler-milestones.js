import { GameMechanicState } from "./game-mechanics";

import { SteamRuntime } from "@/steam";

class KohlerMilestoneState extends GameMechanicState {
  constructor(config) {
    super(config);
    this._row = Math.floor(this.id / 10);
    this._column = this.id % 10;
    this._bitmask = 1 << (this.column - 1);
    this._inverseBitmask = ~this._bitmask;
    this.registerEvents(config.checkEvent, args => this.tryUnlock(args));
  }

  get name() {
    return this.config.name;
  }

  get row() {
    return this._row;
  }

  get isUnlocked() {
    return (player.kohlerMilestoneBits[this.row - 1] & this._bitmask) !== 0;
  }

  get isDisabled() {
    return false;
  }

  get isEffectActive() {
    return this.isUnlocked && !this.isDisabled;
  }

  tryUnlock(args) {
    if (this.isUnlocked) return;
    if (!this.config.checkRequirement(args)) return;
    this.unlock();
  }

  lock() {
    player.kohlerMilestoneBits[this.row - 1] &= this._inverseBitmask;
  }

  unlock(auto) {
    if (this.isUnlocked) return;
    player.kohlerMilestoneBits[this.row - 1] |= this._bitmask;
    if (auto) {
      GameUI.notify.reality(`Automatically unlocked: ${this.name}`);
    } else {
      GameUI.notify.success(`Kohler Milestone Reached: ${this.name}`);
    }
    EventHub.dispatch(GAME_EVENT.KOHLER_MILESTONE_UNLOCKED);
  }

  // Additional Code Starts Here
}

/**
 * @param {number} id
 * @returns {KohlerMilestoneState}
 */
export const KohlerMilestone = KohlerMilestoneState.createAccessor(GameDatabase.mending.kohlerMilestones);

export const KohlerMilestones = {
  /**
   * @type {KohlerMilestoneState[]}
   */
  all: KohlerMilestone.index.compact(),

  get allRows() {
    const count = KohlerMilestones.all.map(a => a.row).max();
    return KohlerMilestones.rows(1, count);
  },

  rows: (start, count) => Array.range(start, count).map(KohlerMilestones.row),

  row: row => Array.range(row * 10 + 1, 5).map(KohlerMilestone),
};

