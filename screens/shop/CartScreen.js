import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItems from '../../components/shop/CartItems';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButtton';

import * as ordersActions from '../../store/actions/orders';

//
const CartScreen = (props) => {
	const [isItemsVisible, setIsItemsVisible] = useState(false);
	const [detailsBtnText, setDetailsBtnText] = useState('Show Details');

	const dispatch = useDispatch();

	useEffect(() => {
		if (isItemsVisible) {
			setDetailsBtnText('Hide Details');
		} else {
			setDetailsBtnText('Show Details');
		}
	}, [isItemsVisible]);
	const totalAmount = useSelector((state) => state.cart.totalAmount);
	// console.log(cartItems);
	const cartItems = useSelector((state) => {
		const transformedCartItems = [];
		for (const key in state.cart.items) {
			transformedCartItems.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum,
			});
		}
		return transformedCartItems.sort((a, b) =>
			a.productId > b.productId ? 1 : -1
		);
	});

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'rgba(253,253,253,0.967)',
			}}
		>
			<View style={styles.header}>
				<View style={styles.summary}>
					<Text style={styles.totalAmount}>
						Total Amount:{' '}
						<Text style={styles.price}>
							$ {Math.round(totalAmount.toFixed(2) * 100) / 100}
						</Text>
					</Text>
					<Text
						style={{
							...styles.orderBtn,
							opacity: cartItems.length === 0 ? 0.3 : 1,
						}}
						onPress={() => {
							dispatch(ordersActions.addOrder(cartItems, totalAmount));
						}}
						disabled={cartItems.length === 0}

						// title="Order Now"
					>
						Order Now
					</Text>
				</View>
				{cartItems.length !== 0 && (
					<Button
						color={Colors.primary}
						title={detailsBtnText}
						onPress={() => {
							setIsItemsVisible(!isItemsVisible);
						}}
					/>
				)}
			</View>
			{isItemsVisible && (
				<View
					style={{ width: '100%', overflow: 'hidden', paddingVertical: 20 }}
				>
					<FlatList
						data={cartItems}
						keyExtractor={(item, index) => item.productId}
						renderItem={(itemData) => {
							return (
								<CartItems
									productId={itemData.item.productId}
									productTitle={itemData.item.productTitle}
									productPrice={itemData.item.productPrice}
									sum={itemData.item.sum}
									quantity={itemData.item.quantity}
									fromCartScreen={1}
								/>
							);
						}}
					/>
				</View>
			)}
		</View>
	);
};

CartScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Cart',
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
	summary: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
		width: '100%',
	},
	header: {
		marginHorizontal: 10,
		paddingHorizontal: 10,
		paddingVertical: 20,
		backgroundColor: '#fff',
		marginTop: 20,
		borderRadius: 12,
		elevation: 3,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	totalAmount: {
		fontSize: 17,
	},
	price: {
		color: Colors.primary,
		fontSize: 19,
	},
	orderBtn: {
		fontSize: 18,
		color: Colors.accent,
	},
});

export default CartScreen;
