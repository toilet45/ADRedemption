<script>
import { DC } from '../../../core/constants';
import { CorruptionData, Currency, MendingMilestone, Ra } from '../../../core/globals';
import { PlayerProgress } from '../../../core/player-progress';
import MendingPointsHeader from '../../MendingPointsHeader.vue';

export default {
    name: "MendingButton",
    data() {
        return {
            gainedMvR: new Decimal(0),
            canMend: false,
            firstMend: true,
            END: DC.END,
            needDoom: true,
            isCorrupted: false,
            noMendBonus: false,
            MvRRate: new Decimal(0),
            frags: 0,
            inKohler: false,
            kpThreshold: false,
            gainedKP: new Decimal(0)
        };
    },
    computed: {
        buttonClassObject() {
            return {
                "o-kohler-button": this.inKohler,
                "o-mending-button": true,
                "o-mending-button--unavailable": !this.canMend
            };
        }
    },
    methods: {
        update() {
            this.gainedMvR.copyFrom(gainedMendingPoints());
            this.canMend = (player.isGameEnd) || (MendingMilestone.six.isReached && player.antimatter.exponent >= 9e15) || this.noMendBonus || this.inKohler;
            this.firstMend = !PlayerProgress.mendingUnlocked();
            this.needDoom = !MendingMilestone.six.isReached;
            this.isCorrupted = player.mending.corruptionChallenge.corruptedMend;
            this.noMendBonus = Pelle.isDoomed && Currency.antimatter.exponent < 9e15 && Ra.unlocks.exitDoom.isUnlocked;
            this.MvRRate = this.gainedMvR.div(Time.thisMendRealTime.totalMinutes);
            this.frags = CorruptionData.isCorrupted ? Math.ceil(Math.log2(CorruptionData.calcScore())) : 0;
            this.inKohler = Kohler.isRunning;
            this.kpThreshold = player.antimatter.gte(1e12);
            this.gainedKP.copyFrom(gainedKohlerPoints());
        },
        mend() {
            mendingResetRequest();
        }
    },
    components: { MendingPointsHeader }
};
</script>
<template>
  <div>
    <button
      :class="buttonClassObject"
      class="c-mending-button"
      @click="mend"
    >
    <template v-if="firstMend">
      There is another way... You need to Mend the Multiverse.
    </template>
    <template v-else-if="inKohler && !kpThreshold">
      This Multiverse is too strict...must escape.
    </template>
    <template v-else-if="inKohler && kpThreshold">
      Escape this strict Multiverse for <span> {{ format(gainedKP) }}</span> Kohler {{ pluralize("Point", gainedKP) }}.
    </template>
    <template v-else-if="noMendBonus">
      Exit Doomed Reality, but get no Mend Rewards.
    </template>
    <template v-else-if="needDoom">
      Reach <span>{{ formatNE(END, 2, 2) }}</span> antimatter in a Doomed Reality to Mend the Multiverse
    </template>
    <template v-else-if="!canMend">
      Reach <span>{{ formatNE(END, 2, 2) }}</span> antimatter to Mend the Multiverse
    </template>
    <template v-else-if="isCorrupted">
      Make the Multiverse Friendly for {{ formatNE(frags, 0, 0) }} Hostile Fragments
    </template>
    <template v-else>
      Mend the Multiverse for
      <span>{{ formatNE(gainedMvR, 2) }}</span>
      Multiversal {{ pluralize("Remain", gainedMvR) }}. ({{format(MvRRate, 2, 2)}} MvR/min)
    </template>
    </button>
  </div>
</template>
