<script>
export default {
  name: "MendingPointsHeader",
  data() {
    return {
      mendingPoints: new Decimal(),
      isVisible: true
    };
  },
  methods: {
    update() {
      this.mendingPoints.copyFrom(Currency.mendingPoints);
      this.isVisible = true;//PlayerProgress.mendingUnlocked();
    }
  }
};
</script>

<template>
  <div
    v-show="isVisible"
    class="c-mending-tab__header"
  >
    You have
    <span class="c-mending-tab__mending-points">{{ format(mendingPoints, 2) }}</span>
    {{ pluralize("Multiversal Remain", mendingPoints) }}.
  </div>
</template>

<style scoped>

</style>
