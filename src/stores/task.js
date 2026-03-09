import { ref, computed } from 'vue';
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

  const fetchAllTasks = async (params = {}) => {
    const { data } = await allTasks(params);
    tasks.value = data.data;
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
      priority_id: task.priority_id,
      due_date: task.due_date,
    });

    const currentTask = tasks.value.find((item) => item.id === task.id);
    if (currentTask) {
      currentTask.name = updatedTask.data.name;
      currentTask.priority = updatedTask.data.priority;
      currentTask.due_date = updatedTask.data.due_date;
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
