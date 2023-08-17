<script>
export default {
  name: "MendingMilestoneButton",
  props: {
    getMilestone: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isReached: false,
      isLocked: false,
    };
  },
  computed: {
    milestone() {
      return this.getMilestone();
    },
    config() {
      return this.milestone.config;
    },
    mends() {
      return this.config.mends;
    },
    reward() {
      const reward = this.config.reward;
      return typeof reward === "function" ? reward() : reward;
    },
    rewardClassObject() {
      return {
        "o-mending-milestone__reward": true,
        "o-mending-milestone__reward--locked": !this.isReached,
        "o-mending-milestone__reward--reached": this.isReached,
        "o-mending-milestone__reward--small-font": this.reward.length > 80
      };
    },
    activeCondition() {
      return this.config.activeCondition ? this.config.activeCondition() : null;
    },
  },
  methods: {
    update() {
      this.isReached = this.milestone.isReached;
    }
  }
};
</script>

<template>
  <div
    v-if="!config.invisible"
    class="l-mending-milestone"
  >
    <span class="o-mending-milestone__goal">
      {{ quantifyInt("Mend", mends) }}:
    </span>
    <button 
    v-tooltip="activeCondition"
    :class="rewardClassObject">
      <span>
        {{ reward }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.o-mending-milestone__reward {
  width: 50rem;
  height: 8rem;
  font-family: Typewriter, serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  border: 0.1rem solid var(--color-mending);
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
}
</style>
