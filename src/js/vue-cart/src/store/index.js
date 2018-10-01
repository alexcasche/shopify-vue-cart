import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import normalizeShopify from './normalizeShopify'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shoppingCart: {},
        isFetching: false,
        isOpen: true,
        shippingThreshold: 50000
    },
    getters: {
        isOpen: state => state.isOpen,
        shoppingCart: state => state.shoppingCart,
        cartCount: state => state.shoppingCart.count,
        cartTotal: state => state.shoppingCart.total,
        shippingThreshold: state => state.shippingThreshold
    },
    mutations: {
        initCart(state, payload) {
            return state.shoppingCart = payload
        },
        updateQty(state, payload) {
            const { id, quantity, adjustCart } = payload
            state.shoppingCart.count += adjustCart.count,
                state.shoppingCart.total += adjustCart.total,
                state.shoppingCart.items[id].quantity = quantity
            if (quantity < 1) {
                delete state.shoppingCart.items[id]
            }
            return state
        },
        toggleCart(state) {
            state.isOpen = !state.isOpen
            return state
        },
        toggleFetching(state) {
            state.isFetching = !state.isFetching
            return state
        }
    },
    actions: {
        initCart: ({ commit }) => {
            axios.get('/cart.js')
                .then((response) => {
                    commit('initCart', normalizeShopify(response.data))
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        updateQty: ({ commit, state }, payload) => {
            if (state.isFetching) {
                return
            } else {
                commit('toggleFetching')
                const { item, action } = payload
                const { id, quantity, price } = item
                const newQty = action === 'increase'
                    ? quantity + 1
                    : action === 'decrease'
                        ? quantity - 1
                        : 0
                const adjustCart = {
                    count: newQty - quantity,
                    total: (newQty - quantity) * price
                }
                axios.post('/cart/change.js', {
                    "id": id.toString(),
                    "quantity": newQty.toString()
                })
                    .then(() => {
                        commit('updateQty', { id, quantity: newQty, adjustCart })
                        commit('toggleFetching')
                    })
            }
        }

    }
})