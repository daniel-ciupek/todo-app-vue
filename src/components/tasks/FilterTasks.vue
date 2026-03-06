<template>
  <Dropdown>
    <template v-slot:trigger="{ toggle, toggleClass }">
      <DropdownTrigger
        class="btn btn-light"
        :class="toggleClass"
        @click="toggle"
        type="button"
        hide-caret
        >{{ selectedValue }}</DropdownTrigger
      >
    </template>

    <template v-slot:menu="{ toggle }">
      <DropdownItem
        v-for="(value, key) in menuItems"
        @click.prevent="(toggle(), filterTasks(key))"
        :key="key"
        :class="{ active: selectedKey === key }"
      >
        {{ value }}
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

const menuItems = {
  inbox: 'Inbox',
  today: 'Today',
  next3d: 'Next 3 days',
  nextweek: 'Next week',
  overdue: 'Overdue',
};
const selectedKey = ref('inbox');
const selectedValue = ref('Inbox');

const router = useRouter();

const filterTasks = (key) => {
  selectedKey.value = key;
  selectedValue.value = menuItems[key] ?? 'Inbox';
  router.push({
    name: 'tasks',
    query: { ...router.currentRoute.value.query, due_date: key },
  });
};
</script>
