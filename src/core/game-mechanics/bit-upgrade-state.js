import { GameMechanicState } from "./game-mechanic";

/**
 * @abstract
 */
export class BitUpgradeState extends GameMechanicState {
  constructor(config) {
    super(config);
    if (this.id < 0 || this.id > 31) throw new Error(`Id ${this.id} out of bit range`);
    if (this.id2 < 0) throw new Error(`Id ${this.id2} is not a valid array index`);
  }

  /**
   * @abstract
   */
  get bits() { throw new NotImplementedError(); }
  set bits(value) { throw new NotImplementedError(); }

  get modBits() { throw new NotImplementedError(); }
  set modBits(value) { throw new NotImplementedError(); }

  get isUnlocked() {
    if(this.id2 != undefined){
      return Boolean (this.modBits[this.id2] & (1 << this.id));
    }
    return Boolean(this.bits & (1 << this.id));
  }

  get canBeApplied() {
    return this.isUnlocked && this.isEffectActive;
  }

  get canBeUnlocked() {
    return !this.isUnlocked;
  }

  // eslint-disable-next-line no-empty-function
  onUnlock() { }

  unlock() {
    if (!this.canBeUnlocked) return;
    if(this.id2 === undefined) this.bits |= (1 << this.id);
    else {
      this.modBits[this.id2] |= (1 << this.id);
    }
    this.onUnlock();
  }
}
