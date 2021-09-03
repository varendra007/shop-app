import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductScreen from '../screens/user/UserProductsScreen';
import UserProductDetailsScreen from '../screens/user/UserProductDetailsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultStackNavigationOptions = {
	headerShown: true,
	headerStyle: {
		backgroundColor: '#fff',
	},
	headerTintColor: Colors.primary,
	headerTitleAlign: 'center',
};

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetails: ProductDetailScreen,
		cartScreen: CartScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons name="ios-cart" size={23} color={drawerConfig.tintColor} />
			),
		},
		defaultNavigationOptions: defaultStackNavigationOptions,
	}
);

const OrderStack = createStackNavigator(
	{
		orderScreen: OrderScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons name="ios-list" size={23} color={drawerConfig.tintColor} />
			),
		},
		defaultNavigationOptions: defaultStackNavigationOptions,
	}
);

const AdminNavigator = createStackNavigator(
	{
		UserProducts: UserProductScreen,
		ViewAndDeleteProducts: UserProductDetailsScreen,
		EditProduct: EditProductScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons name="ios-create" size={23} color={drawerConfig.tintColor} />
			),
		},
		defaultNavigationOptions: defaultStackNavigationOptions,
	}
);

const BottomTabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: ProductsNavigator,
			navigationOptions: {
				tabBarIcon: (tabInfo) => {},
			},
		},
		UserScreen: AdminNavigator,
	},
	{
		tabBarOptions: {
			activeTintColor: '#000',
			inactiveTintColor: '#5f5f5f',
		},
	}
);

const ShopNavigator = createDrawerNavigator(
	{
		Products: ProductsNavigator,
		Orders: OrderStack,
		Admin: AdminNavigator,
	},
	{
		contentOptions: { activeTintColor: Colors.primary },
	}
);

export default createAppContainer(ShopNavigator);
