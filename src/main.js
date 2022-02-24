import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './_store';

import DefaultLoader from '@/components/DefaultLoader.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppAlert from '@/components/AppAlert.vue';

const app = createApp(App)

app.component("default-loader", DefaultLoader); 
app.component("app-header", AppHeader); 
app.component("app-alert", AppAlert); 

app.use(router)
app.use(store)


app.mount('#app')
