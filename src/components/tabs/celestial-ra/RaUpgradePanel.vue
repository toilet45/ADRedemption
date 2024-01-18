<script>
import { RaUpgrade } from '../../../core/globals';
import RaUpgradeVue from './RaUpgrade.vue';
export default {
  name: "RaUpgradePanel",
  components: {
    RaUpgradeVue,
  },
  data() {
    return {
      raPoints: new Decimal(0),
      GainPerSecond: new Decimal(0),
    };
  },
  computed: {
    rebuyables: () => RaUpgrade.rebuyables,
    singles: () => RaUpgrade.singles,
  },
  methods: {
    update() {
      this.raPoints.copyFrom(player.celestials.ra.raPoints);
      this.GainPerSecond = Ra.raPointsGain(1000);
    },
  }
}
</script>

<template>
  <div class="l-ra-panel-container">
    <div class="c-ra-pet-title" style="font-weight: bold; color: var(--color-ra--base);">Ra's Shop</div>
    <br>
        You currently has {{ format(raPoints,3,3) }} Ra's Memory Crystals. Gaining {{ format(GainPerSecond,3,3) }}/s, depending on Dimension Boosts in Ra's Reality.
    <br>
    <div class="c-ra-upgrade-container">
      <RaUpgradeVue v-for="upgrade in rebuyables" :key="upgrade.config.id" :upgrade="upgrade" :isRebuyable="true" />
    </div>
  </div>
</template>

<style scoped>
.c-ra-upgrade-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 140rem;
  justify-content: center;
}

.l-ra-panel-container {
  width: 140rem;
  border: var(--var-border-width, 0.2rem) solid var(--color-ra--base);
  border-radius: var(--var-border-radius, 0.5rem);
  margin: 1rem;
  padding: 1rem;
  -webkit-user-select: none;
  user-select: none;
}

.line {
  width: 100%;
  height: .1rem;
  border: 0;
  border-top: .1rem solid var(--color-ra--base);
  margin: .5rem 0;
  padding: 0;
}
</style>