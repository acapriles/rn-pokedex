import { Image, Text, View, FlatList, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePokemonPaginated } from "../hooks/usePokemonPaginated";
import { styles } from "../theme/appTheme";
import { PokemonCard } from "../components/PokemonCard";



export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <View>
            <Image
                source={ require('../assets/pokebola.png') }
                style={ styles.pokebolaBG }
            />

            <View
                style={{ alignItems: 'center' }}
            >
                <FlatList 
                    data={ simplePokemonList }
                    keyExtractor={ ( pokemon ) => pokemon.id }
                    numColumns={ 2 }
                    renderItem={ ({ item }) => <PokemonCard pokemon={ item } /> }
                    showsVerticalScrollIndicator={ false }

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.globalMargin,
                            ...styles.title,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }}>Pokédex</Text>
                    )}

                    // Infinite Scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }

                    ListFooterComponent={( 
                        <ActivityIndicator
                            style={{ height: 100 }}
                            size={ 20 }
                            color='gray'
                        /> 
                    )}
                />
            </View>
        </View>
    )
}