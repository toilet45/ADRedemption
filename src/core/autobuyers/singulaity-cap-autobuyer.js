import { Singularity } from "../globals";
import { AutobuyerState } from "./autobuyer";

export class SingularityCapAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.singCap;
  }

  get name() {
    return `Singularity Cap`;
  }

  get isUnlocked() {
    return player.celestials.ra.permanentMemories.lai65;
  }

  get multiplier() {
    return this.data.multiplier;
  }

  set multiplier(value) {
    if(value < 1){
      value = 1
    }
    this.data.multiplier = value;
  }

  get bulk() {
    return 0;
  }

  get hasInput() {
    return true;
  }

  get inputType() {
    return "float";
  }

  get inputEntry() {
    return "multiplier";
  }

  get description() {
    return "Auto condense time (ms)";
  }

  tick() {
    const duration = Singularity.cap / Currency.darkEnergy.productionPerSecond;
    if (duration < (this.multiplier / 1000 / Math.sqrt(10))) {
      Singularity.increaseCap();
      return;
    };
    if (duration > (this.multiplier / 1000 * Math.sqrt(10))){
      Singularity.decreaseCap();
      return;
    };
  }
}
