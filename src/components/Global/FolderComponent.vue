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
        :class="['rounded-tab left', { 'active': tab.id === activeTabId }]"
        :style="{ 
          left: tabOffsets[index] ? tabOffsets[index] + 'px' : '0px', 
          zIndex: tabs.length - index 
        }"
        @click="setActiveTab(tab.id)"
        ref="folderTabsRef" >
        <div class="title-container" :style="{ fontSize: tabFontSize }">{{ tab.title }}</div>
      </div>
    </div>

    <div class="folder-content-area">
      <slot :activeTabId="activeTabId"></slot> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
  width: { type: String, default: '86vw' },
  height: { type: String, default: '92vh' },
  tabs: { 
    type: Array as () => Array<{ id: string, title: string }>, 
    default: () => [] 
  },
  initialActiveTabId: { type: String, default: null },
  tabFontSize: { type: String, default: '1.1rem' }
});

const emit = defineEmits(['update:activeTabId']);

const activeTabId = ref(props.initialActiveTabId ?? (props.tabs.length > 0 ? props.tabs[0].id : null));
const folderTabsRef = ref<HTMLDivElement[]>([]); 
const tabOffsets = ref<number[]>([]);

function setActiveTab(tabId: string) {
  activeTabId.value = tabId;
  emit('update:activeTabId', tabId);
}

async function calculateAllTabOffsets() {
  await nextTick(); 

  const tabsElements = folderTabsRef.value;
  if (!tabsElements || tabsElements.length === 0) {
    tabOffsets.value = []; 
    return;
  }

  const newOffsets: number[] = [];
  let currentOffset = 0; 
  const overlap = 15; 
  tabsElements.forEach((tabElement, index) => {
    newOffsets[index] = currentOffset;
    currentOffset += tabElement.offsetWidth - overlap; 
  });

  tabOffsets.value = newOffsets; 
}

onMounted(() => {
  calculateAllTabOffsets(); 
});

watch(() => props.tabs, () => {
  calculateAllTabOffsets();
}, { deep: true }); 

watch(() => props.tabFontSize, () => {
  calculateAllTabOffsets();
});


</script>

<style lang="scss" scoped>
$content-bg: white; 
$radius: 10px; 

.folder-container {
  background: transparent; 
  width: v-bind(width);   
  height: v-bind(height); 
  position: relative; 
}

.folder-tabs-container {
  position: absolute; 
  top: 0;
  left: 0; 
  width: 100%;
  height: 50px; 
  z-index: 10; 
  overflow: hidden; 
}

.rounded-tab {
  --r: 0.8em;
  
  border-inline: var(--r) solid #0000;
  border-radius: calc(2*var(--r)) calc(2*var(--r)) 0 0/var(--r);
  
  mask: 
    radial-gradient(var(--r) at var(--r) 0,#0000 100%,#000 100%)
    calc(-1*var(--r)) 100%/100% var(--r) repeat-x,
    conic-gradient(#000 0 0) padding-box;
  
  background: #014421; 
  color: white;
  cursor: pointer;
  position: absolute;
  width: auto;
  height: 50px;
  padding: 1rem;
  white-space: nowrap;
  
  &.active {
    background: white;
    color: $green; 
  }
}

.rounded-tab.left {
  border-left-width: 0;
  border-top-left-radius: 0.8em;
  filter: drop-shadow(10px 0px 2px 5px rgba(0, 0, 0, 0.3)); 
}

.title-container {
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 100%; 
  margin: 0;
  width: auto;
  padding: 0 1.5rem;
}

.folder-content-area {
  background: $content-bg; 
  width: 100%;
  height: auto;
  border-radius: 0px $radius $radius $radius; 
  padding: 2rem; 
  padding-top: 2.5rem; 
  position: relative; 
  z-index: 1; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
  overflow: auto; 
}
</style>