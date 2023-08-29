<script>
export default {
  name: "MendingPointsHeader",
  data() {
    return {
      mendingPoints: new Decimal(),
      isVisible: false
    };
  },
  methods: {
    update() {
      this.mendingPoints.copyFrom(Currency.mendingPoints);
      this.isVisible = PlayerProgress.mendingUnlocked();
    }
  }
};
</script>

<template>
  <div
    v-show="isVisible"
    class="c-mending-points"
  >
    You have
    <span class="c-mending-tab__mending-points">{{ formatNE(mendingPoints, 2) }}</span>
    {{ pluralize("Multiversal Remain", mendingPoints) }}.
  </div>
</template>

<style scoped>
.c-mending-points {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
</style>
