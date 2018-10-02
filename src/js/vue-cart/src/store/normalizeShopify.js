const normalizeShopifyCart = shopifyCart => {
	const cartInfo = {
		note: shopifyCart.note
	};
	let cartItemsObj = {};
	shopifyCart.items.forEach(itemObj => {
		cartItemsObj[itemObj.variant_id] = {
			id: itemObj.variant_id,
			title: itemObj.product_title,
			variant: itemObj.variant_title,
			image: itemObj.image,
			price: itemObj.price,
			quantity: itemObj.quantity
		};
	});
	return {
		...cartInfo,
		items: cartItemsObj
	};
};

const normalizeShopifyProduct = shopifyProduct => {
	return {
		[shopifyProduct.variant_id]: {
			id: shopifyProduct.variant_id,
			image: shopifyProduct.image,
			price: shopifyProduct.price,
			quantity: shopifyProduct.quantity,
			title: shopifyProduct.product_title,
			variant: shopifyProduct.variant_title
		}
	};
};

export { normalizeShopifyCart, normalizeShopifyProduct };
