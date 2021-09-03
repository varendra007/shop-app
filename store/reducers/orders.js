import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
	orders: [],
};

export default (state = initialState, action) => {
	if (action.type === ADD_ORDER) {
		const newOrder = new Order(
			new Date().toString(),
			action.orderData.cartItems,
			action.orderData.totalAmount,
			new Date()
		);
		return {
			...state,
			orders: state.orders.concat(newOrder),
		};
	}

	return state;
};
