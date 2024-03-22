<script>
import MatterDimensionRow from "@/components/tabs/matter/matter-dimensions/ModernMatterDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernMatteratterDimensionsTab",
  components: {
    PrimaryButton,
    MatterDimensionRow,
  },
  data() {
    return {
      buyUntil10: true,
      buy10Mult: new Decimal(0),
      disabledCondition: "",
      isQuickResetAvailable: false,
      hasContinuum: false,
      isContinuumActive: false,
      multiplierText: "",
    };
  },
  computed: {
  },
  methods: {
    maxAll() {
      maxAll();
    },
    // Toggle single/10 without Continuum, otherwise cycle through all 3 if it's unlocked
    changeBuyMode() {
      if (!this.hasContinuum) {
        player.buyUntil10 = !player.buyUntil10;
        return;
      }
      // "Continuum" => "Until 10" => "Buy 1" => "Continuum"
      if (this.isContinuumActive) {
        Laitela.setContinuum(false);
        player.buyUntil10 = true;
      } else if (player.buyUntil10) {
        player.buyUntil10 = false;
      } else {
        Laitela.setContinuum(true);
      }
    },
    getUntil10Display() {
      if (this.isContinuumActive) return "Continuum";
      return this.buyUntil10 ? "Until 10" : "Buy 1";
    },
    update() {
      this.buyUntil10 = player.buyUntil10;
      this.hasContinuum = false;
      this.isContinuumActive = false;
      this.isQuickResetAvailable = Player.isInAntimatterChallenge && Player.antimatterChallenge.isQuickResettable;

      this.buy10Mult.copyFrom(AntimatterDimensions.buyTenMultiplier);

      this.multiplierText = `Buy 10 Dimension purchase multiplier: ${formatX(this.buy10Mult, 2, 2)}`;
    }
  }
};
</script>

<template>
  <div class="l-antimatter-dim-tab">
    <div class="modes-container">
      <button
        class="o-primary-btn l-button-container"
        @click="changeBuyMode"
      >
        {{ getUntil10Display() }}
      </button>
      <button
        class="o-primary-btn l-button-container"
        @click="maxAll"
      >
        Max All (M)
      </button>
    </div>
    <span>{{ multiplierText }}</span>
    <div class="l-dimensions-container">
      <MatterDimensionRow
        v-for="tier in 4"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div class="resets-container">
    </div>
  </div>
</template>

<style scoped>
.l-button-container {
  width: 100px;
  height: 30px;
  padding: 0;
}
</style>
