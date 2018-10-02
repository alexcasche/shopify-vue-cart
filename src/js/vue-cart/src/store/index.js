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
		updateQty(state, payload) {
			const { id, quantity, adjustCart } = payload;
			(state.shoppingCart.count += adjustCart.count),
				(state.shoppingCart.total += adjustCart.total),
				(state.shoppingCart.items[id].quantity = quantity);
			if (quantity < 1) {
				delete state.shoppingCart.items[id];
			}
			return state;
		},
		addQty(state, payload) {
			state.shoppingCart.items = {
				...state.shoppingCart.items,
				...payload
			};
			return state;
		},
		toggleCart(state) {
			state.isOpen = !state.isOpen;
			return state;
		},
		openCart(state) {
			state.isOpen = true;
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
		updateQty: ({ commit, state }, payload) => {
			if (state.isFetching) {
				return;
			} else {
				commit('toggleFetching');
				const { item, action } = payload;
				const { id, quantity, price } = item;
				const newQty =
					action === 'increase'
						? quantity + 1
						: action === 'decrease'
							? quantity - 1
							: 0;
				const adjustCart = {
					count: newQty - quantity,
					total: (newQty - quantity) * price
				};
				axios
					.post('/cart/change.js', {
						id: id.toString(),
						quantity: newQty.toString()
					})
					.then(() => {
						commit('updateQty', {
							id,
							quantity: newQty,
							adjustCart
						});
						commit('toggleFetching');
					})
					.catch(error => {
						commit('toggleFetching');
						return error.message;
					});
			}
		},
		addQty: ({ commit, state }, payload) => {
			if (state.isFetching) {
				return;
			} else {
				commit('toggleFetching');
				const { quantity, id } = payload;
				axios
					.post('/cart/add.js', {
						id,
						quantity
					})
					.then(response => {
						commit(
							'addQty',
							normalizeShopifyProduct(response.data)
						);
						commit('toggleFetching');
						commit('openCart');
					})
					.catch(error => {
						commit('toggleFetching');
						return error.message;
					});
			}
		}
	}
});
