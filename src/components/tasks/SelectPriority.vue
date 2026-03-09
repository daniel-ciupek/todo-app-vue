<template>
  <Dropdown>
    <template v-slot:trigger="{ toggleClass, toggle }">
      <DropdownTrigger
        tag="button"
        type="button"
        class="btn btn-sm btn-light"
        :class="toggleClass"
        @click="toggle"
      />
    </template>
    <template v-slot:menu="{ toggle }">
      <DropdownItem
        @click.prevent="(toggle(), setPriority(priority.id))"
        v-for="priority in listPriorities"
        :key="priority.name"
        :class="{ active: priority.id === selectedItem }"
      >
        <span class="me-2" :class="priority.color">
          <IconFlag />
        </span>
        {{ priority.description }}
      </DropdownItem>
    </template>
  </Dropdown>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePriorityStore } from '../../stores/priority';
import Dropdown from '../dropdown/Dropdown.vue';
import DropdownTrigger from '../dropdown/DropdownTrigger.vue';
import DropdownItem from '../dropdown/DropdownItem.vue';
import IconFlag from '../icons/IconFlag.vue';

const priorityStore = usePriorityStore();
const { listPriorities } = storeToRefs(priorityStore);
const { fetchAllPriorities } = priorityStore;

const props = defineProps({
  selected: {
    type: [String, Number],
    default: null,
  },
});

const selectedItem = ref(props.selected);

const emit = defineEmits(['change']);

const setPriority = (id) => {
  selectedItem.value = id;
  emit('change', id);
};

onMounted(async () => {
  if (listPriorities.value.length <= 1) {
    await fetchAllPriorities();
  }
});
</script>

<style>
.dropdown-item:active,
.dropdown-item.active {
  color: #1e2125;
  text-decoration: none;
  background-color: #f8f9fa;
}
</style>
