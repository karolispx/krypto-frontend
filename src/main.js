import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './_store';

import DefaultLoader from '@/components/DefaultLoader.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)

app.component("default-loader", DefaultLoader); 

app.use(router)
app.use(store)


app.mount('#app')
