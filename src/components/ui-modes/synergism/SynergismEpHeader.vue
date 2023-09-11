<script>
export default {
  name: "SynergismEPHeader",
  data() {
    return {
      eternityPoints: new Decimal()
    };
  },
  methods: {
    update() {
      this.eternityPoints.copyFrom(Currency.eternityPoints.value.floor());
    }
  }
};
</script>

<template>
  <div class="c-eternity-tab__header">
    <span class="c-eternity-tab__eternity-points">{{ format(this.eternityPoints, 2) }}</span>
  </div>
</template>

<style scoped>

</style>
