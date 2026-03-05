<template>
  <Dropdown>
    <template v-slot:trigger="{ toggle, toggleClass }">
      <DropdownTrigger
        class="btn btn-light"
        :class="toggleClass"
        @click="toggle"
        type="button"
        hide-caret
      >
        <IconArrowDownUp />
      </DropdownTrigger>
    </template>

    <template v-slot:menu="{ toggle }">
      <DropdownItem
        v-for="item in menuItems"
        @click.prevent="(toggle(), sortTask(item))"
        :key="item"
        :class="{ active: selectedItem === item }"
      >
        Sort by {{ item }}
      </DropdownItem>
    </template>
  </Dropdown>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Dropdown from '../dropdown/Dropdown.vue';
import DropdownItem from '../dropdown/DropdownItem.vue';
import DropdownTrigger from '../dropdown/DropdownTrigger.vue';
import IconArrowDownUp from '../icons/IconArrowDownUp.vue';

const menuItems = ['time', 'name', 'priority'];
const selectedItem = ref(null);

const router = useRouter();

const sortTask = (field) => {
  selectedItem.value = field;
  router.push({ name: 'tasks', query: { sort_by: field } });
};
</script>
