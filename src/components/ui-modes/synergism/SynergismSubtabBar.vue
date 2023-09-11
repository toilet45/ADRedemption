<script>
import SynergismSubtabButton from "./SynergismSubtabButton";

export default {
  name: "SynergismSubtabBar",
  components: {
    SynergismSubtabButton
  },
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    tab: () => Tabs.current,
    subtabs() {
      return this.tab.subtabs;
    }
  },
  methods: {
    update() {
      this.isVisible = this.subtabs.countWhere(subtab => subtab.isAvailable) > 1;
    }
  },
};
</script>

<template>
  <div
    v-if="isVisible"
    class="c-subtab-button-container"
  >
    <SynergismSubtabButton
      v-for="(subtab, i) in subtabs"
      :key="i"
      :subtab="subtab"
      :parent-name="tab.name"
    />
  </div>
</template>

<style scoped>

</style>
