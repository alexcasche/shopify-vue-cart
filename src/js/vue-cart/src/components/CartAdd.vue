<template>
    <button type="button" class="c-vueCartAdd" @click="addToCart">
        Add to Cart
    </button>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
	name: 'CartAdd',
	data() {
		return {
			defaultVariant: ''
		};
	},
	methods: {
		...mapActions(['addQty']),
		addToCart() {
			const quantity = document.getElementById('Quantity').value;
			const url = window.location.href;
			const id = url.includes('variant')
				? url.split('variant=')[1]
				: this.defaultVariant;
			this.addQty({ quantity, id });
		}
	},
	mounted() {
		const productHandle = window.location.pathname.split('products/')[1];
		axios
			.get(`/products/${productHandle}.js`)
			.then(response => {
				this.defaultVariant = response.data.variants[0].id;
			})
			.catch(error => {
				return error.message;
			});
	}
};
</script>

<style scoped>
.c-vueCartAdd {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 30px;
}
</style>