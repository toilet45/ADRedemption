import { IntervaledAutobuyerState } from "./autobuyer";

export class DarkMatterDimensionAutobuyerState extends IntervaledAutobuyerState {
  get data() {
    return player.auto.darkMatterDims;
  }

  get name() {
    return `Dark Matter Dimensions`;
  }

  get isUnlocked() {
    return SingularityMilestone.darkDimensionAutobuyers.canBeApplied || player.celestials.ra.permanentMemories.lai50;
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
    Laitela.maxAllDMDimensions(x);
  }
}
