import '@/assets/sass/app.scss'
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/js/index.esm'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

import App from './App.vue'
import router from './router'

import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore();

if (authStore.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
}

app.mount('#app')