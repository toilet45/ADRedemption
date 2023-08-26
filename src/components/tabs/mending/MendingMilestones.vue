<script>

import { MendingMilestoneState } from "../../../core/mending";
import MendingMilestoneButton from "./MendingMilestoneButton";

export default {
  name: "MendingMilestones",
  components: {
    MendingMilestoneButton,
  },
  data() {
    return {
      mendCount: new Decimal(),
    };
  },
  computed: {
    milestones() {
      return Object.values(GameDatabase.mending.milestones)
        .sort((a, b) => a.mends - b.mends)
        .map(config => new MendingMilestoneState(config));
    },
    rows() {
      return this.milestones.length;
    }
  },
  methods: {
    update() {
      this.mendCount.copyFrom(Currency.mends.value.floor());
    },
    getMilestone(row) {
      return () => this.milestones[row - 1];
    }
  }
};

</script>

<template>
  <div class="l-mending-milestone-grid">
    <div>You have Mended the Multiverse {{ quantify("time", mendCount, 3) }}.</div>
    <div
      v-for="row in rows"
      :key="row"
      class="l-mends-milestone-grid__row"
    >
      <MendingMilestoneButton
        :key="row"
        :get-milestone="getMilestone(row)"
        class="l-mending-milestone-grid__cell"
      />
    </div>
  </div>
</template>

<style scoped>

</style>