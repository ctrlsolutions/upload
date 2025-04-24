<template>
    <div 
      v-bind="$attrs" 
      :style="{ width: width, height: height }" 
      class="folder-container"
    >
      <div class="folder-tabs-container">
        <div 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          :class="['folder-tab', { 'active': tab.id === activeTabId }]"
          :style="{ 
            left: calculateTabOffset(index+0.02), 
            zIndex: tab.id === activeTabId ? tabs.length + 1 : tabs.length - index 
          }"
          @click="setActiveTab(tab.id)"
        >
          <div class="title-container">{{ tab.title }}</div>
        </div>
      </div>
  
      <div class="folder-content-area">
        <slot :activeTabId="activeTabId"></slot> 
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    width: { type: String, default: '86vw' },
    height: { type: String, default: '92vh' },
    tabs: { 
      type: Array as () => Array<{ id: string, title: string }>, 
      default: () => [] 
    },
    initialActiveTabId: { type: String, default: null }
  });
  
  const emit = defineEmits(['update:activeTabId']);
  
  const activeTabId = ref(props.initialActiveTabId ?? (props.tabs.length > 0 ? props.tabs[0].id : null));
  
  function setActiveTab(tabId: string) {
    activeTabId.value = tabId;
    emit('update:activeTabId', tabId);
  }
  
  function calculateTabOffset(index: number): string {
    const overlap = 50; 
    const tabWidth = 300; 
  
    return `${index * (tabWidth - overlap) - 5}px`; 
  }
  
  </script>
  
  <style lang="scss" scoped>
  
  .folder-container {
    background: transparent; 
    width: v-bind(width);   
    height: v-bind(height); 
    position: relative;
    padding-top: 50px; 
  }
  
  .folder-tabs-container {
    position: absolute; 
    top: 0;
    left: 0; 
    width: 100%;
    height: 50px; 
    z-index: 10; 
  }
  
  .folder-tab {
    position: absolute; 
    top: 0vh; 
    width: 300px; 
    height: 50px; 
    background: $red; 
    color: white; 
    border-radius: 10px 10px 0 0; 
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    padding: 0.5rem 1rem 0.5rem 1.5rem; 
    clip-path: path('M 0 0 L 250 0 C 275 4, 265 25, 350 100 L 0 50 z');
    
    &.active {
      background: white;
      color: $green; 
    }
  }
  
  .title-container {
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    height: 100%; 
    margin: 0;
    padding-left: 2rem; 
  }
  
  .folder-content-area {
    background: white; 
    width: 100%;
    height: 100%; 
    border-radius: 0px 10px 10px 10px; 
    padding: 2rem; 
    padding-top: 2.5rem; 
    position: relative; 
    z-index: 1; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
    overflow: auto; 
  }
  </style>
  