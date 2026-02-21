import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import {
  allTasks,
  createTask,
  updateTask,
  completeTask,
  removeTask,
} from '../http/task-api';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([]);

  const uncompletedTasks = computed(() =>
    tasks.value.filter((task) => !task.is_completed),
  );

  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.is_completed),
  );

  const fetchAllTasks = async () => {
    const { data } = await allTasks();
    tasks.value = data.data.sort((a, b) => b.id - a.id);
  };

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

  return {
    tasks,
    uncompletedTasks,
    completedTasks,
    fetchAllTasks,
    handleAddedTask,
    handleUpdatedTask,
    handleCompletedTask,
    handleRemovedTask,
  };
});
