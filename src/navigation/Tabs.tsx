import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Tab1 } from './Tab1';
import { Tab2Screen } from './Tab2';



//? Tab Navigator
const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white',
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5856D6',
                tabBarLabelStyle: {
                    marginBottom: ( Platform.OS === 'ios' ) ? 10 : 10,
                    fontSize: 12,
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderWidth: 0,
                    elevation: 0,
                    height: ( Platform.OS==='ios' ) ? 60 : 70,
                }
            }}
        >
            <Tab.Screen 
                name="NavigationScreen" 
                component={ Tab1 } 
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="list-outline"
                            size={ 25 }
                            color={ color }
                        />
                    )
                }}
            />
            <Tab.Screen 
                // name="SearchScreen" 
                // component={ SearchScreen } 
                name="TabSearchScreen" 
                component={ Tab2Screen } //? -> Stack Navigator 
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="search-outline"
                            size={ 25 }
                            color={ color }
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}