const normalizeShopify = (shopifyCart) => {
    const cartInfo = {
        count: shopifyCart.item_count,
        total: shopifyCart.total_price,
        note: shopifyCart.note
    }
    let cartItemsObj = {}
    shopifyCart.items.forEach(itemObj => {
        cartItemsObj[itemObj.variant_id] = {
            id: itemObj.variant_id,
            title: itemObj.product_title,
            variant: itemObj.variant_title,
            image: itemObj.image,
            price: itemObj.price,
            quantity: itemObj.quantity
        }
    })
    return {
        ...cartInfo,
        items: cartItemsObj
    }
}

export default normalizeShopify