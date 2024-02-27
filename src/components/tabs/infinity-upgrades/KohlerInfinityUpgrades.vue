<script>
import KohlerInfinityUpgradeButton from "./KohlerInfinityUpgradeButton";
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "KohlerInfinityUpgrades",
  components: {
    KohlerInfinityUpgradeButton
  },
  data() {
    return{
      infinityPoints: new Decimal(0)
    };
  },
  computed: {
    upgrades: () => KohlerInfinityUpgrades.all,
    costScalingTooltip: () => `Prices start increasing faster above ${format(1e30)} RM and then even faster
      above ${format(Decimal.NUMBER_MAX_VALUE, 1)} RM`,
    possibleTooltip: () => `Checkered upgrades are impossible to unlock this Reality. Striped upgrades are
      still possible.`,
    lockTooltip: () => `This will only function if you have not already failed the condition or
      unlocked the upgrade.`,
    grid: () => []
  },
  methods: {
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    },
    update(){
      this.infinityPoints.copyFrom(Currency.infinityPoints.value)
    }
  }
};

</script>

<template>
<div class="c-remains-amount">
  You have <span class="c-remains-amount__accent">{{ format(infinityPoints, 2) }}</span> {{ pluralize("Infinity Point", infinityPoints )}}.
  <br><br>
    <div class="l-mending-upgrade-grid">
      <div
        v-for=" row in 2"
        :key="row"
        class="l-mending-upgrade-grid__row">
      <KohlerInfinityUpgradeButton 
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
        class="l-mending-upgrade-grid__cell"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-remains-amount {
  font-size: 1.5rem;
  color: var(--color-text);
}

.l-mending-upgrade-grid{
  display: flex;
  flex-direction: column;
}

.l-mending-upgrade-grid__row{
  display: flex;
  flex-direction: row;
}

.l-mending-upgrade-grid__cell{
  margin: 0.5rem 0.8rem;
}
.c-remains-amount__accent {
  font-size: 2rem;
  color: var(--color-infinity);
}
.c-mending-upgrade-infotext {
  font-size: 1rem;
  color: var(--color-text);
  margin: -1rem 0 1.5rem;
}
</style>
