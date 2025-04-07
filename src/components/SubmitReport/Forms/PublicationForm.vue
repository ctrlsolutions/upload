<template>
    <div class="form">
      <div class="form-group">
        <label>Title of Publication</label>
        <input type="text" v-model="form.title" />
      </div>

      <div class="form-group">
        <label>Type of Publication</label>
        <BaseSelectInput v-model="form.typeOfPublication" :options="typeOfPublication" />
        <input type="text" v-model="form.typeOfPublicationOther" v-if="form.typeOfPublication === 'Other'" />
      </div>

      <div class="form-group">
        <label>Name of Author/Co-Authors</label>
        <input type="text" v-model="form.nameOfAuthor" />
      </div>

      <div class="form-group">
        <label>Date Published or Accepted for Publication</label>
        <BaseDateInput v-model="form.datePublished" width="100%" />
      </div>

      <div class="form-group">
        <label>Name of Journal/Book/Conference Publication/Other Publication</label>
        <input type="text" v-model="form.nameOfPublication" />
      </div>

      <div class="form-group">
        <label>Type of Publisher</label>
        <BaseSelectInput v-model="form.typeOfPublisher" :options="typeOfPublisher" />
      </div>

      <div class="form-group">
        <label>Location of Publisher</label>
        <BaseSelectInput
          v-model="form.locationOfPublisher"
          :options="[
            { value: 'local', label: 'Local' },
            { value: 'international', label: 'International' }
          ]"
        />
      </div>

      <div class="form-group">
        <label>Volume Number</label>
        <input type="text" v-model="form.volumeNo" />
      </div>

      <div class="form-group">
        <label>Issue Number</label>
        <input type="text" v-model="form.issueNumber" />
      </div>

      <div class="form-group">
        <label>Editor Names</label>
        <input type="text" v-model="form.editorNames" />
      </div>

      <div class="form-group">
        <label>DOI or URL</label>
        <input type="text" v-model="form.doiOrUrl" />
      </div>

      <div class="form-group">
        <label>ISBN or ISSN</label>
        <input type="text" v-model="form.isbnOrIssn" />
      </div>

      <div class="form-group">
        <label>Indicate other reputable collection/database</label>
        <input type="text" v-model="form.otherReputableCollection" />
      </div>

      <div class="form-group">
        <label>Number of Citations</label>
        <input type="text" v-model="form.numberOfCitations" />
      </div>

      <div class="form-group">
        <label>Supporting Evidences</label>
        <h4>
          PDF Image File 1: Proof of Publication or Accepted for Publication such as cover, title and bibliographic
          information pages, publisher's acceptance letter or preprint, etc.
        </h4>
        <h4>
          PDF Image File 2: Proof of Utilization, if applicable, such as citation evidence, number of sales, UP
          International Publication Award, or was published in indexed/catalogued/recognized publications or by reputable
          publishers, etc., must be properly endorsed by the Dean/Head of Unit. If you have indicated a positive number of
          citations, please provide citation evidence for this publication.
        </h4>
        <!-- Optional: Add file input if needed -->
        <!-- <input type="file" multiple accept="application/pdf" /> -->
      </div>
  </div>
</template>


<script setup>
import { reactive, ref } from 'vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'

const form = reactive({
    title: '',
    typeOfPublication: '',
    typeOfPublicationOther: '',
    nameOfAuthor: '',
    datePublished: null,
    nameOfPublication: '',
    typeOfPublisher: '',
    locationOfPublisher: '',
    volumeNo: '',
    doiOrUrl: '',
    otherReputableCollection: '',
    numberOfCitations: '',
    editorNames: '',
    issueNumber: '',
    isbnOrIssn: '',
})

const typeOfPublication = ref([
    { value: 'Peer-Reviewed Journal', label: 'Peer-Reviewed Journal' },
    { value: 'Book/Monograph', label: 'Book/Monograph' },
    { value: 'Edited/Peer-Reviewed Book Chapter', label: 'Edited/Peer-Reviewed Book Chapter' },
    { value: 'Peer-Reviewed Conference Paper Publication', label: 'Peer-Reviewed Conference Paper Publication' },
    { value: 'Other', label: 'Other' }
])

const typeOfPublisher = ref([
    { value: 'Commercial', label: 'Commercial' },
    { value: 'learned-society-and-association', label: 'Learned Society and Association' },
    { value: 'university-press', label: 'University Press' },
])

function isFormValid() {
    if (!form.title ||
        !form.typeOfPublication ||
        (form.typeOfPublication === 'Other' && !form.typeOfPublicationOther) ||
        !form.nameOfAuthor ||
        !form.datePublished ||
        !form.nameOfPublication ||
        !form.typeOfPublisher ||
        !form.locationOfPublisher) {
        return false
    }
    return true
}

function exposeForm() {
    if (!isFormValid()) {
        return null
    }

    const payload = {
        report: {
            title: form.title
        },
        publication_title: form.nameOfPublication,
        publication_type: form.typeOfPublication === 'Other' ? form.typeOfPublicationOther : form.typeOfPublication,
        author_names: form.nameOfAuthor,
        publication_date: form.datePublished,
        publisher_name: form.nameOfPublication, // assuming `nameOfPublication` is also the publisher name
        publisher_type: form.typeOfPublisher,
        publisher_location: form.locationOfPublisher,
        editor_names: form.editorNames || '',
        volume_number: form.volumeNo || '',
        issue_number: form.issueNumber || '',
        doi_or_url: form.doiOrUrl || '',
        isbn_or_issn: form.isbnOrIssn || '',
        number_of_citations: form.numberOfCitations || 0,
    }

    return payload
}

defineExpose({
    exposeForm
})
</script>

