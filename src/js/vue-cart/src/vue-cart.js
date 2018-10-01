import Vue from 'vue'
import Vuex from 'vuex'
import CartDrawer from './components/CartDrawer.vue'
import store from './store'

Vue.use(Vuex)

Vue.filter('toUSD', (amount) => {
    if (amount) {
        let string = amount.toString();
        const dollars = string.slice(0, -2);
        const cents = string.slice(-2);
        return (`$${dollars}.${cents}`)
    }
});

new Vue({
    name: 'VueCart',
    store,
    el: '#vueCart',
    components: { CartDrawer },
    template: "<CartDrawer />"
})