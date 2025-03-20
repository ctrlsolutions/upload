<template>
  <!-- USE CARD WITH HEADER: WHOLE CONTAINER -->
  <div>
    <!-- USE NORMAL CARD: USER INFO -->
    <div>
      <img src="" alt="" />
      <div class="user-info">
        <p class="name"></p>
        <p class="role"></p>
        <p class="college"></p>
      </div>
      <div class="button-container">
        <BaseFormButton></BaseFormButton>
        <BaseFormButton></BaseFormButton>
      </div>
    </div>
    <!-- USE FOLDER COMPONENT -->
    <div>
      <div class="first-row">
        <BaseTextInput></BaseTextInput>
        <BaseTextInput></BaseTextInput>
        <BaseTextInput></BaseTextInput>
      </div>
      <div class="second-row">
        <BaseTextInput></BaseTextInput>
        <BaseTextInput></BaseTextInput>
        <BaseTextInput></BaseTextInput>
      </div>
      <div class="button-placement">
        <BaseFormButton></BaseFormButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
</script>
<style lang="scss" scoped></style>
