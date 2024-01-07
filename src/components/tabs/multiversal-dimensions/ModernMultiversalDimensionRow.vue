<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import { Pelle } from "../../../core/globals";

export default {
  name: "ModernMultiversalDimensionRow",
  components: {
    GenericDimensionRowText,
    PrimaryButton,
    PrimaryToggleButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    },
    areAutobuyersUnlocked: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isUnlocked: false,
      multiplier: new Decimal(0),
      amount: new Decimal(0),
      bought: 0,
      rateOfChange: new Decimal(0),
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isAutobuyerOn: false,
      requirementReached: false,
      realityUnlocked: false,
      showTTCost: false,
      ttCost: 0,
      ttGen: new Decimal(),
      currTT: new Decimal(),
      continuumValue: 0,
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return `${MultiversalDimension(this.tier).shortDisplayName} Multiversal Dimension`;
    },
    buttonContents() {
      return this.formattedMvRCost;
    },
    continuumString() {
      if (this.continuumValue >= 1e9) return format(this.continuumValue, 2, 2);
      return formatFloat(this.continuumValue, 2);
    },
    tooltipContents() {
      if (this.showTTCost) return `${this.formattedMvRCost}<br>${this.timeEstimate}`;
      return `Purchased ${quantifyInt("time", this.bought)}`;
    },
    showRow() {
      return this.realityUnlocked || this.isUnlocked || this.requirementReached;
    },
    formattedTTCost() {
      return `Unlock: ${format(this.ttCost)} TT`;
    },
    formattedMvRCost() {
      return `${this.showCostTitle ? "Cost: " : ""}${format(this.cost, 2)} MvR`;
    },
    hasLongText() {
      return this.buttonContents.length > 15;
    },
    showCostTitle() {
      return this.cost.exponent < 1e6;
    },
    timeEstimate() {
      if (!this.showTTCost || this.ttGen.eq(0)) return "";
      const time = Decimal.sub(this.ttCost, this.currTT).dividedBy(this.ttGen);
      return time.gt(0) ? `Enough TT in ${TimeSpan.fromSeconds(time.toNumber()).toStringShort()}` : "";
    },
    cssVars() {
      return {
        '--x-pos': "-175%"
      };
    }
  },
  watch: {
    /* isAutobuyerOn(newValue) {
      Autobuyer.timeDimension(this.tier).isActive = newValue;
    } */
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = MultiversalDimension(tier);
      this.isUnlocked = true;
      this.multiplier.copyFrom(dimension.multiplier);
      this.amount.copyFrom(dimension.totalAmount);
      this.bought = dimension.bought;
      if (tier < 8) {
        this.rateOfChange.copyFrom(dimension.rateOfChange);
      }
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      // his.isAutobuyerOn = Autobuyer.timeDimension(this.tier).isActive;
      // this.showTTCost = !this.isUnlocked && !this.shiftDown;
      // if (this.tier > 4) this.ttCost = TimeStudy.timeDimension(this.tier).cost;
      this.currTT.copyFrom(Currency.timeTheorems.value);
      this.ttGen.copyFrom(getTTPerSecond().times(getGameSpeedupFactor()));
    },
    buyMultiversalDimension() {
      if (!this.isUnlocked) {
        MultiversalDimension(this.tier).tryUnlock();
        return;
      }
      buySingleMultiversalDimension(this.tier);
    },
    buyMaxMultiversalDimension() {
      buyMaxMultiversalDimension(this.tier);
    },
    buttonClass() {
      return {
        'l-dim-row-small-text': this.hasLongText,
      }
    },
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-dimension-row l-dimension-row-multiversal-dim l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked && !requirementReached }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 1)"
      :amount-text="format(amount, 2)"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container c-modern-dim-tooltip-container" :style="cssVars">
      <div class="c-modern-dim-purchase-count-tooltip" :style="cssVars">
        <span v-html="tooltipContents" />
      </div>
      <PrimaryButton
        :enabled="isAvailableForPurchase"
        class="o-primary-btn--buy-td o-primary-btn o-primary-btn--new o-primary-btn--buy-dim"
        :class="buttonClass()"
        @click="buyMultiversalDimension"
      >
        {{ buttonContents }}
      </PrimaryButton>
      <!--<PrimaryToggleButton
        v-if="areAutobuyersUnlocked"
        v-model="isAutobuyerOn"
        class="o-primary-btn--buy-td-auto"
        label="Auto:"
      />-->
      <PrimaryButton
        :enabled="isAvailableForPurchase"
        class="o-primary-btn--buy-td-auto"
        @click="buyMaxMultiversalDimension"
      >
        Buy Max
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.c-modern-dim-tooltip-container .c-modern-dim-purchase-count-tooltip {
  position: absolute;
  width: 20rem;
  top: 50%;
  font-size: 1.3rem;
  line-height: 1.6rem;
  color: white;
  background: black;
  border: 0.1rem solid var(--color-text);
  border-radius: var(--var-border-width, 0.5rem);
  /* Buttons are 40rem wide, tooltip is 20rem */
  transform: translate(calc(var(--x-pos) - 1rem), -50%);
  padding: 0.5rem;
  visibility: hidden;
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
