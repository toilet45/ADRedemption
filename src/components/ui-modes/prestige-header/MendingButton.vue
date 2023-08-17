<script>
import { DC } from '../../../core/constants';
import { PlayerProgress } from '../../../core/player-progress';
import MendingPointsHeader from '../../MendingPointsHeader.vue';

export default {
    name: "MendingButton",
    data() {
        return {
            gainedMvR: new Decimal(0),
            canMend: false,
            firstMend: true,
            END: DC.END
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
            this.canMend = player.isGameEnd;
            this.firstMend = !PlayerProgress.mendingUnlocked();
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
      There is another way...You need to Mend the Multiverse.
    </template>
    <template v-else-if="!canMend">
      Reach <span>{{ format(END, 2, 2) }}</span> Antimatter in Doomed Reality to Mend the Multiverse
    </template>
    <template v-else>
      Mend the Multiverse for
      <span>{{ format(gainedMvR, 2) }}</span>
      Multiversal {{ pluralize("Remain", gainedMvR) }}
    </template>
    </button>
  </div>
</template>