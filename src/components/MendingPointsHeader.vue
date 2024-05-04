<script>
export default {
  name: "MendingPointsHeader",
  data() {
    return {
      mendingPoints: new Decimal(),
      isVisible: false,
      isKPVisible: false,
      kohlerPoints: new Decimal()
    };
  },
  methods: {
    update() {
      this.mendingPoints.copyFrom(Currency.mendingPoints);
      this.isVisible = PlayerProgress.mendingUnlocked();
      this.isKPVisible = player.kohlerPoints.gt(0);
      this.kohlerPoints.copyFrom(Currency.kohlerPoints);
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
    <span v-if="isKPVisible">
      <br>
      You have <span class="c-mending-tab__mending-points">{{ formatNE(kohlerPoints, 2) }}</span> {{ pluralize("Fragmented Remain", kohlerPoints) }}.</span>
  </div>
</template>
<!--<template>
<div
v-show="isKPVisible"
class="c-mending-points"
>

</div>
</template>-->

<style scoped>
.c-mending-points {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
</style>
