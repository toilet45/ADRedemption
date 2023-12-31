import { PlayerProgress } from "../player-progress";
import { AutobuyerState } from "./autobuyer";

export class SingularityCapIncreaseAutobuyerState extends AutobuyerState {
  get data() {
    return player.auto.singCap;
  }

  get name() {
    return `Singularity cap increase`;
  }

  get isUnlocked() {
    return player.celestials.ra.permanentMemories.lai65;
  }

  get multiplier() {
    return this.data.multiplier;
  }

  set multiplier(value) {
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
    return "Maximum singularity time (ms)";
  }

  tick() {
    if ((Singularity.cap / Currency.darkEnergy.productionPerSecond) < (this.multiplier/10)) return;
    Singularity.increaseCap();
  }
}
