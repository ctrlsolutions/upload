<template>
  <div class="transparent-page">
    <ReportHistory></ReportHistory>
  </div>
</template>

<script>
import ReportHistory from '@/components/ReportHistory/ReportHistory.vue'

export default {
  components: {
    ReportHistory
  }
}
</script>

<style lang="scss">
.transparent-page {
  z-index: 0;
  width: 90vw;
  height: 100vh;
  display: inline-block;
  align-items: center;
  justify-content: center;
}
</style>
