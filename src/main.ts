import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


import './assets/styles.css';

createApp(App)
  .use(router)  // Usando o Vue Router
  .mount('#app');  // Monta a aplicação no elemento com id 'app'


