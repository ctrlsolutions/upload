<template>
    <div class="container">
        <FolderComponent 
            :tabs="myTabs" 
            :initialActiveTabId="currentTab"
            @update:activeTabId="handleTabChange" 
        >
            <template v-slot="{ activeTabId }"> 
                <div v-if="activeTabId === 'generate'">
                    <div class="options-container">
                        <p class="scope-label">Select a scope:</p>
                        <BaseSelectInput
                            class="scope-select"
                            placeholder="Summary scope"
                            :options="[
                                { value: 'department', label: 'Department'},
                                { value: 'college', label: 'College' },
                                { value: 'university', label: 'University' },
                            ]"
                        />
                        <p class="timeframe-label">Select a timeframe:</p>
                        <BaseSelectInput
                            class="timeframe-select"
                            placeholder="Summary timeframe"
                            v-model="timeframe"
                            :options="[
                                { value: 'monthly', label: 'Monthly' },
                                { value: 'quarterly', label: 'Quarterly' },
                                { value: 'annual', label: 'Annual' },
                            ]"
                        />

                        <p class="generation-label">Save option:</p>
                        <BaseFormRadio
                            class="pdf-radio"
                            name="saveOption" value="pdf" id="pdf-option"
                            label="Save as .pdf"
                        />
                        <BaseFormButton variant="red" height="100%" width="100%" type="button">
                            Update Preview
                        </BaseFormButton>
                    </div>

                    <div class="line"></div>

                    <div class="preview-title">Generate Summary Document Preview</div>

                    <div class="preview-container">
                        <v-icon name="bi-file-earmark-text" class="preview-icon" scale="2" />
                    </div>

                    <BaseFormButton variant="red" width="100%" type="button">
                        Generate
                    </BaseFormButton>
                </div>
                <div v-if="activeTabId === 'addRole'">Add Role Content...</div>
                <div v-if="activeTabId === 'addCollege'">Add College Content...</div>
            </template>
        </FolderComponent>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import BaseSelectInput from "@/components/Global/BaseSelectInput.vue";
    import BaseFormRadio from "@/components/Global/BaseFormRadio.vue";
    import BaseFormButton from "@/components/Global/BaseFormButton.vue";
    import FolderComponent from "@/components/Global/FolderComponent.vue";

    const timeframe = ref('');

    const myTabs = ref([
        { id: 'generate', title: 'Generate Summary' },
    ]);

    const currentTab = ref('generate');

    function handleTabChange(newTabId: string) {
        console.log("Tab changed to:", newTabId);
        currentTab.value = newTabId;
    }
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: end;
    padding: 2vw;
}

.folder-tab {
    position: absolute;
    top: -4.5vh;
    left: -0.005%;
    width: 300px;
    height: 50px;
    background: white;
    border-radius: 15px 0 0 0;
    clip-path: path('M 0 0 L 250 0 C 275 4, 265 16, 350 100 L 0 50 z');

    padding: 0.5rem 1rem 0.5rem 2.5rem;
}

.title-container {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-left: -1rem;
}

.options-container {
    display: grid;
    grid-template-columns: auto 1fr auto 1fr;
    grid-template-rows: auto auto;
    gap: 1rem 1.5rem;
    align-items: center;
    margin-top: 1rem;
    color: $green; 
}

.scope-label {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    justify-self: start;
    font-weight: bold;
}

.scope-select {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 100%;
}

.timeframe-label {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    justify-self: start;
    font-weight: bold;
}

.timeframe-select {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
    width: 100%;
}

.generation-label {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    justify-self: start;
    font-weight: bold;
}

.pdf-radio {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    justify-self: start;
}

.line {
    width: 100%;
    height: 1px;
    background: #d0d0d0;
    margin: 1rem 0 1rem 0;
}

.preview-title {
    margin-bottom: 1rem;
    color: $red;
    font-weight: bold;
}

.preview-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e6e6e6;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 0.5rem;
}

.update-button {
    background: $red;
    border-radius: 7px;
    color: white;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 0.6rem 1.5rem;
    border: none;
    cursor: pointer;
}

.update-button:hover {
    background: $dark-red;
}

.generate-button {
    width: 100%;
    height: 3rem;
    background: $red;
    border-radius: 8px;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    margin-top: 1rem;
    padding: 0.5rem 0;
}

.generate-button:hover {
    background: $dark-red;
}

.preview-icon {
  color: gray;
}
</style>