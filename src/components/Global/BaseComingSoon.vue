<template>
    <div class="coming-soon">
        <div class="coming-soon-body">
        <slot>Coming Soon</slot>
        </div>
    </div>
    </template>

<script setup>
    defineProps({
    height: { type: String, default: "12rem" },
    });
</script>

<style scoped>
.coming-soon {
    width: 100%; /* Make it stretch to full width */
    height: 100%;
    background-color: white;
    border-radius:10px;
    position: relative;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-align: center;
}

.coming-soon-body {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}
</style>
