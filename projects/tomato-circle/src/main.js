import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import Home from "./page/home.vue";
import About from "./page/about.vue";
import Thread from "./page/thread.vue";
import signup from "./page/signup.vue";
import login from "./page/login.vue";
import settings from "./page/settings.vue";
import settingsMe from "./page/settingsMe.vue";
import settingsSecurity from "./page/settingsSecurity.vue";
import adminBase from "./page/admin/base.vue";
import adminUser from "./page/admin/user.vue";
import adminThread from "./page/admin/thread.vue";
import adminCat from "./page/admin/cat.vue";
import global from "./css/global.css";
import session from './lib/session'

Vue.config.productionTip = false;

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/about",
            component: About
        },
        {
            path: "/thread/:id",
            component: Thread
        },
        {
            path: "/settings",
            component: settings,
            children: [
                {
                    path: "me",
                    component: settingsMe
                },
                {
                    path: "security",
                    component: settingsSecurity
                }
            ]
        },
        {
            path: "/admin",
            component: adminBase,
            children: [
                {
                    path: "user",
                    component: adminUser
                },
                {
                    path: "thread",
                    component: adminThread
                },
                {
                    path: "cat",
                    component: adminCat
                }
            ]
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/signup",
            component: signup
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched[0].path == "/admin") {
      if(session.isAdmin()){
        next();
      }else{
        location.href = '/';
      }
    } else next();
});

new Vue({
    render: h => h(App),
    router
}).$mount("#app");
