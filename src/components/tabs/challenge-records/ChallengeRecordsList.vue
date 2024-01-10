<script>
export default {
  name: "ChallengeRecordsList",
  props: {
    name: {
      type: String,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    times: {
      type: Array,
      required: true
    }
  },
  computed: {
    timeSum() {
      let v = new Decimal(0)
      for (let i = 0; i < this.times.length; i++) {
        v = v.add(this.times[i])
      }
      return v;
    },
    completedAllChallenges() {
      return this.timeSum.lt(Decimal.MAX_VALUE);
    }
  },
  methods: {
    timeDisplayShort,
    completionString(time) {
      return time.lt(Decimal.MAX_VALUE)
        ? (time.lt(new Decimal(0.001))? `record time: < ${formatInt(1)} µs`: `record time: ${timeDisplayShort(time)}`)
        : "has not yet been completed";
    }
  }
};
</script>

<template>
  <div>
    <br>
    <div
      v-for="(time, i) in times"
      :key="i"
    >
      <span>{{ name }} {{ start + i }} {{ completionString(time) }}</span>
    </div>
    <br>
    <div v-if="completedAllChallenges">
      Sum of {{ name }} record times: {{ timeDisplayShort(timeSum) }}
    </div>
    <div v-else>
      You have not completed all {{ name }}s yet.
    </div>
  </div>
</template>
