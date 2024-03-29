<script>
import ExpandingControlBox from "@/components/ExpandingControlBox";
import { PlayerProgress } from "../../../core/player-progress";

export default {
  name: "RemnantGainFactor",
  components: {
    ExpandingControlBox
  },
  props: {
    hide: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      best: {
        am: new Decimal(0),
        ip: new Decimal(0),
        ep: new Decimal(0)
      },
      dilationMult: [1, 1, 1],
      remnants: 0,
      remnantsGain: 0,
      MendingUnlocked: false,
      autoRemnantGain: false,
    };
  },
  computed: {
    opacity() {
      return Number(!this.hide);
    },
  },
  methods: {
    update() {
      this.best.am.copyFrom(player.celestials.pelle.records.totalAntimatter);
      this.best.ip.copyFrom(player.celestials.pelle.records.totalInfinityPoints);
      this.best.ep.copyFrom(player.celestials.pelle.records.totalEternityPoints);
      this.dilationMult = PelleStrikes.dilation.hasStrike ? [500, 10, 5] : [1, 1, 1];
      this.remnants = Pelle.cel.remnants;
      this.remnantsGain = Pelle.remnantsGain;
      this.MendingUnlocked = PlayerProgress.mendingUnlocked();
      this.autoRemnantGain = MendingUpgrades.all[4].isBought;
    }
  }
};
</script>

<template>
  <div class="c-remnant-factors-container">
    <ExpandingControlBox
      container-class="c-remnant-factors"
      label="Remnant Gain Factors"
      :style="{ opacity }"
    >
      <template #dropdown>
        <div class="c-remnant-factors-text">
          Best AM: {{ format(best.am, 2, 2) }}<br>
          Best IP: {{ format(best.ip, 2, 2) }}<br>
          Best EP: {{ format(best.ep, 2, 2) }}<br><br>
          <div class="l-remnant-factors-row">
            <div class="l-remnant-factors-col l-remnant-factors-col--first">
              <div class="l-remnant-factors-item">
                log10(log10(AM){{ dilationMult[0] > 1 ? `*${dilationMult[0]}` : "" }} + 2)
              </div>
              <div class="l-remnant-factors-item">
                log10(log10(IP){{ dilationMult[1] > 1 ? `*${dilationMult[1]}` : "" }} + 2)
              </div>
              <div class="l-remnant-factors-item">
                log10(log10(EP){{ dilationMult[2] > 1 ? `*${dilationMult[2]}` : "" }} + 2)
              </div>
              <div 
              v-show="MendingUnlocked"
              class="l-remnant-factors-item">
                1 Mend Milestone
              </div>
              <div class="l-remnant-factors-item">
                Static divisor
              </div>
              <div class="l-remnant-factors-item">
                Static power
              </div>
              <div class="l-remnant-factors-item" v-if="!autoRemnantGain">
                Existing Remnants
              </div>
              <div class="l-remnant-factors-item">
                Final amount
              </div>
            </div>
            <div class="l-remnant-factors-col">
              <div class="l-remnant-factors-item" />
              <div class="l-remnant-factors-item">
                +
              </div>
              <div class="l-remnant-factors-item">
                +
              </div>
              <div
              v-show="MendingUnlocked"
              class="l-remnant-factors-item">
                *
              </div>
              <div class="l-remnant-factors-item">
                /
              </div>
              <div class="l-remnant-factors-item">
                ^
              </div>
              <div class="l-remnant-factors-item" v-if="!autoRemnantGain">
                -
              </div>
            </div>
            <div class="l-remnant-factors-col">
              <div class="l-remnant-factors-item">
                {{ format(Math.log10(best.am.add(1).log10()*dilationMult[0] + 2), 2, 2) }}
              </div>
              <div class="l-remnant-factors-item">
                {{ format(Math.log10(best.ip.add(1).log10()*dilationMult[0] + 2), 2, 2) }}
              </div>
              <div class="l-remnant-factors-item">
                {{ format(Math.log10(best.ep.add(1).log10()*dilationMult[0] + 2), 2, 2) }}
              </div>
              <div
              v-show="MendingUnlocked" 
              class="l-remnant-factors-item">
                {{ format(1.1, 2, 1) }}
              </div>
              <div class="l-remnant-factors-item">
                {{ format(1.64, 2, 2) }}
              </div>
              <div class="l-remnant-factors-item">
                {{ format(7.5, 2, 2) }}
              </div>
              <div class="l-remnant-factors-item" v-if="!autoRemnantGain">
                {{ format(remnants, 2, 0) }}
              </div>
              <div class="l-remnant-factors-item" v-if="!autoRemnantGain">
                {{ format(remnantsGain, 2, remnantsGain >= 1 ? 0 : 2) }}
              </div>
              <div class="l-remnant-factors-item" v-else>
                {{ format(remnants, 2, 0) }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </ExpandingControlBox>
  </div>
</template>

<style>
.c-remnant-factors-container {
  position: relative;
  z-index: 4;
}

.c-remnant-factors-container .l-expanding-control-box {
  transition: opacity 0.5s;
}

.c-remnant-factors {
  z-index: 4;
  font-weight: bold;
  color: var(--color-text);
  background-color: var(--color-text-inverted);
  border: var(--var-border-width, 0.2rem) solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.3rem;
}

.c-remnant-factors-text {
  padding: 0.3rem;
}

.l-remnant-factors-row {
  display: flex;
  width: 100%;
}

.l-remnant-factors-col {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: column;
  margin-left: 2rem;
}

.l-remnant-factors-col--first {
  flex-grow: 1;
  margin-left: 0;
}

.l-remnant-factors-item {
  height: 2rem;
  text-align: left;
}
</style>
