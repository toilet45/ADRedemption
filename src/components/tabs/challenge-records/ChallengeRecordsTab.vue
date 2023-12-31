<script>
import ChallengeRecordsList from "./ChallengeRecordsList";

export default {
  name: "ChallengeRecordsTab",
  components: {
    ChallengeRecordsList
  },
  data() {
    return {
      infinityChallengesUnlocked: false,
      normalChallenges: [],
      infinityChallenges: [],
      bypass: new Decimal(0),
    };
  },
  methods: {
    update() {
      this.infinityChallengesUnlocked = PlayerProgress.infinityChallengeCompleted() ||
        PlayerProgress.eternityUnlocked();
      this.normalChallenges = []
      for (let i = 0; i < 11; i++) {
        this.bypass.copyFrom(player.challenge.normal.bestTimes[i])
        this.normalChallenges.push(this.bypass)
      }
      this.infinityChallenges = []
      for (let i = 0; i < 8; i++) {
        this.bypass.copyFrom(player.challenge.infinity.bestTimes[i])
        this.infinityChallenges.push(this.bypass)
      }
    }
  }
};
</script>

<template>
  <div class="l-challenge-records-tab c-stats-tab">
    <ChallengeRecordsList
      :start="2"
      :times="normalChallenges"
      name="Normal Challenge"
    />
    <ChallengeRecordsList
      v-if="infinityChallengesUnlocked"
      :start="1"
      :times="infinityChallenges"
      name="Infinity Challenge"
      class="l-challenge-records-tab__infinity_challenges"
    />
  </div>
</template>
