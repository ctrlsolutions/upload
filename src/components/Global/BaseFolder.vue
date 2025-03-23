<template>
    <div class="folder">
      <div class="folder-tab">Tab 1</div>
      <div class="folder-body">
        <slot>Coming Soon</slot>
      </div>
    </div>
  </template>
  
  <style scoped>
  .folder {
    width: 25rem; /* Adjust the folder width */
    height: 12rem; /* Adjust the folder height */
    background-color: white; /* Folder color */
    border-radius: 0 0 10px 10px; /* No rounding at the top, only bottom */
    position: relative;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-align: center;
  }
  
  .folder-tab {
    background-color: #2b5a2b; /* Adjust to your preferred color */
    padding: 10px 20px;
    font-weight: bold;
    display: inline-block;
    position: relative;
    width: 12rem;
    height: 2rem;
    margin-top: -2.0rem;
    margin-left: -13rem;
  
    /* Keep or adjust border-radius for tab if needed */
    border-radius: 12px 12px 0 0;
  
    /* Create the slanted right side */
    clip-path: polygon(0 0, 70% 0, 100% 100%, 0% 100%);
  }
  
  .folder-body {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  </style>
  