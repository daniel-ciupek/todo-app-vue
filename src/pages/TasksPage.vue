<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Task order -->
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h3 class="text-body mb-0">Tasks</h3>
            <div class="d-flex">
              <FilterTasks class="me-2" />
              <SortTasks />
            </div>
          </div>

          <!-- Add new Task -->
          <NewTask />
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
          <Tasks :tasks="completedTasks" :show="showCompletedTasks" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/task.js';
import Tasks from '../components/tasks/Tasks.vue';
import NewTask from '../components/tasks/NewTask.vue';
import SortTasks from '../components/tasks/SortTasks.vue';
import FilterTasks from '../components/tasks/FilterTasks.vue';

const store = useTaskStore();
const { completedTasks, uncompletedTasks } = storeToRefs(store);
const { fetchAllTasks } = store;

const route = useRoute();

watch(
  () => route.query,
  async (query) => await fetchAllTasks(query),
  { immediate: true },
);

const showToggleCompletedBtn = computed(() => {
  return uncompletedTasks.value.length > 0 && completedTasks.value.length > 0;
});

const showCompletedTasks = ref(false);
</script>
