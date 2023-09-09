<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "MendingModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedMendingPoints: new Decimal(),
      mends: new Decimal(),
      remainPlural: "Remain",
    };
  },
  computed: {
    message() {
      return `Mending the Multiverse will reset everying a Reality resets, but will reset all post-Reality content and records.  However, you will unlock powerful upgrades in exchange (Tip: you can also press N on your keyboard to Mend)`;
    },
    gainedResources() {
      return `You will gain ${formatNE(this.gainedMendingPoints, 2, 0)} Multiversal ` + this.remainPlural;
    }
  },
  methods: {
    update() {
      this.mends.copyFrom(Currency.mends.value);
      this.gainedMendingPoints.copyFrom(gainedMendingPoints());
      this.remainPlural = this.gainedMendingPoints.gt(1) ? "Remains" : "Remain";
    },
    handleYesClick() {
      mendingReset();
    },
  },
};
</script>

<template>
  <ResetModal
    header="You are about to Mend the Multiverse"
    :message="message"
    :gained-resources="gainedResources"
    :confirm-fn="handleYesClick"
  />
</template>