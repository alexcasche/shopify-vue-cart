<template>
    <transition name="fade">
        <div class="c-vueCartItem" v-if="item.quantity > 0">
            <div class="c-vueCartItem__header">
                <p class="c-vueCartItem__title">
                    {{ item.title }}
                    <span v-if="item.variant" class="c-vueCartItem__variant">
                        {{ item.variant }}
                    </span>
                </p>
                <button class="c-vueCartItem__clear"
                    @click="updateItem({ item, action: 'clear' })"
                >
                    <svg aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 32 32"><path fill="#444" d="M25.313 8.55l-1.862-1.862-7.45 7.45-7.45-7.45L6.689 8.55l7.45 7.45-7.45 7.45 1.862 1.862 7.45-7.45 7.45 7.45 1.862-1.862-7.45-7.45z"/></svg>
                </button>
            </div>
            <div class="c-vueCartItem__content">
                <img class="c-vueCartItem__image" :src="item.image" />
                <div class="c-vueCartItem__controls">
                    <button class="c-vueCartItem__control c-vueCartItem__control--add"
                        @click="updateItem({ item, action: 'decrease' })" 
                    >
                        -
                    </button>
                    <span class="c-vueCartItem__quantity">
                        {{ item.quantity }}
                    </span>
                    <button @click="updateItem({ item, action: 'increase' })" class="c-vueCartItem__control c-vueCartItem__control--remove">
                        +
                    </button>
                </div>
                <p class="c-vueCartItem__price">{{ item.price | toUSD }}</p>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'CartItem',
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	methods: {
		...mapActions(['updateItem'])
	}
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
	& > div {
		color: red;
	}
}
.c-vueCartItem {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 15px;
	margin-bottom: 20px;
	border-radius: 3px;
	background-color: #eee;
}
.c-vueCartItem__header {
	display: flex;
	margin-bottom: 10px;
}
.c-vueCartItem__title {
	font-weight: 500;
	flex-grow: 1;
	max-width: calc(100% - 32px);
	padding-right: 5px;
}
.c-vueCartItem__variant {
	font-size: 14px;
	display: block;
}
.c-vueCartItem__clear {
	width: 32px;
	height: 32px;
	padding: 5px;
}
.c-vueCartItem__content {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.c-vueCartItem__image {
	height: 75px;
}
.c-vueCartItem__control {
	margin: 4px;
}
</style>