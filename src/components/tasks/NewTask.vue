<template>
  <div class="relative">
    <input
      type="text"
      class="form-control form-control-lg padding-right-lg"
      placeholder="+ Add new task. Press enter to save."
      @keydown.enter="addNewTask"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const newTask = reactive({
  name: '',
  is_completed: false,
});

const emit = defineEmits(['added']);

function addNewTask(event) {
  const val = event.target.value.trim();

  if (val) {
    emit('added', {
      name: val,
      is_completed: false,
    });

    event.target.value = '';
  }
}
</script>
