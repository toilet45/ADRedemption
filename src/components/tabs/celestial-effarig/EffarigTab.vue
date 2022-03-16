<script>
import EffarigUnlockButton from "./EffarigUnlockButton";
import EffarigRunUnlockReward from "./EffarigRunUnlockReward";
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";

export default {
  name: "EffarigTab",
  components: {
    EffarigUnlockButton,
    EffarigRunUnlockReward,
    CelestialQuoteHistory,
  },
  data() {
    return {
      isDoomed: false,
      relicShards: 0,
      shardRarityBoost: 0,
      shardsGained: 0,
      currentShardsRate: 0,
      amplification: 0,
      amplifiedShards: 0,
      amplifiedShardsRate: 0,
      runUnlocked: false,
      quote: "",
      isRunning: false,
      vIsFlipped: false,
      relicShardRarityAlwaysMax: false
    };
  },
  computed: {
    shopUnlocks: () => [
      EffarigUnlock.adjuster,
      EffarigUnlock.glyphFilter,
      EffarigUnlock.setSaves
    ],
    runUnlock: () => EffarigUnlock.run,
    runUnlocks: () => [
      EffarigUnlock.infinity,
      EffarigUnlock.eternity,
      EffarigUnlock.reality
    ],
    symbol: () => GLYPH_SYMBOLS.effarig,
    runButtonOuterClass() {
      return this.isRunning ? "c-effarig-run-button--running" : "c-effarig-run-button--not-running";
    },
    runButtonInnerClass() {
      return this.isRunning ? "c-effarig-run-button__inner--running" : "c-effarig-run-button__inner--not-running";
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[1].description();
    },
    showShardsRate() {
      return this.currentShardsRate;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.relicShards = Currency.relicShards.value;
      this.shardRarityBoost = Effarig.maxRarityBoost / 100;
      this.shardsGained = Effarig.shardsGained;
      this.currentShardsRate = (this.shardsGained / Time.thisRealityRealTime.totalSeconds);
      this.amplification = simulatedRealityCount(false);
      this.amplifiedShards = this.shardsGained * (1 + this.amplification);
      this.amplifiedShardsRate = (this.amplifiedShards / Time.thisRealityRealTime.totalSeconds);
      this.quote = Effarig.quote;
      this.runUnlocked = EffarigUnlock.run.isUnlocked;
      this.isRunning = Effarig.isRunning;
      this.vIsFlipped = V.isFlipped;
      this.relicShardRarityAlwaysMax = Ra.has(RA_UNLOCKS.EXTRA_CHOICES_AND_RELIC_SHARD_RARITY_ALWAYS_MAX);
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Effarig's", number: 1 });
    },
    createCursedGlyph() {
      if (Glyphs.freeInventorySpace === 0) {
        Modal.message.show("Inventory cannot hold new Glyphs. Sacrifice (shift-click) some Glyphs.");
        return;
      }
      const cursedCount = player.reality.glyphs.active
        .concat(player.reality.glyphs.inventory)
        .filter(g => g !== null && g.type === "cursed")
        .length;
      if (cursedCount >= 5) {
        GameUI.notify.error(`You don't need more than ${format(5)} Cursed Glyphs!`);
      } else {
        Glyphs.addToInventory(GlyphGenerator.cursedGlyph());
        GameUI.notify.error("Created a Cursed Glyph");
      }
    }
  }
};
</script>

<template>
  <div class="l-teresa-celestial-tab">
    <CelestialQuoteHistory celestial="effarig" />
    <div class="l-effarig-shop-and-run">
      <div class="l-effarig-shop">
        <div class="c-effarig-relics">
          You have {{ quantify("Relic Shard", relicShards, 2, 0) }}, which increases
          <br>
          the rarity of new Glyphs by {{ relicShardRarityAlwaysMax ? "" : "up to" }}
          +{{ formatPercents(shardRarityBoost, 2) }}.
        </div>
        <div class="c-effarig-relic-description">
          You will gain {{ quantify("Relic Shard", shardsGained, 2) }} next Reality
          ({{ format(currentShardsRate, 2) }}/s).
          <span v-if="amplification !== 0">
            <br>
            Due to amplification of your current Reality,
            <br>
            you will actually gain a total of
            {{ quantify("Relic Shard", amplifiedShards, 2) }} ({{ format(amplifiedShardsRate, 2) }}/s).
          </span>
        </div>
        <div class="c-effarig-relic-description">
          <br>
          More Eternity Points slightly increases Relic Shards
          <br>
          gained. More distinct Glyph effects significantly
          <br>
          increases Relic Shards gained.
        </div>
        <EffarigUnlockButton
          v-for="(unlock, i) in shopUnlocks"
          :key="i"
          :unlock="unlock"
        />
        <EffarigUnlockButton
          v-if="!runUnlocked"
          :unlock="runUnlock"
        />
        <button
          v-if="vIsFlipped"
          class="c-effarig-shop-button c-effarig-shop-button--available"
          @click="createCursedGlyph"
        >
          Get a Cursed Glyph...
        </button>
      </div>
      <div
        v-if="runUnlocked"
        class="l-effarig-run"
      >
        <div class="c-effarig-run-description">
          <div v-if="isRunning">
            You are in Effarig's Reality - give up?
          </div>
          <br>
          <span v-if="!isDoomed">
            Enter Effarig's Reality, in which {{ runDescription }}
          </span>
          <span v-else>
            You can't start Effarig's Reality, in which {{ runDescription }}
          </span>
        </div>
        <div
          :class="['l-effarig-run-button', 'c-effarig-run-button', runButtonOuterClass]"
          @click="startRun"
        >
          <div
            :class="runButtonInnerClass"
            :button-symbol="symbol"
          >
            {{ symbol }}
          </div>
        </div>
        <EffarigRunUnlockReward
          v-for="(unlock, i) in runUnlocks"
          :key="i"
          :unlock="unlock"
        />
      </div>
    </div>
  </div>
</template>