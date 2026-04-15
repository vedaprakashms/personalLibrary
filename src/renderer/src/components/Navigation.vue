<script lang="ts"></script>

<template>
  <nav>
    <ul>
      <li><h1>Personal Library</h1></li>
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
