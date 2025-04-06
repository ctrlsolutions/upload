<template>
    <div class="form">
        <div class="form-group">
            <label>Title</label>
            <input type="text" placeholder="Title">
        </div>

        <div class="form-group">
            <label>Number of Months in Original Timeframe</label>
            <input type="text" placeholder="Months">
        </div>

        <div class="form-group">
            <label>Start Date</label>
            <BaseDateInput width="100%"/>
        </div>

        <div class="form-group">
            <label>End Date</label>
            <BaseDateInput width="100%"/>
        </div>

        <div class="form-group">
            <label>Names of Researcher/s</label>
            <input type="text" placeholder="Names">
        </div>
    </div>
</template>

<script setup>
import BaseDateInput from '@/components/Global/BaseDateInput.vue';

// TODO: Validation
</script>
