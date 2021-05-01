import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { ApiService } from './services/api.services';

Vue.config.productionTip = false;

ApiService.init('http://localhost:3350/api/graphql');

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
