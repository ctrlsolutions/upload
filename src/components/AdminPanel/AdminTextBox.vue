<script setup lang="ts">
import { ref } from 'vue';

interface Recipient {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const props = defineProps<{
  placeholder?: string;
  contacts: Recipient[];
  recipients: Recipient[];
  width?: string;
  height?: string;
}>();

const emit = defineEmits(['update:recipients']);

const currentInput = ref('');
const isFocused = ref(false);

const addRecipient = (recipient: Recipient) => {
  emit('update:recipients', [...props.recipients, recipient]);
  currentInput.value = '';
};

const removeRecipient = (id: string) => {
  emit('update:recipients', props.recipients.filter(r => r.id !== id));
};

const handleInputKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && currentInput.value.trim()) {
    const existingContact = props.contacts.find(
      contact => contact.email.toLowerCase() === currentInput.value.toLowerCase() ||
                contact.name.toLowerCase() === currentInput.value.toLowerCase()
    );
    
    if (existingContact) {
      addRecipient(existingContact);
    } else if (validateEmail(currentInput.value)) {
      addRecipient({
        id: Date.now().toString(),
        name: currentInput.value.split('@')[0],
        email: currentInput.value
      });
    }
  }
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
</script>

<template>
  <div 
    class="email-composer" 
    :class="{ 'is-focused': isFocused }"
    :style="{
      width: props.width || '100%',
      height: props.height
    }"
  >
    <div class="composer-header">
      <div class="recipient-field">
        <label>To</label>
        <div class="recipients-container">
          <div v-for="recipient in recipients" :key="recipient.id" class="recipient-chip">
            <span v-if="recipient.avatar" class="recipient-avatar">
              <img :src="recipient.avatar" :alt="recipient.name">
            </span>
            <span v-else class="recipient-avatar">
              {{ recipient.name.charAt(0) }}
            </span>
            <span class="recipient-name">{{ recipient.name }}</span>
            <button class="remove-recipient" @click="removeRecipient(recipient.id)">
              ×
            </button>
          </div>
          <input 
            type="text" 
            v-model="currentInput"
            :placeholder="recipients.length === 0 ? props.placeholder || 'Add recipients...' : ''"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @keydown="handleInputKeydown"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.email-composer {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.email-composer.is-focused {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.15);
}

.composer-header {
  padding: 12px 16px;
}

.recipient-field {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.recipient-field label {
  width: 40px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  font-weight: 500;
}

.recipients-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: 32px;
}

.recipient-chip {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  padding: 4px 8px 4px 4px;
  font-size: 14px;
  transition: background 0.2s ease;
  max-width: 200px;
  overflow: hidden;
}

.recipient-chip:hover {
  background: rgba(0, 0, 0, 0.08);
}

.recipient-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3B82F6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 6px;
  overflow: hidden;
}

.recipient-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipient-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-recipient {
  margin-left: 6px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  transition: background 0.2s ease, color 0.2s ease;
  padding: 0;
  line-height: 1;
}

.remove-recipient:hover {
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}

input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  flex: 1;
  min-width: 120px;
  height: 32px;
  padding: 0 8px;
}

@media (max-width: 640px) {
  .recipient-field {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .recipient-field label {
    margin-bottom: 4px;
  }
  
  .recipients-container {
    width: 100%;
  }
}
</style>