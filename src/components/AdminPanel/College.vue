<script setup lang="ts">
    import CardComponent from '@/components/Global/CardComponent.vue';
    import Textbox from '@/components/AdminPanel/AdminTextBox.vue';

    // const recipients = ref<Recipient[]>([mockContacts[0], mockContacts[1]]);
    // const mockContacts = [
    //   { id: '1', name: 'Erl John Montano', email: 'erljohnmontano333@gmail.com', avatar: '' },
    //   { id: '2', name: 'Angel Grace Señoron', email: 'angelgrace@example.com', avatar: '' },
    //   { id: '3', name: 'Angelle Cyra Lumacad', email: 'angelle@example.com', avatar: '' },
    // ];
</script>

<template>
  <div class="college-container">
    <CardComponent title="College" height="100%" width="100%" :header="true">
      <slot></slot>
      ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    </CardComponent>
  </div>
</template>


<style lang="scss" scoped>  
.college-container {
height: 100%; 
width: 100%;
min-width: 100%;
}
</style>