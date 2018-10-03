import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import {
	normalizeShopifyCart,
	normalizeShopifyProduct
} from './normalizeShopify';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		shoppingCart: {},
		isFetching: false,
		isOpen: false,
		shippingThreshold: 50000
	},
	getters: {
		isOpen: state => state.isOpen,
		shoppingCart: state => state.shoppingCart,
		shippingThreshold: state => state.shippingThreshold,
		cartTotal: state => {
			const items = state.shoppingCart.items;
			let total = 0;
			if (items) {
				Object.keys(items).forEach(key => {
					total += items[key].price * items[key].quantity;
				});
			}
			return total;
		}
	},
	mutations: {
		initCart(state, payload) {
			return (state.shoppingCart = payload);
		},
		updateCartItem(state, payload) {
			const { id, quantity } = payload;
			state.shoppingCart.items[id].quantity = quantity;
			if (quantity < 1) {
				delete state.shoppingCart.items[id];
			}
			return state;
		},
		addCartItem(state, payload) {
			state.shoppingCart.items = {
				...state.shoppingCart.items,
				...payload
			};
			return state;
		},
		toggleCart(state, payload) {
			state.isOpen = payload === 'open' ? true : false;
			return state;
		},
		toggleFetching(state) {
			state.isFetching = !state.isFetching;
			return state;
		}
	},
	actions: {
		initCart: ({ commit }) => {
			axios
				.get('/cart.js')
				.then(response => {
					commit('initCart', normalizeShopifyCart(response.data));
				})
				.catch(error => {
					return error.message;
				});
		},
		updateItem: ({ commit, state }, payload) => {
			if (state.isFetching) {
				return;
			} else {
				commit('toggleFetching');
				const { item, action } = payload;
				const { id, quantity } = item;
				const newQty =
					action === 'increase'
						? quantity + 1
						: action === 'decrease'
							? quantity - 1
							: 0;
				axios
					.post('/cart/change.js', {
						id: id.toString(),
						quantity: newQty.toString()
					})
					.then(() => {
						commit('updateCartItem', {
							id,
							quantity: newQty
						});
						commit('toggleFetching');
					})
					.catch(error => {
						commit('toggleFetching');
						return error.message;
					});
			}
		},
		addItem: ({ commit, state }, payload) => {
			if (state.isFetching) {
				return;
			} else {
				commit('toggleFetching');
				axios
					.post('/cart/add.js', payload)
					.then(response => {
						commit(
							'addCartItem',
							normalizeShopifyProduct(response.data)
						);
						commit('toggleFetching');
						commit('toggleCart', 'open');
					})
					.catch(error => {
						commit('toggleFetching');
						return error.message;
					});
			}
		}
	}
});
