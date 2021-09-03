import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import {
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	UPDATE_PRODUCT,
} from '../actions/products';

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
	if (action.type === DELETE_PRODUCT) {
		const productId = action.pid;
		return {
			...state,
			availableProducts: state.availableProducts.filter(
				(product) => productId !== product.id
			),
			userProducts: state.userProducts.filter(
				(product) => productId !== product.id
			),
		};
	}

	if (action.type === CREATE_PRODUCT) {
		const newProduct = new Product(
			new Date().toString(),
			'u1',
			action.productData.title,
			action.productData.imageUrl,
			action.productData.description,
			action.productData.price
		);

		return {
			...state,
			availableProducts: state.availableProducts.concat(newProduct),
			userProducts: state.userProducts.concat(newProduct),
		};
	}

	if (action.type === UPDATE_PRODUCT) {
		const productIndexUserProducts = state.userProducts.findIndex(
			(prod) => prod.id === action.pid
		);

		const updatedProduct = new Product(
			action.pid,
			state.userProducts[productIndexUserProducts].ownerId,
			action.productData.title,
			action.productData.imageUrl,
			action.productData.description,
			action.productData.price
		);

		let updatedUserProducts = [...state.userProducts];
		updatedUserProducts[productIndexUserProducts] = updatedProduct;

		const productIndexInAvailbleProdList = state.availableProducts.findIndex(
			(prod) => prod.id === action.pid
		);

		let updatedAvailableProducts = [...state.availableProducts];
		updatedAvailableProducts[productIndexInAvailbleProdList] = updatedProduct;
		return {
			...state,
			userProducts: updatedUserProducts,
			availableProducts: updatedAvailableProducts,
		};
	}

	return state;
};
