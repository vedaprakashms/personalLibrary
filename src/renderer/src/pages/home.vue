<script setup lang="ts">
const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div>
    <button @click="ipcHandle">Ping</button>
  </div>
</template>
