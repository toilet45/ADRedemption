import { IntervaledAutobuyerState } from "./autobuyer";

export class DarkMatterDimensionAscensionAutobuyerState extends IntervaledAutobuyerState {
  get data() {
    return player.auto.ascension;
  }

  get name() {
    return `Dark Matter Dimension Ascension`;
  }

  get isUnlocked() {
    return SingularityMilestone.ascensionAutobuyers.canBeApplied || player.celestials.ra.permanentMemories.lai50;
  }

  get interval() {
    return 1000 * SingularityMilestone.darkAutobuyerSpeed.effectValue;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    super.tick();
    let x = SingularityMilestone.darkDimensionAutobuyers.effectValue;
    if (player.celestials.ra.permanentMemories.lai50){
      x = 8;
    }
    for (let i = 1; i <= x; i++) {
      DarkMatterDimension(i).ascend();
    }
  }
}
