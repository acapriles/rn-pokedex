import React, { useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import ImageColors from 'react-native-image-colors'

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { getRGB, isSimilar } from '../helpers/compareColors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

const windowWidth = Dimensions.get('window').width

interface Props {
    pokemon: SimplePokemon;
}

type ScreenNavProp = StackNavigationProp<RootStackParams, any>;

export const PokemonCard = ({ pokemon }: Props ) => {

    const [ bgColor, setBgColor ] = useState( 'grey' );
    const isMounted = useRef(true);
    const navigation = useNavigation<ScreenNavProp>();

    const getColors = async ( poke: SimplePokemon ) => {
        try {
            const result = await ImageColors.getColors( poke.picture, {
                fallback: 'grey',
                //cache: true,
                //key: 'unique_key',
            });

            if ( !isMounted.current ) return;

            switch ( result.platform ) {
                case 'android':
                    ( isSimilar( getRGB( '#FFFFFF' ), getRGB(result.dominant || 'grey')) )
                        ? setBgColor( result.darkMuted || 'grey')
                        : setBgColor( result.dominant || 'grey');
                    break
                case 'ios':
                    ( isSimilar( getRGB( '#FFFFFF' ), getRGB(result.background || 'grey')) )
                        ? setBgColor( result.primary || 'grey')
                        : setBgColor( result.background || 'grey');
                    break
                default:
                    setBgColor( 'grey' );
            }

        } catch (error) {
            console.log( error );
        }
    }
    
    useEffect(() => {
        getColors( pokemon );

        return () => {
            isMounted.current = false
        }
      
    }, []);
    

   /*  useEffect(() => {
        ImageColors.getColors( pokemon.picture , { fallback: 'grey' })
            .then( colors => {
                if ( !isMounted.current ) return;
                switch (colors.platform) {
                    case 'android':
                        setBgColor(colors.dominant || 'grey')
                        break;
                    case 'ios':
                        setBgColor(colors.background || 'grey')
                        break;
                    default:
                        setBgColor('grey');
                        break;
                }
            });

        return () => {
            isMounted.current = false
        }
    }, []); */


    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ 
                () => navigation.navigate('PokemonScreen', { 
                    simplePokemon: pokemon,
                    color: bgColor
                }) 
            }
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                {/* Nombre del pokemon y ID */}
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokebolaContainer }>
                    <Image 
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage 
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
});