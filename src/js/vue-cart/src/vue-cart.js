import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import PortalVue from 'portal-vue';
import store from './store';

Vue.use(Vuex);
Vue.use(PortalVue);

Vue.filter('toUSD', amount => {
	if (amount) {
		let string = amount.toString();
		const dollars = string.slice(0, -2);
		const cents = string.slice(-2);
		return `$${dollars}.${cents}`;
	}
});

new Vue({
	el: '#vueCart',
	store,
	components: { App },
	template: '<App />'
});

// if (document.getElementById('vueCartTrigger')) {
// 	new Vue({
// 		el: '#vueCartTrigger',
// 		store: sharedStore,
// 		components: { CartTrigger },
// 		template: '<CartTrigger />'
// 	});
// }
