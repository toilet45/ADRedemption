<script>
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "SpeedUpReportModal",
  components: {
    ModalWrapper
  },
  data() {
    return {
      effectiveDurationText: "",
      durationText: "",
    }
  },
  created() {
    this.effectiveDurationText = TimeSpan.fromMilliseconds(player.speedUpDuration).toString();
    this.durationText = TimeSpan.fromMilliseconds(Date.now() - player.speedUpStart).toString();
    player.speedUpDuration = 0;
  },
}
</script>

<template>
  <ModalWrapper>
    <template #header>
      Testing Speed Up Report
    </template>
    <div>
      The speed up lasted {{ durationText }}.
      <br>
      It was equivalent to spending {{ effectiveDurationText }} in game.
    </div>
  </ModalWrapper>
</template>