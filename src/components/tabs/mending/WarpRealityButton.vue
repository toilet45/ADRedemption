<script>
import { PlayerProgress } from '../../../core/player-progress';

export default {
  name: "WarpRealityButton",
  data() {
    return {
      isWarped: false,
      isUnlocked: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-warp-btn": true,
        "o-warp-btn--color-2": true,
        "o-warp-btn--available": this.isUnlocked,
        "o-warp-btn--unavailable": !this.isUnlocked,
        "o-warp-btn--unclickable": this.isWarped,
      };
    },
    tooltip() {
      return undefined;
    },
    text() {
      return this.isWarped ? "REALITY IS WARPED" : "WARP REALITY";
    }
  },
  methods: {
    update() {
      this.isWarped = player.reality.warped;
      this.isUnlocked = player.mendingPoints.gte(1e5) && Ra.totalPetLevel > 450 &&  player.mending.upgradeBits == 2029500
    },
    clicked() {
      if (!this.isWarped && this.isUnlocked) Modal.warpReality.show();
    }
  }
};
</script>

<template>
  <button
    v-tooltip="tooltip"
    :class="classObject"
    @click="clicked"
  >
    {{ text }}
  </button>
</template>

<style scoped>

</style>
