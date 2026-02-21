<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @added="handleAddedTask" />
          <!-- List of uncompleted tasks -->
          <Tasks
            :tasks="uncompletedTasks"
            @updated="handleUpdatedTask"
            @completed="handleCompletedTask"
            @removed="handleRemovedTask"
          />

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
            @updated="handleUpdatedTask"
            @completed="handleCompletedTask"
            @removed="handleRemovedTask"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/Task.js';
import {
  allTasks,
  createTask,
  updateTask,
  completeTask,
  removeTask,
} from '../http/task-api';
import Tasks from '../components/tasks/Tasks.vue';
import NewTask from '../components/tasks/NewTask.vue';

const store = useTaskStore();
const { completedTasks, uncompletedTasks } = storeToRefs(store);
const { fetchAllTasks } = store;

const tasks = ref([]);

onMounted(async () => {
  await fetchAllTasks();
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

  const taskWithStatus = {
    ...createdTask.data,
    is_completed: createdTask.data.is_completed ?? false,
  };

  tasks.value.unshift(taskWithStatus);
};

const handleUpdatedTask = async (task) => {
  const { data: updatedTask } = await updateTask(task.id, {
    name: task.name,
  });

  const currentTask = tasks.value.find((item) => item.id === task.id);
  if (currentTask) {
    currentTask.name = updatedTask.data.name;
  }
};
const handleCompletedTask = async (task) => {
  const { data: updatedTask } = await completeTask(task.id, {
    is_completed: task.is_completed,
  });

  const currentTask = tasks.value.find((item) => item.id === task.id);
  if (currentTask) {
    currentTask.is_completed = updatedTask.data.is_completed;
  }
};

const handleRemovedTask = async (task) => {
  try {
    await removeTask(task.id);

    tasks.value = tasks.value.filter((item) => item.id !== task.id);
  } catch (error) {
    console.error('Błąd podczas usuwania:', error);
  }
};
</script>
