<script>
import ClassicAntimatterDimensionsTab from "./ClassicAntimatterDimensionsTab";
import ModernAntimatterDimensionsTab from "./ModernAntimatterDimensionsTab";
import SynergismAntimatterDimensionsTab from "./SynergismAntimatterDimensionsTab";

export default {
  name: "AntimatterDimensionsTab",
  components: {
    ClassicAntimatterDimensionsTab,
    ModernAntimatterDimensionsTab,
    SynergismAntimatterDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.UIType == 'Modern'
        ? "ModernAntimatterDimensionsTab"
        : this.$viewModel.UIType == 'Synergism'
        ? "SynergismAntimatterDimensionsTab"
        : "ClassicAntimatterDimensionsTab";
    }
  },
};
</script>

<template>
  <component :is="activeComponent" />
</template>
