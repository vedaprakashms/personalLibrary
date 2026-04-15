<script setup lang="ts">
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="container-fluid">
    <Navigation class="no-print" />
    <RouterView />
  </div>
</template>
