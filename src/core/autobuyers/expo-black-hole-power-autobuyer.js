import { AutobuyerState } from "./autobuyer";

export class ExpoBlackHolePowerAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.expoBlackHolePower.all[this.id - 1];
  }

  get name() {
    return `Exponent Black Hole ${this.id} Power`;
  }

  get isUnlocked() {
    return WarpUpgrade(7).isBought;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    const bh = ExpoBlackHole(this.id);
    while (Currency.imaginaryMachines.gte(bh.powerUpgrade.cost)) bh.powerUpgrade.purchase();
  }

  static get entryCount() { return 1; }
  static get autobuyerGroupName() { return "Exponent Black Hole Power"; }
  static get isActive() { return player.auto.expoBlackHolePower.isActive; }
  static set isActive(value) { player.auto.expoBlackHolePower.isActive = value; }
}
