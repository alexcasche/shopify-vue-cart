<template>
    <div v-if="cartCount > 0" class="c-vueCartContent">
        <CartProgress />
        <div v-for="(item, index) in shoppingCart.items" 
            :key="index" 
            class="c-vueCart__row"
        >
            <CartItem :item="item"/>
        </div>
        <div class="c-vueCart__row">
            <p class="c-vueCart__subtotal">
                Subtotal
            </p>
            <span class="c-vueCart__subtotal c-vueCart__subtotal--money">
                {{ shoppingCart.total | toUSD }}
            </span>
        </div>
        <a class="c-vueCart__checkout" href="/checkout">Checkout</a>
    </div>
    <div v-else class="c-vueCartContent">
        <p class="c-vueCart__empty">
            Your cart is currently empty.
        </p>
    </div>
</template>

<script>
import CartProgress from './CartProgress.vue';
import CartItem from './CartItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'CartContent',
	components: {
		CartProgress,
		CartItem
	},
	computed: {
		...mapGetters(['shoppingCart', 'cartCount'])
	},
	methods: {
		...mapActions(['initCart'])
	},
	mounted() {
		this.initCart();
	}
};
</script>

<style scoped>
.c-vueCartContent {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	color: #444;
}
.c-vueCart__row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	width: 100%;
}
.c-vueCart__subtotal {
	margin: 0;
	color: white;
	font-size: 18px;
}
.c-vueCart__checkout {
	display: block;
	width: 100%;
	padding: 15px;
	background: black;
	color: white !important;
	text-transform: uppercase;
	text-align: center;
	font-weight: bold;
}
.c-vueCart__empty {
	text-align: left;
	margin: 0 0 20px;
	color: white;
	font-size: 16px;
}
</style>