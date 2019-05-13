import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Home from './page/home.vue'
import About from './page/about.vue'
import signup from './page/signup.vue'
import login from './page/login.vue'
import settings from './page/settings.vue'
import settingsMe from './page/settingsMe.vue'
import settingsSecurity from './page/settingsSecurity.vue'
import global from "./css/global.css";

Vue.config.productionTip = false

Vue.use(Router);

const routes =[
  {
    path:'/',
    component: Home
  },
  {
    path:'/about',
    component: About
  },
  {
    path:'/settings',
    component: settings,
    children:[
      {
        path:'/me',
        component: settingsMe
      },
      {
        path:'/security',
        component: settingsSecurity
      },
    ]
  },
  {
    path:'/login',
    component: login
  },
  {
    path:'/signup',
    component: signup
  },
];

new Vue({
  render: h => h(App),
  router: new Router({
    routes
  }),
}).$mount('#app')
