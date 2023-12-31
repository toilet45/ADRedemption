import { mendingResetRequest } from "../mending";
import { PlayerProgress } from "../player-progress";
import { UpgradeableAutobuyerState } from "./autobuyer";

export class MendingAutobuyerState extends UpgradeableAutobuyerState {
  get data() {
    return player.auto.mending;
  }

  get name() {
    return `Mend`;
  }

  get isUnlocked() {
    return MendingUpgrade(20).isBought;
  }

  get canBeUpgraded() {
    return true;
  }

  get baseInterval() {
    return 0;
  }

  get mode() {
    return this.data.mode;
  }

  set mode(value) {
    this.data.mode = value;
  }

  get hasAdditionalModes() {
    return true;
  }

  get increaseWithMult() {
    return this.data.increaseWithMult;
  }

  set increaseWithMult(value) {
    this.data.increaseWithMult = value;
  }

  get amount() {
    return this.data.amount;
  }

  // This is unused mechanically, but should be zero to suppress the "Current bulk:" text
  get bulk() {
    return 0;
  }

  set amount(value) {
    this.data.amount = value;
  }

  get time() {
    return this.data.time;
  }

  set time(value) {
    this.data.time = value;
  }

  /*get xHighest() {
    return this.data.xHighest;
  }

  set xHighest(value) {
    this.data.xHighest = value;
  }*/ //TO BE IMPLEMENTED

  bumpAmount(mult) {
    if (this.isUnlocked && this.increaseWithMult) {
      this.amount = this.amount.times(mult);
    }
  }

  get canTick() {
    return Player.canMend && super.canTick;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.MENDING;
  }

  /*get highestPrevPrestige() {
    return player.records.thisMend.maxMvR;
  }*/

  get timeToNextTick() {
    return Math.clampMin(this.time - Time.thisMendRealTime.totalSeconds.toNumber(), 0);
  }

  get willMend() {
    switch (this.mode) {
      case AUTO_MEND_MODE.TIME:
        return Time.thisMendRealTime.totalSeconds.gt(this.time);
      case AUTO_MEND_MODE.AMOUNT:
      default:
        return gainedMendingPoints().gte(this.amount);
      /*case AUTO_MEND_MODE.X_HIGHEST:
      default:
        return gainedMendmgPoints().gte(this.highestPrevPrestige.times(this.xHighest));*/
    }
  }

  tick() {
    super.tick();
    if (this.willMend) mendingResetRequest();
  }

  reset() {
    super.reset();
    this.mode = AUTO_MEND_MODE.AMOUNT;
  }
}
