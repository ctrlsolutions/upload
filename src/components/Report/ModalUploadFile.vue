<template>
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="upper-box">
          <div class="button-group">
            <button class="action-button rename" @click="renameFile">Rename</button>
            <button class="action-button add" @click="addFile">Add</button>
          </div>
    
          <div class="file-list">
            <label class="file-item">
              <input type="checkbox" v-model="selectedFile" />
              <span>{{ fileName }}</span>
              <span class="file-size">{{ fileSize }}</span>
            </label>
          </div>
        </div>
  
        <div class="button-group bottom">
          <button class="cancel-button" @click="closeModal">Cancel</button>
          <button class="save-button">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fileName: "File_name.docx",
        fileSize: "20.4 MB",
        selectedFile: false,
      };
    },
    methods: {
      renameFile() {
        const newName = prompt("Enter new file name:", this.fileName);
        if (newName) this.fileName = newName;
      },
      addFile() {
        alert("File upload functionality to be implemented");
      },
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .upper-box {
    display: flex;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .action-button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
  
  .rename {
    background-color: #680000;
  }
  
  .add {
    background-color: #680000;
  }
  
  /* File List */
  .file-list {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
    height: 100px;
    overflow-y: auto;
  }
  
  .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  /* Bottom Buttons */
  .button-group.bottom {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
  
  .cancel-button {
    background: gray;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-button {
    background: #680000;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  