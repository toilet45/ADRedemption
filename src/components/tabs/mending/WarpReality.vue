<script>

import PrimaryButton from "@/components/PrimaryButton";
import WarpRealityButton from "./WarpRealityButton";
import { warpReality } from "../../../game";
import WarpUpgradeButton from "./WarpUpgradeButton.vue";

export default {
  name: "WarpReality",
  components: {
    PrimaryButton,
    WarpRealityButton,
    WarpUpgradeButton
  },
  data() {
    return {
      totalUpg: 0,
      MvRoR: 0,
      RaToR: 0,
      canWarp: false,
      warped: false,
    }
  },
  computed: {
    upgrades: () => WarpUpgrades.all,
    costScalingTooltip: () => `Cost Scaling is NYI`,
    possibleTooltip: () => `Striped upgrades are Not Yet Implemented [NYI].`,
    lockTooltip: () => `This will only function if you have not already failed the condition or
      unlocked the upgrade.`,
    grid: () => [],
    classObject() {
      return {
        "o-warp-btn": true,
        "o-warp-btn--color-2": true,
        "o-warp-btn--available": this.canWarp,
        "o-warp-btn--unavailable": !this.canWarp,
        "o-warp-btn--unclickable": this.warped,
      };
    },
    tooltip() {
      return undefined
    },
    totalUpgFunc() {
     return WarpUpgrades.all.countWhere(u => u.isBought);
    },
  },
  methods: {
    update() {
      this.totalUpg = MendingUpgrades.all.countWhere(u => u.isBought);
      this.MVRoR = Decimal.min(player.mendingPoints,1e7).toNumber()
      this.RaToR = Math.min(450, Ra.totalPetLevel)
      this.canWarp = ((this.MVRoR == 1e7) && (this.RaToR == 450) && (this.totalUpg == 16))
      this.warped = player.reality.warped
    },
    clicked() {
      if (!this.warped && this.canWarp) Modal.warpReality.show();
    },
    id(row, column) {
      return (row - 1) * 3 + column - 1;
    }
  }
};

</script>

<template>
  <div class="l-warp-tab">
    <div
      v-if="warped"
    >
      <button
      v-tooltip="tooltip"
      :class="classObject"
      @click="clicked"
    >
    Reality is Warped
  </button>
    </div>
      <div
      v-else-if="canWarp"
      >
        <button
        v-tooltip="tooltip"
        :class="classObject"
        @click="clicked"
        >
      Warp Reality
    </button>
  </div>
    <div
      v-else
      class="warp-unlock-requirements"
    >
      You must have all Mending Upgrades Purchased, 
      {{ formatInt(1e7) }} Multiversal Remains, and 450 total Ra Memory Levels to Warp Reality.
      <br>
      <br>
      {{ format(this.MVRoR) }} / {{ format(1e7) }} Multiversal Remains
      <br>
      {{ formatInt(this.RaToR) }} / {{ formatInt(450) }} Ra Memory Levels
      <br>
      {{ formatInt(this.totalUpg) }} / {{ formatInt(16) }} Mending Upgrades
    </div>
    <div v-if="warped">
    <div class="c-mending-upgrade-infotext">
      Stripped Upgrades (or ones that cost 1e300 MvR) are not yet implemented.
      <br>
      You can shift-click upgrades with <i class="fas fa-lock-open" /> to make the game prevent you
      from doing anything this Mend which would cause you to fail their unlock condition.
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
    </div>
    <div
      v-for="row in 4"
      :key="row"
      class="l-mending-upgrade-grid__row"
    >
      <WarpUpgradeButton
        v-for="column in 3"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
    </div>
  </div>
</template>

<style scoped>
.l-warp-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.l-warp-all-content-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.o-warp-button {
  font-family: Typewriter;
  color: var(--color-text);
  background: var(--color-text-inverted);
  border: 0.1rem solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);
  margin-bottom: 1rem;
  padding: 1rem;
  transition-duration: 0.12s;
  cursor: pointer;
}

.o-warp-button:hover {
  box-shadow: 0.1rem 0.1rem 0.3rem var(--color-pelle--base);
}

.o-warp-quotes-button {
  display: flex;
  width: 7rem;
  height: 7rem;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-weight: 900;
  color: var(--color-pelle--base);
}

.warp-unlock-requirements {
  width: 50rem;
  padding: 0.5rem;
  font-size: 2.4rem;
  color: var(--color-pelle--base);
  background: black;
  border: var(--var-border-width, 0.2rem) solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);
}

.warp-doom-button {
  width: 20rem;
  align-self: center;
  font-family: Typewriter;
  font-size: 3rem;
  color: var(--color-pelle--base);
  background: black;
  border: var(--var-border-width, 0.2rem) solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem;
  transition-duration: 0.4s;
  cursor: pointer;
}

.warp-doom-button:hover {
  box-shadow: 0 0 2rem var(--color-pelle--base);
}

.warp-icon-container {
  display: flex;
  width: 15rem;
  height: 15rem;
  justify-content: center;
  align-items: center;
  font-size: 10rem;
  text-shadow: 0 0 1.5rem #9b0101;
  background: white;
  border: var(--var-border-width, 0.4rem) solid var(--color-pelle--base);
  border-radius: 50%;
  box-shadow: 0 0 1.5rem #9b0101;
  margin: auto;
  margin-top: 3rem;
  transition-duration: 0.4s;
}

.warp-doom-button:hover .pelle-icon-container {
  color: var(--color-pelle--base);
  background: black;
}

@keyframes a-roll {
  100% { transform: rotateY(360deg); }
}

.warp-icon {
  animation: a-roll infinite 8s linear;
}
</style>
