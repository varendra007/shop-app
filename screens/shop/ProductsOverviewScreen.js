import React from 'react';
import { useDispatch } from 'react-redux';
import {
	Text,
	View,
	FlatList,
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import ButtonTouchable from '../../components/buttons/ButtonTouchable';
import * as cartActions from '../../store/actions/cart';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButtton';

const ProductsOverviewScreen = (props) => {
	const dispatch = useDispatch();

	const onSelectingProduct = (itemData) => {
		// console.log(itemData.item.id);
		props.navigation.navigate({
			routeName: 'ProductDetails',
			params: {
				title: itemData.item.title,
				productId: itemData.item.id,
			},
		});
	};

	// const cartHeaderRightBtnHandler = () => {
	// 	props.
	// }

	// rendering of products function call from flatlist
	const renderGridItems = (itemData) => {
		return (
			<View style={styles.productContainer}>
				<TouchableWithoutFeedback
					onPress={onSelectingProduct.bind(this, itemData)}
				>
					<Image
						source={{ uri: itemData.item.imageUrl }}
						style={styles.productImage}
					/>
				</TouchableWithoutFeedback>
				<Text style={styles.title}>{itemData.item.title}</Text>
				<Text style={styles.price}>$ {itemData.item.price}</Text>
				<View style={styles.actions}>
					<ButtonTouchable
						style={styles.action}
						onPress={onSelectingProduct.bind(this, itemData)}
					>
						<Text>View</Text>
					</ButtonTouchable>
					<ButtonTouchable
						style={styles.action}
						onPress={() => {
							dispatch(cartActions.addToCart(itemData.item));
							// console.log();
						}}
					>
						<Text>Add To Cart</Text>
					</ButtonTouchable>
				</View>
			</View>
		);
	};

	const availableProducts = useSelector(
		(state) => state.products.availableProducts
	);

	return (
		<FlatList
			data={availableProducts}
			keyExtractor={(item, index) => item.id}
			renderItem={renderGridItems}
			showsVerticalScrollIndicator={false}
		/>
	);
}; // <HeaderButtons headerButtonComponent={CustomHeaderButton}>
// 	<Item
// 		title="Cart"
// 		iconName="ios-star"
// 		iconSize={23}
// 		onPress={() => {
// 			console.log('pressed');
// 		}}
// 	/>
// </HeaderButtons>;

ProductsOverviewScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'All Products',
		headerRight: () => (
			// <Ionicons
			// 	name="ios-cart"
			// 	color={Colors.primary}
			// 	size={23}
			// 	style={styles.headerRight}
			// 	onPress={() => {
			// 		navData.navigation.navigate('cartScreen');
			// 	}}
			// />
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Cart"
					iconName="ios-cart"
					onPress={() => {
						navData.navigation.navigate('cartScreen');
					}}
				/>
			</HeaderButtons>
		),
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="drawer"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		// headerLeft: () => (
		// 	<Ionicons
		// 		name="ios-star"
		// 		onPress={() => {
		// 			navData.navigation.toggleDrawer();
		// 		}}
		// 	/>
		// ),
	};
};

const styles = StyleSheet.create({
	productContainer: {
		// width: '95%',
		display: 'flex',
		flex: 1,
		// height: 500,
		backgroundColor: 'white',
		marginHorizontal: 10,
		marginVertical: 10,
		textAlign: 'center',
		borderRadius: 12,
		overflow: 'hidden',
		elevation: 2,
		paddingBottom: 40,
		alignItems: 'center',
	},
	productImage: {
		width: '100%',
		height: 300,
	},
	title: {
		fontSize: 20,
		fontWeight: '800',
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	price: {
		fontSize: 20,
		color: '#888',
		marginBottom: 30,
	},
	actions: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		alignItems: 'center',
	},
	action: {
		width: 150,
	},
	headerRight: {
		marginRight: 20,
	},
});

export default ProductsOverviewScreen;
