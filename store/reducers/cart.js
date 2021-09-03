import CartItems from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
	items: {},
	totalAmount: 0,
};

export default (state = initialState, action) => {
	if (action.type === ADD_TO_CART) {
		const addedProduct = action.product;
		const prodPrice = addedProduct.price;
		const prodTitle = addedProduct.title;
		let updatedCartItem;
		// returning states individually in seperate if else blocks are causing some error BUG and don't  know what was that
		if (state.items[addedProduct.id]) {
			// if it is true then product is already present in cart list
			updatedCartItem = new CartItems(
				state.items[addedProduct.id].quantity + 1,
				prodPrice,
				prodTitle,
				state.items[addedProduct.id].sum + prodPrice
			);
		} else {
			// if product is not already part of our cart

			updatedCartItem = new CartItems(1, prodPrice, prodTitle, prodPrice);
		}
		return {
			...state,
			items: { ...state.items, [addedProduct.id]: updatedCartItem },
			totalAmount: state.totalAmount + prodPrice,
		};
	}

	if (action.type === REMOVE_FROM_CART) {
		const productId = action.pid;
		const quantityOfProduct = state.items[productId].quantity;
		const priceOfProduct = state.items[productId].productPrice;
		let updatedCart;
		let updatedCartItem;
		if (quantityOfProduct === 1) {
			updatedCartItem = { ...state.items };
			delete updatedCartItem[productId];

			updatedCart = {
				...state,
				items: updatedCartItem,
				totalAmount: state.totalAmount - priceOfProduct,
			};
		} else {
			updatedCartItem = new CartItems(
				quantityOfProduct - 1,
				priceOfProduct,
				state.items[productId].productTitle,
				state.items[productId].sum - priceOfProduct
			);
			updatedCart = {
				...state,
				items: { ...state.items, [productId]: updatedCartItem },
				totalAmount: state.totalAmount - priceOfProduct,
			};
		}

		return updatedCart;
	}

	if (action.type === ADD_ORDER) {
		return {
			items: {},
			totalAmount: 0,
		};
	}

	if (action.type === DELETE_PRODUCT) {
		if (!state.items[action.pid]) {
			return state;
		}
		const updatedCart = [...state.items];
		const totAmount = state.totalAmount - updatedCart[action.pid].sum;
		delete updatedCart[action.pid];
		return {
			...state,
			items: updatedCart,
			totalAmount: totAmount,
		};
	}

	return state;
};
