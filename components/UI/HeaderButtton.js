import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const CustomHeaderButton = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Ionicons}
			iconSize={23}
			color={Colors.primary}
		/>
	);
};

export default CustomHeaderButton;
