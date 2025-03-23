<template>
<div class="test-page">
    <!-- <h1>Test Page</h1> -->
    <BaseFolder />
</div>
</template>

<script>
import BaseFolder from '@/components/Global/BaseFolder.vue';

export default {
name: 'TestPage',
components: {
    BaseFolder,
},
};
</script>

<style scoped>
.test-page {
text-align: center;
padding: 5rem;
}
</style>
