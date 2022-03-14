<script>
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "PerkPointLabel",
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      pp: 0,
      fixedLoadPos: false,
      physicsEnabled: false,
    };
  },
  watch: {
    fixedLoadPos(newValue) {
      player.options.fixedPerkStartingPos = newValue;
    },
    physicsEnabled(newValue) {
      player.options.perkPhysicsEnabled = newValue;
      PerkNetwork.setPhysics(newValue);
    },
  },
  methods: {
    update() {
      this.pp = Math.floor(Currency.perkPoints.value);
      this.fixedLoadPos = player.options.fixedPerkStartingPos;
      this.physicsEnabled = player.options.perkPhysicsEnabled;
    },
    centerTree() {
      PerkNetwork.resetPosition();
    }
  }
};
</script>

<template>
  <div class="c-perk-tab__header">
    You have <span class="c-perk-tab__perk-points">{{ format(pp, 2) }}</span> {{ pluralize("Perk Point", pp) }}.
    <br>
    Perk choices are permanent and cannot be respecced.
    <br>
    Diamond-shaped perks also give Automator Points.
    <br>
    <div class="perk-settings">
      <PrimaryToggleButton
        v-model="fixedLoadPos"
        class="o-primary-btn"
        label="Starting tree layout:"
        on="Untangled"
        off="Random Positions"
      />
      <PrimaryToggleButton
        v-model="physicsEnabled"
        class="o-primary-btn"
        label="Physics:"
        on="Enabled"
        off="Disabled"
      />
      <PrimaryButton
        class="o-primary-btn"
        @click="centerTree"
      >
        Bring Tree to center
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
  .perk-settings > button {
    margin-right: 1rem;
  }
</style>