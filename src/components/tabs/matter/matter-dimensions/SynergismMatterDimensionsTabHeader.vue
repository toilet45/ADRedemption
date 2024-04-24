<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SynergismMatterDimensionsTabHeader",
  components: {
    PrimaryButton
  },
  data() {
    return {
      disabledCondition: "",
    };
  },
  computed: {
    sacrificeTooltip() {
      return `Boosts 8th Antimatter Dimension by ${formatX(this.sacrificeBoost, 2, 2)}`;
    },
  },
  methods: {
    update() {
      this.disabledCondition = Sacrifice.disabledCondition;
    },
    sacrifice() {
      sacrificeBtnClick();
    },
    maxAll() {
      maxAll();
    }
  }
};
</script>

<template>
  <div class="l-antimatter-dim-tab__header">
    <PrimaryButton
      class="o-primary-btn--buy-max"
      @click="maxAll"
    >
      Max all (M)
    </PrimaryButton>
  </div>
</template>
