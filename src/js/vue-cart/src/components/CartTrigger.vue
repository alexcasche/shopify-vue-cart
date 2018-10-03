<template>
    <button class="c-vueCartTrigger" @click="toggleCart('open')">
        Open Cart
    </button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'CartTrigger',
	methods: {
		...mapMutations(['toggleCart'])
	}
};
</script>

<style scoped>
.c-vueCartTrigger {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 30px;
}
</style>