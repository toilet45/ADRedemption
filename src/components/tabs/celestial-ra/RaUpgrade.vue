<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "RaUpgrade",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isAvailableForPurchase: false,
      canBeBought: false,
      isRebuyable: false,
      isBought: false,
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    classObject() {
      return {
        "c-ra-upgrade--bought": this.isBought && !this.isUseless,
        "c-ra-upgrade--unavailable": !this.isAvailableForPurchase,
      };
    },
    color() {
      const cel = this.config.celestial??"ra";
      return `--cel-color: var(--color-ra-pet--${cel})`;
    },
    currency(){
      return this.config.currencyLabel;
    },
    isUseless() {
      return false;
    },
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.isAvailableForPurchase = upgrade.isAvailableForPurchase;
      this.canBeBought = upgrade.canBeBought;
      this.isRebuyable = upgrade.isRebuyable;
      this.isBought = upgrade.isRebuyable
                      ? upgrade.isCapped
                      : upgrade.isBought;
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group" :style="color">
    <button
      :class="classObject"
      class="c-ra-upgrade"
      @click="upgrade.purchase()"
    >
      <span :class="{ 'o-pelle-disabled': isUseless }">
        <DescriptionDisplay :config="config" />
        <template>
          <EffectDisplay
            :config="config"
            br
          />
          <CostDisplay
            v-if="!isBought && config.implemented"
            :config="config"
            br
            :name="currency"
          />
        </template>
      </span>
      <span v-if="!config.implemented"><br>Not Yet Implemented</span>
    </button>
  </div>
</template>

<style scoped>
.c-ra-upgrade {
  display: flex;
  flex-direction: column;
  width: 18.5rem;
  height: 12rem;
  position: relative;
  justify-content: center;
  align-items: center;
  font-family: Typewriter;
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--color-text);
  background: var(--color-text-inverted);
  border: 0.1rem solid var(--cel-color);
  border-radius: var(--var-border-radius, 0.5rem);
  box-shadow: inset 0 0 1rem 0.1rem var(--cel-color);
  margin: 0.6rem 0.3rem;
  padding: 2rem;
  cursor: pointer;
}
.c-ra-upgrade:hover {
  box-shadow: inset 0 0 2rem 0.1rem var(--cel-color);
  transition-duration: 0.3s;
}
.c-ra-upgrade--unavailable {
  color: black;
  background: #5f5f5f;
  box-shadow: none;
  cursor: not-allowed;
}
.c-ra-upgrade--bought {
  color: black;
  background: var(--cel-color);
  cursor: default;
}
</style>
