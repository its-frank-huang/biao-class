import Vue from 'vue';
import App from './App.vue';
import Home from './page/home.vue';
import Admin from './page/admin.vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/admin',
    component: Admin
  }
];

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router : new VueRouter({
    routes
  })
}).$mount('#app')
