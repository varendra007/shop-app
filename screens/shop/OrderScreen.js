import React from 'react';

import { StyleSheet, View, Text, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButtton';
import { useSelector } from 'react-redux';
import OrderItems from '../../components/shop/OrderItems';

const OrderScreen = (props) => {
	const allOrders = useSelector((state) => state.orders.orders);

	return (
		<View style={styles.screen}>
			<FlatList
				data={allOrders}
				keyExtractor={(item, index) => item.id}
				renderItem={(itemData) => (
					<OrderItems
						orderedItems={itemData.item.items}
						date={itemData.item.date}
						totalAmount={itemData.item.totalAmount}
					/>
				)}
			/>
		</View>
	);
};

OrderScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Orders',
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
	screen: {
		flex: 1,
		backgroundColor: 'rgba(253,253,253,0.8)',
	},
});

export default OrderScreen;
