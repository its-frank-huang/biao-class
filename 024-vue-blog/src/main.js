import Vue from 'vue';
import App from './App.vue';
import Home from './page/home.vue';
import post from './page/post.vue';
import Admin from './page/admin.vue';
import adminPost from './page/adminPost.vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path:'/post/:id',
    component:post
  },
  {
    path: '/admin',
    component: Admin,
    children:[
      {
        path:'post/',
        component:adminPost
      }
    ]
  }
];

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router : new VueRouter({
    routes
  })
}).$mount('#app')
