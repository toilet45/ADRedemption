<script>
import ClassicMultiversalDimensionsTab from "./ClassicMultiversalDimensionsTab";
import ModernMultiversalDimensionsTab from "./ModernMultiversalDimensionsTab";

export default {
  name: "MultiversalDimensionsTab",
  components: {
    ClassicMultiversalDimensionsTab,
    ModernMultiversalDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.UIType == 'Modern'
        ? "ModernMultiversalDimensionsTab"
        : "ClassicMultiversalDimensionsTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
