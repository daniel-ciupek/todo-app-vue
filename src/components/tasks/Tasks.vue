<template>
  <div class="card mt-2" v-if="tasks.length && show">
    <ul class="list-group list-group-flush">
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @updated="handleUpdatedTask"
        @completed="handleCompletedTask"
        @removed="handleRemovedTask"
      />
    </ul>
  </div>
</template>

<script setup>
import { useTaskStore } from '../../stores/Task';
import Task from './Task.vue';

const store = useTaskStore();
const { handleCompletedTask, handleUpdatedTask, handleRemovedTask } = store;

defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
  show: {
    type: Boolean,
    default: true,
  },
});
</script>
