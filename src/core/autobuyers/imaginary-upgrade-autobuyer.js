import { corruptionPenalties } from "../secret-formula/mending/corruption";
import { AutobuyerState } from "./autobuyer";

export class ImaginaryUpgradeAutobuyerState extends AutobuyerState {
  get name() {
    return ImaginaryUpgrade(this.id).config.name;
  }

  get data() {
    return player.auto.imaginaryUpgrades.all[this.id - 1];
  }

  get isUnlocked() {
    return ImaginaryUpgrade(20).canBeApplied;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    const upg = ImaginaryUpgrade(this.id);
    while (Currency.imaginaryMachines.gte(upg.cost)&&!(this.id<=10&&player.mending.corruptionChallenge.corruptedMend&&corruptionPenalties.repSing.hiddenFour[player.mending.corruption[8]])) upg.purchase();
  }

  static get entryCount() { return 10; }
  static get autobuyerGroupName() { return "Imaginary Upgrade"; }
  static get isActive() { return player.auto.imaginaryUpgrades.isActive; }
  static set isActive(value) { player.auto.imaginaryUpgrades.isActive = value; }
}
