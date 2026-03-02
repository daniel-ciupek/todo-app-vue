import api from './api';

const resource = 'summaries';

export const tasksSummary = () => api.get(resource);
