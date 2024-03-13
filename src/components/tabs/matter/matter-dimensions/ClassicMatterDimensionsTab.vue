<script>
import MatterDimensionRow from "./ClassicMatterDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicMatterDimensionsTab",
  components: {
    PrimaryButton,
    MatterDimensionRow,
  },
  data() {
    return {
      isQuickResetAvailable: false,
      buy10Mult: new Decimal(0),
    };
  },
  methods: {
    update() {
      this.isQuickResetAvailable = false;
      this.buy10Mult.copyFrom(MatterDimensions.buyTenMultiplier);
    },
    quickReset() {
      softReset(-1, true, true);
    }
  }
};
</script>

<template>
  <div class="l-classic-antimatter-dim-tab">
    <div class="l-dimensions-container">
      <MatterDimensionRow
        v-for="tier in 4"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div class="l-flex" />
  </div>
</template>

<style scoped>
.l-flex {
  flex: 1 0;
}
</style>
