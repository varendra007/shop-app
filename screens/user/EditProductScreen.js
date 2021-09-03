import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
// import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButtton';
import * as productActions from '../../store/actions/products';

const EditProductScreen = (props) => {
	const productId = props.navigation.getParam('pid');
	const editedProduct = useSelector((state) => {
		return state.products.userProducts.find((prod) => productId === prod.id);
	});
	const dispatch = useDispatch();
	const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
	const [imageUrl, setImageUrl] = useState(
		editedProduct ? editedProduct.imageUrl : ''
	);
	const [description, setDescription] = useState(
		editedProduct ? editedProduct.description : ''
	);
	const [price, setPrice] = useState(
		editedProduct ? editedProduct.price.toString() : ''
	);

	const submitHandler = useCallback(() => {
		console.log('Submitting');
		if (editedProduct) {
			// product already exist we only need to update product details
			dispatch(
				productActions.updateProduct(
					productId,
					title,
					description,
					imageUrl,
					price
				)
			);
		} else {
			// we need to create new product
			dispatch(
				productActions.createProduct(title, description, imageUrl, +price)
			);
		}
		props.navigation.goBack();
	}, [dispatch, productId, title, description, imageUrl, +price]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);
	return (
		<ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.textInput}
						value={title}
						onChangeText={(text) => setTitle(text)}
					></TextInput>
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Image Url</Text>
					<TextInput
						style={styles.textInput}
						value={imageUrl}
						onChangeText={(text) => setImageUrl(text)}
					></TextInput>
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Desciption</Text>
					<TextInput
						style={styles.textInput}
						value={description}
						onChangeText={(text) => setDescription(text)}
					></TextInput>
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Price</Text>
					<TextInput
						keyboardType="phone-pad"
						style={styles.textInput}
						value={price}
						onChangeText={(text) => setPrice(text)}
					></TextInput>
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// backgroundColor: ''
		backgroundColor: 'rgba(253,253,253,0.8)',
	},
	form: {
		// flex: 1,
		marginVertical: 20,
		marginHorizontal: 10,
	},
	formControl: {
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(253,253,253,0.8)',
		// marginVertical: 5,
		position: 'relative',
		paddingVertical: 10,
		height: 70,
		// backgroundColor: 'blue',
	},
	label: {
		fontWeight: 'bold',
		color: '#888',
		marginHorizontal: 10,
		paddingHorizontal: 5,
		position: 'absolute',
		marginVertical: 0,
		top: 4,
		zIndex: 1,
		backgroundColor: '#fff',
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		// height: 30,
		paddingTop: 10,
		paddingHorizontal: 10,
		paddingBottom: 5,
		// position: 'absolute',
	},
});

EditProductScreen.navigationOptions = (navData) => {
	const SubmitFn = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('pid')
			? 'Edit Product'
			: 'Create New Product',

		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item iconName="ios-checkmark" title="Save" onPress={SubmitFn} />
				{/* <Ionicons name="ios-checkmark" /> */}
			</HeaderButtons>
		),
	};
};

export default EditProductScreen;
