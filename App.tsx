import React from 'react';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cart from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const rootReducer = combineReducers({
	products: productsReducer,
	cart: cart,
	orders: ordersReducer,
});

const store = createStore(rootReducer);

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaView style={{ flex: 1 }}>
				<SafeAreaProvider style={{ flex: 1 }}>
					<ShopNavigator />
				</SafeAreaProvider>
			</SafeAreaView>
		</Provider>
	);
}
