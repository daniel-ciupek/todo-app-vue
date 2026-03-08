<template>
  <DatePicker
    v-model="newTask.due_date"
    :popover="{ placement: 'bottom-end' }"
    :min-date="new Date()"
    @update:model-value="focusInput"
  >
    <template #default="{ togglePopover }">
      <div class="relative">
        <input
          type="text"
          class="form-control form-control-lg padding-right-lg"
          placeholder="+ Add new task. Press enter to save."
          @keydown.enter="addNewTask"
          ref="inputRef"
        />
        <div class="action-buttons">
          <SelectPriority @change="setPriority" />
          <button
            class="btn btn-sm btn-light"
            @click="togglePopover"
            type="button"
            title="Set due date"
          >
            <IconCalendar />
          </button>
        </div>
      </div>
    </template>
  </DatePicker>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useTaskStore } from '../../stores/task.js';
import { useFocusInput } from '../../composables/useFocusInput';
import { useDateFormatter } from '../../composables/useDateFormatter';
import SelectPriority from './SelectPriority.vue';
import IconCalendar from '../icons/IconCalendar.vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const taskStore = useTaskStore();
const { handleAddedTask } = taskStore;

const newTask = reactive({
  name: '',
  is_completed: false,
  priority_id: null,
  due_date: null,
});

const inputRef = ref();
const { focusInput } = useFocusInput(inputRef);
const { formatDateLocal } = useDateFormatter();

const setPriority = (id) => {
  newTask.priority_id = id;
  focusInput();
};

const addNewTask = async (event) => {
  if (event.target.value.trim()) {
    newTask.name = event.target.value;
    newTask.due_date = formatDateLocal(newTask.due_date);
    event.target.value = '';
    await handleAddedTask(newTask);
  }
};
</script>

<style>
.relative {
  position: relative;
}

.action-buttons {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  padding-left: 10px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
