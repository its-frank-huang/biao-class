import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Home from './page/Home';
import Admin from './page/Admin';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routesConfig = [ { path: '/', component: Home }, { path: '/admin', component: Admin } ];

new Vue({
	render : (h) => h(App),
	router : new VueRouter({
		routes : routesConfig
	})
}).$mount('#app');
