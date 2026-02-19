<template>
  <div class="card mt-2" v-if="tasks.length">
    <ul class="list-group list-group-flush">
      <Task v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script setup>
import Task from './Task.vue';
defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});
</script>
