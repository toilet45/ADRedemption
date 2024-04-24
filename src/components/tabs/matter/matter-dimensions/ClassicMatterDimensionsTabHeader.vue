<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicAntimatterDimensionsTabHeader",
  components: {
    PrimaryButton
  },
  data() {
    return {
    };
  },
  methods: {
    update() {
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
