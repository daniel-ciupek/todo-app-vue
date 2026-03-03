<script setup>
import { computed } from 'vue';
import { startOfWeek, endOfWeek, subWeeks, format } from 'date-fns';
import Dropdown from '../../dropdown/Dropdown.vue';
import DropdownItem from '../../dropdown/DropdownItem.vue';
import DropdownTrigger from '../../dropdown/DropdownTrigger.vue';

const filterItems = computed(() => {
  const thisWeekStart = format(startOfWeek(new Date()), 'd MMM');
  const thisWeekEnd = format(endOfWeek(new Date()), 'd MMM');
  const lastWeekStart = format(startOfWeek(subWeeks(new Date(), 1)), 'd MMM');
  const lastWeekEnd = format(endOfWeek(subWeeks(new Date(), 1)), 'd MMM');

  return {
    today: 'Today',
    yesterday: 'Yesterday',
    thisweek: `This week (${thisWeekStart} - ${thisWeekEnd})`,
    lastweek: `Last week (${lastWeekStart} - ${lastWeekEnd})`,
    thismonth: 'This month',
    lastmonth: 'Last month',
  };
});
</script>

<template>
  <Dropdown>
    <template v-slot:trigger="{ toggleClass, toggle }">
      <DropdownTrigger
        class="btn btn-outline-secondary"
        :class="toggleClass"
        type="button"
        @click="toggle"
        >Filter</DropdownTrigger
      >
    </template>
    <template v-slot:menu="{ toggle }">
      <DropdownItem
        v-for="(value, key) in filterItems"
        :key="key"
        href="#"
        @click.prevent="toggle"
        >{{ value }}</DropdownItem
      >
    </template>
  </Dropdown>
</template>
