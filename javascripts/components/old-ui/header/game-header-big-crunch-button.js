"use strict";

Vue.component("game-header-big-crunch-button", {
  data() {
    return {
      isVisible: false,
      gainedIP: new Decimal(0),
      currentIPPM: new Decimal(0),
      peakIPPM: new Decimal(0),
      currentIP: new Decimal(0),
      tesseractUnlocked: false,
      tesseractCost: new Decimal(0),
      tesseractAffordable: false,
      hover: false,
      headerTextColored: true,
    };
  },
  computed: {
    peakIPPMThreshold: () => new Decimal("1e100"),
    isPeakIPPMVisible() {
      return this.peakIPPM.lte(this.peakIPPMThreshold);
    },
    amountStyle() {
      if (!this.headerTextColored || this.hover || this.currentIP.lt(1e50)) return {};

      const ratio = this.gainedIP.log10() / this.currentIP.log10();
      const rgb = [
        Math.round(255 - (ratio - 1) * 10 * 255),
        Math.round(255 - (1 - ratio) * 10 * 255),
        ratio > 1 ? Math.round(255 - (ratio - 1) * 10 * 255)
        : Math.round(255 - (1 - ratio) * 10 * 255)
      ];
      return { color: `rgb(${rgb.join(",")})` };
    },
  },
  methods: {
    update() {
      this.isVisible = player.break &&
        player.records.thisInfinity.maxAM.gte(Decimal.NUMBER_MAX_VALUE) &&
        !InfinityChallenge.isRunning;
      if (NormalChallenge.isRunning) {
        if (!Enslaved.isRunning || !Enslaved.BROKEN_CHALLENGES.includes(NormalChallenge.current.id)) {
          this.isVisible = false;
        }
      }
      if (!this.isVisible) return;
      this.headerTextColored = player.options.headerTextColored;
      const gainedIP = gainedInfinityPoints();
      this.currentIP.copyFrom(Currency.infinityPoints);
      this.gainedIP.copyFrom(gainedIP);
      this.peakIPPM.copyFrom(player.records.thisInfinity.bestIPmin);
      if (this.isPeakIPPMVisible) {
        this.currentIPPM.copyFrom(gainedIP.dividedBy(Time.thisInfinityRealTime.totalMinutes));
      }
      this.tesseractUnlocked = Enslaved.isCompleted;
      this.tesseractCost = Enslaved.tesseractCost;
      this.tesseractAffordable = this.tesseractUnlocked && this.currentIP.gt(this.tesseractCost);
    },
    switchToInfinity() {
      Tab.dimensions.infinity.show(true);
    },
  },
  template:
    `<button
      v-if="isVisible && !tesseractAffordable"
      class="o-prestige-button o-infinity-button l-game-header__big-crunch-btn"
      onclick="bigCrunchResetRequest()"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div v-if="!isPeakIPPMVisible"/>
      <b>Big Crunch for
      <span :style="amountStyle">{{format(gainedIP, 2, 0)}}</span>
      Infinity {{ "Point" | pluralize(gainedIP) }}.</b>
      <template v-if="isPeakIPPMVisible">
        <br>
        {{format(currentIPPM, 2, 0)}} IP/min
        <br>
        Peaked at {{format(peakIPPM, 2, 0)}} IP/min
      </template>
      <div v-else/>
    </button>
    <button
      v-else-if="tesseractAffordable"
      class="o-prestige-button l-game-header__big-crunch-btn c-game-header__tesseract-available"
      @click="switchToInfinity"
    >
      <b>
        You have enough Infinity Points to buy a Tesseract
      </b>
    </button>`
});
