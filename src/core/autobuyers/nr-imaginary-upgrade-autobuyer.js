import { AutobuyerState } from "./autobuyer";
import { GlyphSacrificeHandler, ImaginaryUpgrade, MendingMilestone, RealityUpgrade } from "../globals";

export class NonRepeatableImaginaryUpgradeAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.nriu;
  }

  get name() {
    return `Non-repeatable Imaginary Upgrade Autobuyer`;
  }

  get isUnlocked() {
    return MendingMilestone.eight.isReached;
  }

  get bulk() {
    return 0;
  }

  tick() {
    if (player.auto.nriu.isActive) {
    for (let i = 1; i <= 15; i++) {
    if (Currency.imaginaryMachines.gte(ImaginaryUpgrade(i+10).cost) && !ImaginaryUpgrade(i+10).isBought) {
      ImaginaryUpgrade(i+10).purchase();
      ImaginaryUpgrade(i+10).onPurchased();
    }
    }}
  }
}