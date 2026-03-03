import api from './api';

const resource = 'summaries';

export const tasksSummary = (params = {}) => api.get(resource, { params });
