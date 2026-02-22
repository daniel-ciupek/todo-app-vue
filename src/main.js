import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import route from './router';

const app = createApp(App);
app.use(createPinia());
app.use(route);
app.mount('#app');
