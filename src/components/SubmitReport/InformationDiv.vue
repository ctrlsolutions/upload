<template>
    <div class="info-container" v-if="infoVisible">
        <v-icon name="bi-book" scale="2" />
        <div class="info-text">
            <slot />
        </div>      
    </div>
</template>
<script setup>
    const props = defineProps({
        infoVisible: {
            type: Boolean,
            default: false
        }
    })
</script>
<style lang="scss" scoped>
    .info-container {
        margin-top: 1rem;
        border: 3px solid rgba(152, 155, 0, 0.58);
        background: rgba(255, 238, 0, 0.12);
        padding: 1rem;
        color: rgba(0, 0, 0, 0.648);

        display: flex;
        align-items: center;
    }
    .info-text {
        margin-left: 1rem;
    }
</style>    