import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import ButtonTouchable from '../../components/buttons/ButtonTouchable';
import Colors from '../../constants/Colors';
// import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButtton';
import { useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import Product from '../../models/product';

const RenderProduct = (props) => {
	const dispatch = useDispatch();
	const prodDetails = new Product(
		props.id,
		props.ownerId,
		props.title,
		props.imageUrl,
		props.description,
		props.price
	);
	return (
		<View style={styles.productContainer}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Image source={{ uri: props.imageUrl }} style={styles.image} />

				<View style={styles.detailsContainer}>
					<Text style={styles.title}>{props.title}</Text>
					<Text style={styles.price}>$ {props.price}</Text>
					<Text style={styles.description}>{props.description}</Text>
					<ButtonTouchable
						style={{ width: '100%' }}
						onPress={() => {
							dispatch(cartActions.addToCart(prodDetails));
						}}
					>
						<Text>Add To Cart</Text>
					</ButtonTouchable>
				</View>
			</ScrollView>
		</View>
	);
};

const ProductDetailScreen = (props) => {
	const productId = props.navigation.getParam('productId');
	const fetchedProduct = useSelector((state) =>
		state.products.availableProducts.find((item) => item.id === productId)
	);

	// console.log(fetchedProduct);
	return (
		<RenderProduct
			id={fetchedProduct.id}
			ownerId={fetchedProduct.ownerId}
			imageUrl={fetchedProduct.imageUrl}
			title={fetchedProduct.title}
			price={fetchedProduct.price}
			description={fetchedProduct.description}
		/>
	);
};

ProductDetailScreen.navigationOptions = (navData) => {
	const headerTitle = navData.navigation.getParam('title');
	return {
		headerTitle: headerTitle,
		headerRight: () => (
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
	};
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 350,
	},
	productContainer: {
		backgroundColor: '#fff',
		flex: 1,
	},
	detailsContainer: {
		// width: '100%',
		marginHorizontal: 10,
	},
	title: {
		textAlign: 'center',
		fontWeight: '600',
		fontSize: 23,
		marginTop: 10,
		color: '#666464',
	},
	price: {
		marginTop: 10,
		textAlign: 'center',
		fontSize: 25,
		color: Colors.primary,
		fontWeight: 'bold',
	},
	description: {
		marginVertical: 20,
		fontWeight: '600',
		color: '#8c8b8b',
		fontSize: 15,
	},
	headerRight: {
		marginRight: 20,
	},
});

export default ProductDetailScreen;
