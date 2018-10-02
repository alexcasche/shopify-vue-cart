<template>
    <button type="button" class="c-vueCartAdd" @click="addToCart">
        Add to Cart
    </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'CartAdd',
	methods: {
		...mapActions(['addQty']),
		addToCart() {
			const payload = {
				quantity: document.getElementById('Quantity').value,
				id: window.location.href.split('variant=')[1]
			};
			this.addQty(payload);
		}
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