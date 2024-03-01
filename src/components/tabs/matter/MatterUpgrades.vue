<script>
import MatterUpgradeButton from "./MatterUpgradeButton";
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "MatterUpgrades",
  components: {
    MatterUpgradeButton
  },
  data() {
    return{
      matter: new Decimal(0)
    };
  },
  computed: {
    upgrades: () => MatterUpgrades.all,
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
      this.matter.copyFrom(Currency.matter.value)
    }
  }
};

</script>

<template>
<div class="c-matter-amount">
  You have <span class="c-matter-amount__accent">{{ format(matter, 2) }}</span> Matter.
  <br><br>
  <div class="c-matter-upgrade-infotext">These upgrades can only be purchased in Infinity Challenge 9</div>
    <div class="l-matter-upgrade-grid">
      <div
        v-for=" row in 2"
        :key="row"
        class="l-matter-upgrade-grid__row">
      <MatterUpgradeButton 
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
        class="l-matter-upgrade-grid__cell"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-matter-amount {
  font-size: 1.5rem;
  color: var(--color-text);
}

.l-matter-upgrade-grid{
  display: flex;
  flex-direction: column;
}

.l-matter-upgrade-grid__row{
  display: flex;
  flex-direction: row;
}

.l-matter-upgrade-grid__cell{
  margin: 0.5rem 0.8rem;
}
.c-matter-amount__accent {
  font-size: 2rem;
  color: #4f4f4f;
}
.c-matter-upgrade-infotext {
  font-size: 1rem;
  color: var(--color-text);
  margin: -1rem 0 1.5rem;
}
</style>
