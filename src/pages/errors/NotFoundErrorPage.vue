<template>
  <div class="container py-5">
    <h1>404</h1>
    <p>
      Page <code>{{ $route.params.notFound }}</code> not found
    </p>

    <router-link :to="{ name: 'tasks' }">Back to your tasks</router-link>
  </div>
</template>
