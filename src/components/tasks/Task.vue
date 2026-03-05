<template>
  <li class="list-group-item py-3">
    <div class="d-flex justify-content-start align-items-center">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        :class="[completedClass, priorityClass]"
        :checked="task.is_completed"
        @change="markTaskAsCompleted"
      />
      <div
        class="ms-2 flex-grow-1"
        :class="completedClass"
        title="Double click the text to edit or remove"
        @dblclick="($event) => (isEdit = true)"
      >
        <div class="relative" v-if="isEdit">
          <input
            class="editable-task"
            type="text"
            v-focus
            @keyup.esc="undo"
            @keyup.enter="handleUpdate"
            v-model="editingTask"
            ref="inputRef"
          />
          <div class="select-priority">
            <SelectPriority
              :selected="selectedPriority"
              @change="setPriority"
            />
          </div>
        </div>
        <span v-else>{{ task.name }}</span>
      </div>
    </div>
    <TaskActions
      @edit="($event) => (isEdit = true)"
      v-show="!isEdit"
      @remove="removeTask"
    />
  </li>
</template>

<script setup>
import { computed, ref } from 'vue';
import TaskActions from './TaskActions.vue';
import SelectPriority from './SelectPriority.vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['updated', 'completed', 'removed']);

const inputRef = ref();
const selectedPriority = ref(props.task.priority?.id || null);

const setPriority = (id) => {
  selectedPriority.value = id;
  inputRef.value.focus();
};

const isEdit = ref(false);
const editingTask = ref(props.task.name);

const completedClass = computed(() => {
  return props.task.is_completed ? 'completed' : '';
});

const vFocus = {
  mounted(el) {
    el.focus();
  },
};

const handleUpdate = (event) => {
  const updatedTask = {
    ...props.task,
    name: event.target.value,
    priority_id: selectedPriority.value,
  };

  isEdit.value = false;
  emit('updated', updatedTask);
};

const undo = () => {
  isEdit.value = false;
  editingTask.value = props.task.name;
  selectedPriority.value = props.task.priority?.id || null;
};

const markTaskAsCompleted = (event) => {
  const updatedTask = {
    ...props.task,
    is_completed: !props.task.is_completed,
  };

  emit('completed', updatedTask);
};

const removeTask = () => {
  if (confirm('Are you sure you want to remove this task?')) {
    emit('removed', { ...props.task, is_removed: true });
  }
};

const priorityClass = computed(() => {
  const classesMap = {
    null: 'none',
    1: 'high',
    2: 'medium',
    3: 'low',
  };
  const activeClass = classesMap[selectedPriority.value] || 'none';
  return `priority-${activeClass}`;
});
</script>

<style scoped>
.form-check-input:checked {
  background-color: rgb(108, 117, 125);
  border-color: rgb(108, 117, 125);
}
.form-check-input:not(:checked) {
  outline: 0;
  border: 0;
}
.priority-high:not(:checked) {
  box-shadow: 0 0 0 0.1rem rgb(220, 53, 69) !important;
}
.priority-medium:not(:checked) {
  box-shadow: 0 0 0 0.1rem rgb(255, 193, 7) !important;
}
.priority-low:not(:checked) {
  box-shadow: 0 0 0 0.1rem rgb(13, 110, 253) !important;
}
.priority-none:not(:checked) {
  box-shadow: 0 0 0 0.1rem rgba(0, 0, 0, 0.25) !important;
}
</style>
