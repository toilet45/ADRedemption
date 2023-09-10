import { AutobuyerState } from "./autobuyer";
import { GlyphSacrificeHandler, MendingMilestone, RealityUpgrade } from "../globals";

export class NonRepeatableRealityUpgradeAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.nrru;
  }

  get name() {
    return `Non-repeatable Reality Upgrade Autobuyer`;
  }

  get isUnlocked() {
    return MendingMilestone.eight.isReached;
  }

  get bulk() {
    return 0;
  }

  tick() {
    if (player.auto.nrru.isActive) {
    for (let i = 1; i <= 20; i++) {
    if (Currency.realityMachines.gte(RealityUpgrade(i+5).cost) && !RealityUpgrade(i+5).isBought) {
      RealityUpgrade(i+5).purchase()
      RealityUpgrade(i+5).onPurchased()
    }
    }}
  }
}