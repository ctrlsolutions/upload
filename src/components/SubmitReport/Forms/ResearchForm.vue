<template>
  <div class="form">
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="form.title" placeholder="Title" />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label>Number of Months in Original Timeframe</label>
      <input type="text" v-model="form.months" placeholder="Months" />
      <span v-if="errors.months" class="error">{{ errors.months }}</span>
    </div>

    <div class="form-group">
      <label>Start Date</label>
      <BaseDateInput v-model="form.startDate" width="100%" />
      <span v-if="errors.startDate" class="error">{{ errors.startDate }}</span>
    </div>

    <div class="form-group">
      <label>End Date</label>
      <BaseDateInput v-model="form.endDate" width="100%" />
      <span v-if="errors.endDate" class="error">{{ errors.endDate }}</span>
    </div>

    <div class="form-group">
      <label>Names of Researcher/s</label>
      <input type="text" v-model="form.researchers" placeholder="Names" />
      <span v-if="errors.researchers" class="error">{{ errors.researchers }}</span>
    </div>

    <div class="form-group">
      <label>Source of Majority Share of this Research Funding</label>
      <BaseSelectInput v-model="form.sourceOfMajorityShare" :options="sourceOfMajorityShare" style="width: 100%; height: 38px;"/>
    </div>
  </div>
</template>
  
<script setup>
  import { reactive, ref } from 'vue'
  import BaseDateInput from '@/components/Global/BaseDateInput.vue'
  import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'

  // options for select input (mocked)
  const sourceOfMajorityShare = ref([
    { value: 'up-entity', label: 'Local' },
    { value: 'rp-governemnt-entity-or-public-sector-entity', label: 'RP Government Entity or Public Sector Entity' },
    { value: 'rp-private-sector-entity', label: 'RP Private Sector Entity' },
    { value: 'foreign-or-nondomestic-entity', label: 'Foreign or Non-Domestic Entity' },
  ])

  const form = reactive({
    title: '',
    months: '',
    startDate: '',
    endDate: '',
    researchers: '',
    sourceOfMajorityShare: '',
  })

  const errors = reactive({
    title: '',
    months: '',
    startDate: '',
    endDate: '',
    researchers: '',
    sourceOfMajorityShare: '',
  })

  function validateForm() {
    let valid = true
    errors.title = form.title ? '' : 'Title is required.'
    errors.months = form.months && !isNaN(form.months) ? '' : 'Valid months are required.'
    errors.startDate = form.startDate ? '' : 'Start date is required.'
    errors.endDate = form.endDate ? '' : 'End date is required.'
    errors.researchers = form.researchers ? '' : 'Researcher name(s) required.'
    errors.sourceOfMajorityShare = form.sourceOfMajorityShare ? '' : 'Source of majority share is required.'

    if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
      errors.endDate = 'End date must be after start date.'
      valid = false
    }

    for (const key in errors) {
      if (errors[key]) valid = false
    }

    return valid
  }
  function getSourceLabel(value) {
    const option = sourceOfMajorityShare.value.find(opt => opt.value === value)
    return option ? option.label : value
  }
  function exposeForm() {
    if (validateForm()) {
      const nameList = form.researchers
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);
      return {
        report: {
          title: form.title
        },
        timeframe: `Q${Math.ceil(parseInt(form.months) / 3)} ${new Date(form.startDate).getFullYear()}`,
        start_date: form.startDate,
        end_date: form.endDate,
        name_of_researchers: nameList,
        source_of_funding: getSourceLabel(form.sourceOfMajorityShare)
      }
    } else {
      console.warn('Validation failed')
      return null
    }
  }


  defineExpose({
    exposeForm,
  })
</script>


<style scoped>
  .error {
    color: red;
    font-size: 0.8rem;
  }
</style>
  
