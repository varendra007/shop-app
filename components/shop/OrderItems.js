import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ButtonTouchable from '../buttons/ButtonTouchable';
import CartItems from './CartItems';
import { format } from 'date-fns';
import moment from 'moment';

const OrderItems = (props) => {
	const [isItemsVisible, setIsItemsVisible] = useState(false);
	const [actionBtnText, setActionBtnText] = useState('Show Details');

	useEffect(() => {
		if (isItemsVisible) {
			setActionBtnText('Hide Details');
		} else {
			setActionBtnText('Show Details');
		}
	}, [isItemsVisible]);

	const actionBtnHandler = () => {
		setIsItemsVisible(!isItemsVisible);
	};

	return (
		<View>
			<View style={styles.orderItem}>
				<View style={styles.summary}>
					<Text style={styles.totalAmount}>
						Amount: $ {props.totalAmount.toFixed(2)}
					</Text>
					<Text style={styles.date}>
						{moment(props.date).format('MMM Do YYYY, hh:mm')}
					</Text>
				</View>
				<ButtonTouchable style={styles.actionBtn} onPress={actionBtnHandler}>
					<Text>{actionBtnText}</Text>
				</ButtonTouchable>
			</View>
			{isItemsVisible && (
				<FlatList
					style={styles.flatList}
					data={props.orderedItems}
					keyExtractor={(item, index) => item.productId}
					renderItem={(itemData) => (
						<CartItems
							quantity={itemData.item.quantity}
							productTitle={itemData.item.productTitle}
							sum={itemData.item.sum}
							productPrice={itemData.item.productPrice}
							productId={itemData.item.productId}
						/>
					)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	orderItem: {
		// width: '100%',
		marginHorizontal: 10,
		marginVertical: 20,
		padding: 10,
		backgroundColor: '#fff',
		elevation: 2,
		alignItems: 'center',
		paddingBottom: 15,
		borderRadius: 12,
	},
	summary: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15,
		paddingHorizontal: 15,
	},
	actionBtn: {
		width: 150,
		textAlign: 'center',
		alignItems: 'center',
	},
	date: {
		color: '#888',
	},
	flatList: {
		marginHorizontal: 20,
	},
	totalAmount: {
		fontWeight: 'bold',
	},
});

export default OrderItems;
