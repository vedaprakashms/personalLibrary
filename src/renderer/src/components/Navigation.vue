<script lang="ts"></script>

<template>
  <nav class="pico-background-azure-700">
    <ul>
      <li><h1 class="pico-color-azure-100">Personal Library</h1></li>
    </ul>
    <ul>
      <li v-for="route in $router.options.routes" :key="route.name">
        <RouterLink :to="route.path">
          <button class="button">{{ route.name }}</button>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
