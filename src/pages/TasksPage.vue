<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @added="handleAddedTask" />
          <!-- List of uncompleted tasks -->
          <Tasks :tasks="uncompletedTasks" />

          <!-- Show toogle button -->
          <div class="text-center mt-3" v-show="showToggleCompletedBtn">
            <button
              class="btn btn-sm btn-secondary"
              @click="($event) => (showCompletedTasks = !showCompletedTasks)"
            >
              <span v-if="!showCompletedTasks">Show completed</span>
              <span v-else>Hide completed</span>
            </button>
          </div>

          <!-- List of completed tasks -->
          <Tasks
            :tasks="completedTasks"
            :show="completedTasksIsVisible && showCompletedTasks"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { allTasks, createTask } from '../http/task-api';
import Tasks from '../components/tasks/Tasks.vue';
import NewTask from '../components/tasks/NewTask.vue';

const tasks = ref([]);

onMounted(async () => {
  const { data } = await allTasks();
  tasks.value = data.data;
});

const uncompletedTasks = computed(() => {
  return tasks.value.filter((task) => !task.is_completed);
});

const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.is_completed);
});

const showToggleCompletedBtn = computed(() => {
  return uncompletedTasks.value.length > 0 && completedTasks.value.length > 0;
});

const completedTasksIsVisible = computed(() => {
  return uncompletedTasks.value.length === 0 || completedTasks.value.length > 0;
});

const showCompletedTasks = ref(false);

const handleAddedTask = async (newTask) => {
  const { data: createdTask } = await createTask(newTask);
  tasks.value.unshift(createdTask.data);
};
</script>
