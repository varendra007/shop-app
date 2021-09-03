import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
const CartItems = (props) => {
	const dispatch = useDispatch();

	const trashBtnHandler = (pid) => {
		dispatch(cartActions.removeFromCart(pid));
	};

	return (
		<View style={styles.cartItemContainer}>
			<View style={styles.leftContainer}>
				<Text>{props.quantity} </Text>
				<Text>{props.productTitle}</Text>
			</View>
			<View style={styles.rightContainer}>
				<Text>{props.quantity} * </Text>
				<Text>{props.productPrice.toFixed(2)} = </Text>
				<Text>{props.sum.toFixed(2)}</Text>
			</View>
			{props.fromCartScreen && (
				<Ionicons
					style={styles.trash}
					name="ios-trash"
					size={23}
					color="red"
					onPress={() => {
						trashBtnHandler(props.productId);
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	cartItemContainer: {
		marginHorizontal: 10,
		marginTop: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 1,
	},
	leftContainer: {
		flexDirection: 'row',
		width: '50%',
		// alignItems: 'center',
	},
	rightContainer: {
		flexDirection: 'row',
		width: '50%',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	trash: {
		marginLeft: 6,
	},
});

export default CartItems;
