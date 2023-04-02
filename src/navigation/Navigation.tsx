import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';


//? Defines the parameters that the screens receive
export type RootStackParams = {
    HomeScreen: undefined;
    PokemonScreen: {
        simplePokemon: SimplePokemon,
        color: string
    };
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="HomeScreen" component={ HomeScreen } />
            <Stack.Screen name="PokemonScreen" component={ PokemonScreen } />
        </Stack.Navigator>
    );
}