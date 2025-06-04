<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <h2>Are you sure?</h2>
      <p>This action cannot be undone.</p>
      <div class="button-group">
        <BaseFormButton variant="gray" width="8rem" @click="closeModal">Cancel</BaseFormButton>
        <BaseFormButton variant="green" width="8rem" @click="confirmDelete">Confirm</BaseFormButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseFormButton from '@/components/Global/BaseFormButton.vue';

export default {
  name: 'DeleteModal',
  components: {
    BaseFormButton,
  },
  props: {
    isOpen: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmDelete() {
      this.$emit('confirm-delete');
    },
  },
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 68, 33, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 30px 30px;
  border-radius: 20px;
  text-align: start;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 450px;
  height: 260px;
}
.button-group {
  margin-top: 80px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  color: $black;
}

h2 {
  font-family: Poppins, sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #014421;
}

p {
  font-family: Poppins, sans-serif;
  font-size: 17.5px;
  font-weight: 400;
  color: $black;
}
</style>
