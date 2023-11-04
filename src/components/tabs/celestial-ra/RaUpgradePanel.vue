<script>
  import RaUpgradeVue from './RaUpgrade.vue';
  export default{
    name: "RaUpgradePanel",
    components:{
      RaUpgradeVue,
    },
    computed:{
      rebuyables: () => RaUpgrade.rebuyables,
    }
  }
</script>

<template>
  <div class="l-ra-panel-container">
    <div class="c-ra-upgrade-container">
      <RaUpgradeVue
      v-for="upgrade in rebuyables"
      :key="upgrade.config.id"
      :upgrade="upgrade"
      :isRebuyable="true"
      />
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
</style>