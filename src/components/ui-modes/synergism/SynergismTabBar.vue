<script>
import SynergismTabButton from "./SynergismTabButton";

export default {
  name: "SynergismTabBar",
  components: {
    SynergismTabButton,
  },
  computed: {
    tabs: () => Tabs.Synergism,
  },
};
</script>

<template>
  <div>
    <SynergismTabButton
      v-for="(tab, i) in tabs"
      :key="i"
      :tab-position="i"
      :tab="tab"
    />
  </div>
</template>

<style scoped>

</style>
