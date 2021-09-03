export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
	// console.log('cartItemsAction', cartItems);
	// console.log('toamaction', totalAmount);
	return {
		type: ADD_ORDER,
		orderData: { cartItems: cartItems, totalAmount: totalAmount },
	};
};
