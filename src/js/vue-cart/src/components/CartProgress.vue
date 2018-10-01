<template>
    <div class="c-vueCartProgress">
        <p class="c-vueCartProgress__status" v-if="shippingPercentage < 100">
            You are <span class="c-vueCartProgress__money">{{ shippingDifference | toUSD }}</span> from FREE SHPPING
        </p>
        <p class="c-vueCartProgress__status" v-else>
            Congrats! You get FREE SHIPPING!
        </p>
        <div class="c-vueCartProgress__bar">
            <div class="c-vueCartProgress__fill" :style="{ width: `${shippingPercentage}%` }"></div>
            <div class="c-vueCartProgress__percentage"
                :style="{color: `${shippingPercentage >= 60 ? 'white' : '#444'}`}"
            >
                {{ shippingPercentage }}%
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'CartProgress',
	computed: {
		...mapGetters(['shippingThreshold', 'cartTotal']),
		shippingPercentage() {
			const cartTotal = this.cartTotal;
			const shippingThreshold = this.shippingThreshold;
			return cartTotal >= shippingThreshold
				? 100
				: Math.floor((cartTotal / shippingThreshold) * 100);
		},
		shippingDifference() {
			return this.shippingThreshold - this.cartTotal;
		}
	}
};
</script>

<style scoped>
.c-vueCartProgress {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 30px;
}
.c-vueCartProgress__status {
	margin-bottom: 20px;
	text-align: center;
	font-size: 18px;
	color: white;
}
.c-vueCartProgress__money {
	font-weight: bold;
}
.c-vueCartProgress__bar {
	position: relative;
	width: 100%;
	height: 20px;
	border-radius: 20px;
	background-color: #eee;
}
.c-vueCartProgress__fill {
	position: absolute;
	top: 0;
	left: 0;
	height: 20px;
	width: 50px;
	border-radius: 20px;
	background-color: #66c855;
	transition: width 0.3s ease-in-out;
}
.c-vueCartProgress__percentage {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: #444;
}
</style>