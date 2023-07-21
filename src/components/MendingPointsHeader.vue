<script>
export default {
  name: "MendingPointsHeader",
  data() {
    return {
      mendingPoints: 0,//new Decimal(),
      isVisible: true
    };
  },
  methods: {
    update() {
      this.mendingPoints.copyFrom(Currency.mendingPoints);
      this.isVisible = true;//PlayerProgress.infinityUnlocked();
    }
  }
};
</script>

<template>
  <div
    v-show="isVisible"
    class="c-infinity-tab__header"
  >
    You have
    <span class="c-infinity-tab__infinity-points">{{ format(mendingPoints, 2) }}</span>
    {{ pluralize("Multiversal Remain", mendingPoints) }}.
  </div>
</template>

<style scoped>

</style>
