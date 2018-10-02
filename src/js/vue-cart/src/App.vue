<template>
    <div class="vueCart">
        <CartDrawer />
        <portal target-el="#vueCartTrigger">
            <CartTrigger />
        </portal>
		<portal target-el="#vueCartAdd">
			<CartAdd />
		</portal>
    </div>
</template>

<script>
import CartDrawer from './components/CartDrawer.vue';
import CartTrigger from './components/CartTrigger.vue';
import CartAdd from './components/CartAdd.vue';

export default {
	name: 'App',
	components: {
		CartDrawer,
		CartTrigger,
		CartAdd
	}
};
</script>