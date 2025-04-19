<template>
  <div class="form">
    <div class="form-group">
      <label>Title</label>
      <input type="text" v-model="form.title" placeholder="Title" />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label>Number of timeframe in Original Timeframe</label>
      <input type="text" v-model="form.timeframe" placeholder="timeframe" />
      <span v-if="errors.timeframe" class="error">{{ errors.timeframe }}</span>
    </div>

    <div class="form-group">
      <label>Start Date</label>
      <BaseDateInput v-model="form.start_date" width="100%" />
      <span v-if="errors.start_date" class="error">{{ errors.start_date }}</span>
    </div>

    <div class="form-group">
      <label>End Date</label>
      <BaseDateInput v-model="form.end_date" width="100%" />
      <span v-if="errors.end_date" class="error">{{ errors.end_date }}</span>
    </div>

    <div class="form-group">
      <label>Names of Researcher/s</label>
      <input type="text" v-model="form.name_of_researchers" placeholder="Names" />
      <span v-if="errors.name_of_researchers" class="error">{{ errors.name_of_researchers }}</span>
    </div>

    <div class="form-group">
      <label>Source of Majority Share of this Research Funding</label>
      <BaseSelectInput v-model="form.source_of_funding" :options="source_of_funding" style="width: 100%; height: 38px;"/>
    </div>
  </div>
</template>
  
<script setup>
  import { reactive, ref } from 'vue'
  import BaseDateInput from '@/components/Global/BaseDateInput.vue'
  import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'

  // options for select input (mocked)
  const source_of_funding = ref([
    { value: 'up-entity', label: 'Local' },
    { value: 'rp-governemnt-entity-or-public-sector-entity', label: 'RP Government Entity or Public Sector Entity' },
    { value: 'rp-private-sector-entity', label: 'RP Private Sector Entity' },
    { value: 'foreign-or-nondomestic-entity', label: 'Foreign or Non-Domestic Entity' },
  ])

  const form = reactive({
    report: '',
    title: '',
    timeframe: '',
    start_date: '',
    end_date: '',
    name_of_researchers: '',
    source_of_funding: '',
  })

  const errors = reactive({
    title: '',
    timeframe: '',
    start_date: '',
    end_date: '',
    name_of_researchers: '',
    source_of_funding: '',
  })

  function validateForm() {
    let valid = true
    errors.title = form.title ? '' : 'Title is required.'
    errors.timeframe = form.timeframe && !isNaN(Number(form.timeframe)) ? '' : 'Valid timeframe are required.'
    errors.start_date = form.start_date ? '' : 'Start date is required.'
    errors.end_date = form.end_date ? '' : 'End date is required.'
    errors.name_of_researchers = form.name_of_researchers ? '' : 'Researcher name(s) required.'
    errors.source_of_funding = form.source_of_funding ? '' : 'Source of majority share is required.'

    if (form.start_date && form.end_date && new Date(form.end_date) < new Date(form.start_date)) {
      errors.end_date = 'End date must be after start date.'
      valid = false
    }

    for (const key in errors) {
      if (errors[key]) valid = false
    }

    return valid
  }
  function getSourceLabel(value) {
    const option = source_of_funding.value.find(opt => opt.value === value)
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
        timeframe: `Q${Math.ceil(parseInt(form.timeframe) / 3)} ${new Date(form.start_date).getFullYear()}`,
        start_date: form.start_date,
        end_date: form.end_date,
        name_of_researchers: form.name_of_researchers,
        source_of_funding: getSourceLabel(form.source_of_funding)
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


<style lang="scss" scoped>
  .error {
    color: red;
    font-size: 0.8rem;
  }
  .form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    margin-top: 2rem;

    border-radius: 10px;
    background: #FCFCFC;
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.25) inset;
    padding: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .form-group {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
  }

  .form-group label {
      font-weight: bold;
      margin-bottom: 5px;
      color: red;
  }

  .form-group input {
      padding: 8px;
      padding-left: 2.7rem;
      border: 0.15px solid $red;
      border-radius: 10px;
      outline: none;
      color: $red;
      margin-top: 10px;
  }

  .form-group input::placeholder {
      color: $red;
      font-weight: 600;
      opacity: 0.4;
  }

  .error {
      color: red;
      font-size: 0.8rem;
  }
</style>
  
