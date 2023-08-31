<script>
import MendingUpgradeButton from "./MendingUpgradeButton";
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "MendingUpgrades",
  components: {
    MendingUpgradeButton
  },
  data() {
    return{
      mendingPoints: new Decimal(0)
    };
  },
  computed: {
    upgrades: () => MendingUpgrades.all,
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
      this.mendingPoints.copyFrom(Currency.mendingPoints.value)
    }
  }
};

</script>

<template>
<div class="c-remains-amount">
  You have <span class="c-remains-amount__accent">{{ format(mendingPoints, 2) }}</span> {{ pluralize("Multiversal Remain", mendingPoints )}}.
  <br><br>
  <div class="c-mending-upgrade-infotext">Every completed row of purchased upgrades multiplies Multiversal Remain gain by 2.</div>
  <div class="c-mending-upgrade-infotext">Upgrades are numbered from left to right, top to bottom. For example "Deus Propitius", will be refered to as Mending Upgrade 10 (or MU10)</div>
    <div class="l-mending-upgrade-grid">
      <div
        v-for=" row in 4"
        :key="row"
        class="l-mending-upgrade-grid__row">
      <MendingUpgradeButton 
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
  color: var(--color-mending);
}
.c-mending-upgrade-infotext {
  font-size: 1rem;
  color: var(--color-text);
  margin: -1rem 0 1.5rem;
}
</style>
