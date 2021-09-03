import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonTouchable from '../../components/buttons/ButtonTouchable';
import Colors from '../../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButtton';
import * as productActions from '../../store/actions/products';

const RenderProduct = (props) => {
	const dispatch = useDispatch();
	const deleteHandler = () => {
		Alert.alert('Are You sure?', 'Do you really want to delete this item?', [
			{ text: 'No', style: 'cancel' },
			{
				text: 'Yes',
				style: 'destructive',
				onPress: () => {
					console.log('Delete Product');
					props.navigation.goBack();
					// improve settimeout function untilll item is not deleted completely by using async function and add spinner loading
					setTimeout(() => {
						dispatch(productActions.deleteProduct(props.productId));
					}, 1000);
				},
			},
		]);
	};
	return (
		<View style={styles.productContainer}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Image source={{ uri: props.imageUrl }} style={styles.image} />

				<View style={styles.detailsContainer}>
					<Text style={styles.title}>{props.title}</Text>
					<Text style={styles.price}>$ {props.price}</Text>
					<Text style={styles.description}>{props.description}</Text>
					<ButtonTouchable style={{ width: '100%' }} onPress={deleteHandler}>
						<Text>Delete Product</Text>
					</ButtonTouchable>
				</View>
			</ScrollView>
		</View>
	);
};

const UserProductDetailsScreen = (props) => {
	const productId = props.navigation.getParam('productId');
	const fetchedProduct = useSelector((state) =>
		state.products.userProducts.find((item) => item.id === productId)
	);
	useEffect(() => {
		props.navigation.setParams({ title: fetchedProduct.title });
	}, [fetchedProduct.title]);
	// console.log(fetchedProduct);
	return (
		<RenderProduct
			navigation={props.navigation}
			productId={fetchedProduct.id}
			imageUrl={fetchedProduct.imageUrl}
			title={fetchedProduct.title}
			price={fetchedProduct.price}
			description={fetchedProduct.description}
		/>
	);
};

UserProductDetailsScreen.navigationOptions = (navData) => {
	const headerTitle = navData.navigation.getParam('title');
	const productId = navData.navigation.getParam('productId');
	return {
		headerTitle: headerTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Cart"
					iconName="ios-create"
					onPress={() => {
						navData.navigation.navigate({
							routeName: 'EditProduct',
							params: {
								pid: productId,
							},
						});
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

export default UserProductDetailsScreen;
