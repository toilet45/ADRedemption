<script>
import { DC } from '../../../../core/constants';
import { GameEnd, MendingMilestone } from '../../../../core/globals';
import { PlayerProgress } from '../../../../core/player-progress';
import MendingPointsHeader from '../../../MendingPointsHeader.vue';

export default {
    name: "MendingButton",
    data() {
        return {
            gainedMvR: new Decimal(0),
            canMend: false,
            firstMend: true,
            END: DC.END,
            needDoom: true
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
            this.canMend = (player.isGameEnd && GameEnd.endState >= 14.5) || (MendingMilestone.six.isReached && player.antimatter.exponent >= 9e15);
            this.firstMend = !PlayerProgress.mendingUnlocked();
            this.needDoom = !MendingMilestone.six.isReached;
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
    <template v-else-if="needDoom">
      Reach <span>{{ formatNE(END, 2, 2) }}</span> antimatter in a Doomed Reality to Mend the Multiverse
    </template>
    <template v-else-if="!canMend">
      Reach <span>{{ formatNE(END, 2, 2) }}</span> antimatter to Mend the Multiverse
    </template>
    <template v-else>
      Mend the Multiverse for
      <span>{{ formatNE(gainedMvR, 2) }}</span>
      Multiversal {{ pluralize("Remain", gainedMvR) }}
    </template>
    </button>
  </div>
</template>
