<template>
    <div class="modal-overlay" @click.self="closeModal"> <div class="modal-container">  
        <div class="file-list-container">
          <p v-if="!localFiles.length" class="no-files">No files selected.</p>
          <ul v-else class="file-list">
            <li v-for="(file, index) in localFiles" :key="index" class="file-item">
              <v-icon name="bi-file-earmark-text" scale="1.2" class="file-icon" /> <span class="file-name">{{ file.name }}</span>
              <span class="file-size">{{ formatFileSize(file.size) }}</span>
              <button @click="removeFile(index)" class="remove-button" title="Remove file">
                <v-icon name="bi-trash" scale="1.0" />
              </button>
            </li>
          </ul>
        </div>
  
        <input
          type="file"
          ref="modalFileInput"
          multiple
          style="display: none"
          @change="handleModalFileChange"
          accept=".pdf, .png, .jpg, .jpeg, .docx, .xlsx, .txt" />
  
        <div class="button-group bottom">
           <button class="action-button add" @click="triggerModalFileInput">
             <v-icon name="bi-plus-circle" scale="1.0"/> Add Files
          </button>
          <button class="cancel-button" @click="closeModal">Cancel</button>
          <button class="save-button" @click="saveFiles">Confirm</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, defineProps, onMounted } from 'vue';
  
  // --- Props ---
  // Accept initial files from parent (optional)
  const props = defineProps({
    initialFiles: {
      type: Array,
      default: () => []
    }
  });
  
  // --- Emits ---
  // Define events this component can emit
  const emit = defineEmits(['close', 'files-selected']);
  
  // --- State ---
  const modalFileInput = ref(null); // Ref for the hidden file input
  const localFiles = ref([]); // Array to hold File objects selected within the modal
  
  // --- Lifecycle Hooks ---
  onMounted(() => {
    // Initialize localFiles with files passed from the parent, if any
    localFiles.value = [...props.initialFiles];
  });
  
  // --- Methods ---
  const triggerModalFileInput = () => {
    // Programmatically click the hidden file input
    modalFileInput.value?.click();
  };
  
  const handleModalFileChange = (event) => {
    // Add newly selected files to the localFiles array
    if (event.target.files) {
      // Prevent duplicates (optional, based on file name and size)
      const newFiles = Array.from(event.target.files);
      newFiles.forEach(newFile => {
          const alreadyExists = localFiles.value.some(existingFile =>
              existingFile.name === newFile.name && existingFile.size === newFile.size
          );
          if (!alreadyExists) {
              localFiles.value.push(newFile);
          } else {
              console.warn(`File "${newFile.name}" already selected.`);
              // Optionally provide user feedback here
          }
      });
      // Clear the input value to allow selecting the same file again if removed then re-added
      event.target.value = '';
    }
  };
  
  const removeFile = (index) => {
    // Remove a file from the list by its index
    localFiles.value.splice(index, 1);
  };
  
  const formatFileSize = (bytes) => {
    // Helper function to format file size
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const closeModal = () => {
    // Emit 'close' event to notify the parent
    emit('close');
  };
  
  const saveFiles = () => {
    // Emit the final list of selected files back to the parent
    emit('files-selected', [...localFiles.value]); // Send a copy
    closeModal(); // Close the modal after saving
  };
  
  // Rename functionality is omitted for simplicity as it's complex
  // to reliably rename File objects before upload. Focus is on add/remove.
  
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    inset: 0; /* Equivalent to top: 0; left: 0; width: 100%; height: 100%; */
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* Ensure modal is on top */
  }
  
  .modal-container {
    background: white;
    padding: 25px 30px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px; /* Limit max width */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }
  
  .modal-title {
    margin-top: 0;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
    font-size: 1.4rem;
  }
  
  .file-list-container {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    min-height: 150px; /* Ensure minimum height */
    max-height: 300px; /* Limit maximum height */
    overflow-y: auto; /* Enable scrolling for long lists */
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f9f9f9;
  }
  
  .no-files {
      text-align: center;
      color: #888;
      padding-top: 50px; /* Center vertically roughly */
  }
  
  .file-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .file-item {
    display: flex;
    align-items: center;
    padding: 8px 5px;
    border-bottom: 1px solid #eee;
    gap: 10px; /* Space between items */
  }
  .file-item:last-child {
    border-bottom: none;
  }
  
  .file-icon {
      color: #666;
      flex-shrink: 0; /* Prevent icon from shrinking */
  }
  
  .file-name {
    flex-grow: 1; /* Allow name to take available space */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* Add ... for long names */
    font-size: 0.9rem;
    color: #333;
  }
  
  .file-size {
    font-size: 0.8rem;
    color: #777;
    flex-shrink: 0;
    margin-left: 10px;
    min-width: 70px; /* Align sizes */
    text-align: right;
  }
  
  .remove-button {
    background: none;
    border: none;
    color: #dc3545; /* Red color for delete */
    cursor: pointer;
    padding: 2px 5px;
    margin-left: 5px;
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  .remove-button:hover {
    opacity: 1;
    color: #a71d2a;
  }
  
  /* Buttons */
  .button-group.bottom {
    display: flex;
    justify-content: flex-end; /* Align buttons to the right */
    gap: 15px; /* Space between buttons */
    margin-top: 15px; /* Space above buttons */
    padding-top: 15px;
    border-top: 1px solid #eee; /* Separator line */
  }
  
  .action-button, .cancel-button, .save-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }
  
  .action-button.add {
    background-color: #751113; /* Blue for add */
    color: white;
    margin-right: auto; /* Push other buttons to the right */
    display: inline-flex; /* Align icon and text */
    align-items: center;
    gap: 5px;
  }
  .action-button.add:hover {
    background-color: #973a3c;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .cancel-button {
    background: #888888; /* Gray for cancel */
    color: white;
  }
  .cancel-button:hover {
    background-color: #5a6268;
  }
  
  .save-button {
    background: #751113; /* Green for save/confirm */
    color: white;
  }
  .save-button:hover {
    background-color: #973a3c;
  }
  </style>
  