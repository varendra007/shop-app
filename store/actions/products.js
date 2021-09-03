export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (productId) => {
	return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
	return {
		type: CREATE_PRODUCT,
		productData: {
			title: title,
			description: description,
			imageUrl: imageUrl,
			price: price,
		},
	};
};

export const updateProduct = (id, title, description, imageUrl, price) => {
	return {
		type: UPDATE_PRODUCT,
		pid: id,
		productData: {
			title: title,
			description: description,
			imageUrl: imageUrl,
			price: price,
		},
	};
};
