<script>
import { DC } from '../../../core/constants';
import { CorruptionData, MendingMilestone, Ra } from '../../../core/globals';
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
            frags: 0
        };
    },
    computed: {
        buttonClassObject() {
            return {
                "o-mending-button": true,
                "o-mending-button--unavailable": !this.canMend
            };
        }
    },
    methods: {
        update() {
            this.gainedMvR.copyFrom(gainedMendingPoints());
            this.canMend = (player.isGameEnd) || (MendingMilestone.six.isReached && player.antimatter.exponent >= 9e15) || this.noMendBonus;
            this.firstMend = !PlayerProgress.mendingUnlocked();
            this.needDoom = !MendingMilestone.six.isReached;
            this.isCorrupted = player.mending.corruptionChallenge.corruptedMend;
            this.noMendBonus = Pelle.isDoomed && !player.isGameEnd && Ra.unlocks.exitDoom.isUnlocked;
            this.MvRRate = this.gainedMvR.div(Time.thisMendRealTime.totalMinutes);
            this.frags = CorruptionData.isCorrupted ? Math.ceil(Math.log2(CorruptionData.calcScore())) : 0
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
