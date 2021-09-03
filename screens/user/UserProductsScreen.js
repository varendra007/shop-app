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

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButtton';

const UserProductScreen = (props) => {
	const dispatch = useDispatch();

	const onSelectingProduct = (itemData) => {
		// console.log(itemData.item.id);
		props.navigation.navigate({
			routeName: 'ViewAndDeleteProducts',
			params: {
				title: itemData.item.title,
				productId: itemData.item.id,
			},
		});
	};

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
							props.navigation.navigate({
								routeName: 'EditProduct',
								params: {
									pid: itemData.item.id,
								},
							});
						}}
					>
						<Text>Edit</Text>
					</ButtonTouchable>
				</View>
			</View>
		);
	};

	const availableProducts = useSelector((state) => state.products.userProducts);

	return (
		<FlatList
			data={availableProducts}
			keyExtractor={(item, index) => item.id}
			renderItem={renderGridItems}
			showsVerticalScrollIndicator={false}
		/>
	);
};

UserProductScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'User Products',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Cart"
					iconName="ios-create"
					onPress={() => {
						navData.navigation.navigate('EditProduct');
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

export default UserProductScreen;
