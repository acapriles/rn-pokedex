import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Navigation } from './src/navigation/Tab1';
import { Tabs } from './src/navigation/Tabs';


const App = () => {
	return (
		<NavigationContainer>
			{/* <Navigation /> */}
			<Tabs />
		</NavigationContainer>
	)
}

export default App;