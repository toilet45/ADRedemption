<script>
import { PlayerProgress } from '../../../../core/player-progress';

export default {
  name: "SynergismBigCrunchButton",
  data() {
    return {
      isVisible: false,
      gainedIP: new Decimal(0),
      currentIPRate: new Decimal(0),
      peakIPRate: new Decimal(0),
      peakIPRateVal: new Decimal(0),
      currentIP: new Decimal(0),
      tesseractAffordable: false,
      canCrunch: false,
      infinityGoal: new Decimal(0),
      inAntimatterChallenge: false,
      hover: false,
      headerTextColored: true,
      creditsClosed: false,
      showIPRate: false,
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "o-infinity-button--unavailable": !this.canCrunch,
        "o-pelle-disabled-pointer": this.creditsClosed
      };
    },
    // Show IP/min below this threshold, color the IP number above it
    rateThreshold: () => 5e11,
    amountStyle() {
      if (!this.headerTextColored || this.currentIP.lt(this.rateThreshold)) return {
        "transition-duration": "0s"
      };
      if (this.hover) return {
        color: "black",
        "transition-duration": "0.2s"
      };

      // Dynamically generate red-text-green based on the CSS entry for text color, returning a raw 6-digit hex color
      // code. stepRGB is an array specifying the three RGB codes, which are then interpolated between in order to
      // generate the final color; only ratios between 0.9-1.1 give a color gradient
      const textHexCode = getComputedStyle(document.body).getPropertyValue("--color-text").split("#")[1];
      const stepRGB = [
        [255, 0, 0],
        [
          parseInt(textHexCode.substring(0, 2), 16),
          parseInt(textHexCode.substring(2, 4), 16),
          parseInt(textHexCode.substring(4), 16)
        ],
        [0, 255, 0]
      ];
      const ratio = this.gainedIP.log10() / this.currentIP.log10();
      const interFn = index => {
        if (ratio < 0.9) return stepRGB[0][index];
        if (ratio < 1) {
          const r = 10 * (ratio - 0.9);
          return Math.round(stepRGB[0][index] * (1 - r) + stepRGB[1][index] * r);
        }
        if (ratio < 1.1) {
          const r = 10 * (ratio - 1);
          return Math.round(stepRGB[1][index] * (1 - r) + stepRGB[2][index] * r);
        }
        return stepRGB[2][index];
      };
      const rgb = [interFn(0), interFn(1), interFn(2)];
      return {
        color: `rgb(${rgb.join(",")})`,
        "transition-duration": "0.2s"
      };
    },
  },
  methods: {
    update() {
      this.isVisible = player.break;
      this.tesseractAffordable = Tesseracts.canBuyTesseract;
      if (!this.isVisible) return;
      this.canCrunch = Player.canCrunch;
      this.infinityGoal.copyFrom(Player.infinityGoal);
      this.inAntimatterChallenge = Player.isInAntimatterChallenge;
      this.headerTextColored = player.options.headerTextColored;
      this.creditsClosed = ((GameEnd.creditsEverClosed && !PlayerProgress.mendingUnlocked()) || (PlayerProgress.mendingUnlocked() && player.isGameEnd));

      const gainedIP = gainedInfinityPoints();
      this.currentIP.copyFrom(Currency.infinityPoints);
      this.gainedIP.copyFrom(gainedIP);
      this.currentIPRate.copyFrom(gainedIP.dividedBy(Math.clampMin(0.0005, Time.thisInfinityRealTime.totalMinutes)));
      this.peakIPRate.copyFrom(player.records.thisInfinity.bestIPmin);
      this.peakIPRateVal.copyFrom(player.records.thisInfinity.bestIPminVal);
      this.showIPRate = this.peakIPRate.lte(this.rateThreshold);
    },
    switchToInfinity() {
      Tab.dimensions.infinity.show(true);
    },
    crunch() {
      if (!Player.canCrunch) return;
      manualBigCrunchResetRequest();
    }
  },
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    class="o-prestige-button o-infinity-button"
    @click="crunch"
  >
    <!-- Can Crunch -->
    <template>
      <div/>
      <b>
        C
      </b>
    </template>
  </button>
</template>

<style scoped>

</style>
