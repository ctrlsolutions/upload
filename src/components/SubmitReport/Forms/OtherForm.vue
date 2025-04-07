<template>
    <div class="form">
      <div class="form-group">
        <label>Title</label>
        <input v-model="title" type="text" placeholder="Title" />
      </div>
  
      <div class="form-group">
        <label>Description</label>
        <input v-model="description" type="text" placeholder="Description" />
      </div>
  
      <div class="form-group">
        <label>Supporting Evidences</label>
        <h4>
          PDF Image File 1: Proof of Publication or Accepted for Publication such as cover,
          title and bibliographic information pages, publisher's acceptance letter or preprint, etc.
        </h4>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    
    const title = ref('')
    const description = ref('')
    
    // Simple validation: check if required fields are filled
    function exposeForm() {
        const isValid = title.value.trim() !== '' && description.value.trim() !== ''
    
        if (!isValid) {
        alert("Form is not ready.")
        return null
        }
    
        return {
            report: {
                title: title.value,
            },
            description: description.value,
        }
    }
    
    defineExpose({
        exposeForm,
    })
  </script>
  
  
