import React from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const ButtonTouchable = (props) => {
	return (
		<View style={{ ...styles.btnContainer, ...props.style }}>
			<TouchableOpacity
				style={styles.actionContainer}
				onPress={props.onPress}
				// {...props}
			>
				<View style={styles.btn}>
					<Text style={{ ...styles.title, ...props.titleStyle }}>
						{props.children}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	actionContainer: {
		flex: 1,
		margin: 0,
		width: '100%',
	},
	btnContainer: {
		alignItems: 'center',
		backgroundColor: '#f51c11',
		// backgroundColor: '#fff',
		overflow: 'hidden',
		width: 100,
		// height: 30,
		minHeight: 40,
		borderRadius: 20,
		elevation: 3,
	},
	btn: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
		paddingVertical: 7,
		backgroundColor: '#f5422f',
		margin: 0,
	},
	title: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
	},
});

export default ButtonTouchable;
