<script>
import ClassicMatterDimensionsTab from "./ClassicMatterDimensionsTab";
import ModernMatterDimensionsTab from "./ModernMatterDimensionsTab";
import SynergismMatterDimensionsTab from "./SynergismMatterDimensionsTab";

export default {
  name: "MatterDimensionsTab",
  components: {
    ClassicMatterDimensionsTab,
    ModernMatterDimensionsTab,
    SynergismMatterDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.UIType == 'Modern'
        ? "ModernMatterDimensionsTab"
        : this.$viewModel.UIType == 'Synergism'
        ? "SynergismMatterDimensionsTab"
        : "ClassicMatterDimensionsTab";
    }
  },
};
</script>

<template>
  <component :is="activeComponent" />
</template>
