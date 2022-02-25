import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './_store';

import AppHeader from '@/components/AppHeader.vue';

import PageLoader from '@/components/loaders/PageLoader.vue';
import ModalLoader from '@/components/loaders/ModalLoader.vue';

import AppAlert from '@/components/alerts/AppAlert.vue';
import ModalAlert from '@/components/alerts/ModalAlert.vue';

const app = createApp(App)

app.component("page-loader", PageLoader); 
app.component("modal-loader", ModalLoader); 
app.component("app-header", AppHeader); 
app.component("app-alert", AppAlert); 
app.component("modal-alert", ModalAlert); 

app.use(router)
app.use(store)


app.mount('#app')
