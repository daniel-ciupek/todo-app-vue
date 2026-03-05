import api from './api';

const resource = 'priorities';

export const allPriorities = () => api.get(resource);
