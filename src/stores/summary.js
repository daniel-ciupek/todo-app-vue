import { ref } from 'vue';
import { defineStore } from 'pinia';
import { tasksSummary } from '../http/summary-api';

export const useSummaryStore = defineStore('summaryStore', () => {
  const summaries = ref({});

  const fetchSummaries = async (params = {}) => {
    const { data } = await tasksSummary(params);
    summaries.value = data;
  };

  return {
    summaries,
    fetchSummaries,
  };
});
