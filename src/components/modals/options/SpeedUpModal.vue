<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import { Modal } from "../../../core/modal";

export default {
  name: "SpeedUpModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      input: "",
      testSpeed: 1,
      displayText: "",
      isValidSpeed: true,
    }
  },
  created() {
    this.testSpeed = player.testSpeed ?? 1;
    this.input = `${player.testSpeed ?? 1}`;
    this.handleTestSpeedInput();
  },
  methods: {
    setTestSpeed(){
      if(!this.isValidSpeed) return;
      const now = Date.now()
      if((player.testSpeed ?? 1) != 1){
        player.speedUpDuration = player.speedUpDuration ?? 0;
        player.speedUpDuration += (now - (player.speedUpRestart ?? now)) * player.testSpeed;
      }
      this.emitClose();
      if(this.testSpeed == 1){
        if((player.testSpeed ?? 1) == 1) return;
        Modal.speedUpReport.show();
        delete player.testSpeed;
        return;
      } else {
        if((player.testSpeed ?? 1) == 1){
          player.speedUpStart = now;
        }
        player.speedUpRestart = now;
      }
      player.testSpeed = this.testSpeed;
    },
    formatDuration(duration) {
      days = Math.floor(duration)
    },
    handleTestSpeedInput(){
      const testSpeed = parseFloat(this.input);
      if(!isFinite(testSpeed) || isNaN(testSpeed) || testSpeed < 0 || testSpeed > 100){
        this.displayText = "Invalid speed";
        this.isValidSpeed = false;
      } else {
        this.displayText = `Testing speed will be set to ${testSpeed}x`
        this.isValidSpeed = true;
        this.testSpeed = testSpeed
      }
    },
  },
}
</script>

<template>
  <ModalWrapperChoice
    :show-confirm="isValidSpeed"
    :confirmFn="setTestSpeed"
  >
    <template #header>
      Modify Testing Speed
    </template>
    <div>
      <div>
        Set game speed for testing purposes.
        A report will be displayed after settings the testing speed back to 1 informing how
        long was the speed up effecitvely.
      </div>
      <div
          class="c-modal-hard-reset-danger"
        >
        This speed up will affect EVERYTHING(with the exception of singularities(Lai'tela))
      </div>
      <input
        ref="input"
        v-model="input"
        type="text"
        class="c-modal-input"
        @keyup.enter="setTestSpeed"
        @keyup.esc="emitClose"
        @input="handleTestSpeedInput()"
      >
      <div>
        {{ displayText }}
      </div>
    </div>
  </ModalWrapperChoice>
</template>