<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";

export default {
  name: "ModernMatterDimensionRow",
  components: {
    GenericDimensionRowText
  },
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isCapped: false,
      multiplier: new Decimal(0),
      amount: new Decimal(0),
      bought: 0,
      boughtBefore10: 0,
      rateOfChange: new Decimal(0),
      singleCost: new Decimal(0),
      until10Cost: new Decimal(0),
      isAffordable: false,
      buyUntil10: true,
      howManyCanBuy: 0,
      isContinuumActive: false,
      continuumValue: 0,
      isShown: false,
      amountDisplay: "",
      hasTutorial: false,
      boostCost: new Decimal(0),
      isBoostAffordable: false,
      energy: new Decimal(0)
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    name() {
      return `${MatterDimension(this.tier).shortDisplayName} Matter Dimension`;
    },
    costDisplay() {
      return this.buyUntil10 ? format(this.until10Cost) : format(this.singleCost);
    },
    continuumString() {
      if (this.continuumValue >= 1e9) return format(this.continuumValue, 2, 2);
      return formatFloat(this.continuumValue, 2);
    },
    showRow() {
      return this.isShown || this.isUnlocked || this.amount.gt(0);
    },
    boughtTooltip() {
      if (this.isCapped) return `Capped`;
      if (this.isContinuumActive) return "Continuum produces all your Antimatter Dimensions";
      return `Purchased ${quantifyInt("time", this.bought)}`;
    },
    costUnit() {
      return `${AntimatterDimension(this.tier - 2).shortDisplayName} MD`;
    },
    buttonPrefix() {
      if (!this.isUnlocked) return "Locked";
      if (this.isCapped) return "Capped";
      if (this.isContinuumActive) return "Continuum: ";
      return `Buy ${formatInt(this.howManyCanBuy)}`;
    },
    boostPrefix(){
      return `Boost this Dimension`
    },
    boostValue(){
      return `Cost: ${format(this.boostCost)} Energy`
    },
    buttonValue() {
      if (this.isCapped) return "";
      if (this.isContinuumActive) return this.continuumString;
      const prefix = this.showCostTitle(this.buyUntil10 ? this.until10Cost : this.singleCost) ? "Cost: " : "";
      const suffix = this.isCostsAD ? this.costUnit : "Matter";
      return `${prefix}${this.costDisplay} ${suffix}`;
    },
    hasLongText() {
      return this.buttonValue.length > 20;
    },
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = MatterDimension(tier);
      this.isUnlocked = dimension.isAvailableForPurchase;
      const buyUntil10 = player.buyUntil10;
      this.isCapped = false;
      this.multiplier.copyFrom(MatterDimension(tier).multiplier);
      this.amount.copyFrom(dimension.totalAmount);
      this.bought = dimension.bought;
      this.boughtBefore10 = dimension.boughtBefore10;
      this.howManyCanBuy = buyUntil10 ? dimension.howManyCanBuy : Math.min(dimension.howManyCanBuy, 1);
      this.singleCost.copyFrom(dimension.cost);
      this.until10Cost.copyFrom(dimension.cost.times(Math.max(dimension.howManyCanBuy, 1)));
      this.boostCost.copyFrom(dimension.boostCost);
      if (tier < 4) {
        this.rateOfChange.copyFrom(dimension.rateOfChange);
      }
      this.isAffordable = dimension.isAffordable;
      this.buyUntil10 = buyUntil10;
      this.isContinuumActive = false;
      if (this.isContinuumActive) this.continuumValue = dimension.continuumValue;
      this.isShown = true;
      this.amountDisplay = this.tier < 44 ? format(this.amount, 2) : (MatterDimension(4).totalAmount.gte(1e12)? format(this.amount, 2) : formatInt(this.amount));
      this.hasTutorial = false,
      this.isBoostAffordable = this.energy.gte(dimension.boostCost);
      this.energy.copyFrom(Currency.energy.value);
    },
    buy() {
      if (this.isContinuumActive) return;
      if (this.howManyCanBuy === 1) {
        buyOneMatterDimension(this.tier);
      } else {
        buyAsManyMDAsYouCanBuy(this.tier);
      }
    },
    buyBoost(){
      if (this.isContinuumActive) return;
      buyMatterBoost(this.tier);
    },
    showCostTitle(value) {
      return value.exponent < 1000000;
    },
    isLongText(str) {
      return str.length > 20;
    },
    boostButtonClass(){
      return {
        "o-primary-btn o-primary-btn--new": true,
        "o-primary-btn--disabled": !this.isBoostAffordable || !this.isUnlocked || this.isCapped,
        "l-dim-row-small-text": this.isLongText(this.boostPrefix) || !this.showCostTitle(this.boostValue),
      };
    },
    buttonClass() {
      return {
        "o-primary-btn o-primary-btn--new": true,
        "o-primary-btn--disabled": (!this.isAffordable && !this.isContinuumActive) || !this.isUnlocked || this.isCapped,
        "o-non-clickable o-continuum": this.isContinuumActive
      };
    },
    buttonTextClass() {
      return {
        "button-content l-modern-buy-ad-text": true,
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    }
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-dimension-row l-dimension-row-antimatter-dim c-antimatter-dim-row l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 2)"
      :amount-text="amountDisplay"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container c-modern-dim-tooltip-container">
      <div class="c-modern-dim-purchase-count-tooltip">
        {{ boughtTooltip }}
      </div>
      <button
        :class="buttonClass()"
        @click="buy"
      >
        <div :class="buttonTextClass()">
          <div>
            {{ buttonPrefix }}
          </div>
          <div :class="{ 'l-dim-row-small-text': hasLongText }">
            {{ buttonValue }}
          </div>
          <div
            v-if="hasTutorial"
            class="fas fa-circle-exclamation l-notification-icon"
          />
        </div>
        <div
          v-if="!isContinuumActive && isUnlocked && !isCapped"
          class="fill"
        >
          <div
            class="fill-purchased"
            :style="{ 'width': boughtBefore10*10 + '%' }"
          />
          <div
            class="fill-possible"
            :style="{ 'width': howManyCanBuy*10 + '%' }"
          />
        </div>
      </button>
      <button
        :class="boostButtonClass()"
        @click="buyBoost"
      >
        <div :class="buttonTextClass()">
          <div>
            {{ boostPrefix }}
          </div>
          <div :class="{ 'l-dim-row-small-text': hasLongText }">
            {{ boostValue }}
          </div>
          <div
            v-if="hasTutorial"
            class="fas fa-circle-exclamation l-notification-icon"
          />
        </div>
        <div
          v-if="!isContinuumActive && isUnlocked && !isCapped"
          class="fill"
        >
          <div
            class="fill-purchased"
            :style="{ 'width': boughtBefore10*10 + '%' }"
          />
          <div
            class="fill-possible"
            :style="{ 'width': howManyCanBuy*10 + '%' }"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.l-modern-buy-ad-text {
  display: flex;
  flex-direction: column;
}

.o-non-clickable {
  cursor: auto;
}

.o-continuum {
  border-color: var(--color-laitela--accent);
  color: var(--color-laitela--accent);
  background: var(--color-laitela--base);
}

.o-continuum:hover {
  border-color: var(--color-laitela--accent);
  color: var(--color-laitela--base);
  background: var(--color-laitela--accent);
}
</style>
