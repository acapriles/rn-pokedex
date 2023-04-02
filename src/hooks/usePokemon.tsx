import { useEffect, useRef, useState } from "react"
import { FullPokemon } from "../interfaces/pokemonInterfaces";
import { pokemonApi } from "../api/pokemonApi";

export const usePokemon = ( id: string ) => {
    const [isLoading, setIsLoading] = useState( true );

    //? {} as FullPokemon -> returns undefined instead of an error when typing a property of the object. Exp: pokemon.name
    const [pokemon, setPokemon] = useState<FullPokemon>({} as FullPokemon);

    const isMounted = useRef( true );


    const loadPokemon = async () => {

        if (!isMounted) return;
        
        const resp = await pokemonApi.get<FullPokemon>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
        setPokemon( resp.data );
        setIsLoading( false );
    }


    useEffect(() => {
        loadPokemon();
        
        return () => {
            isMounted.current = false;
        }
    }, []);
    
    
    return {
        // Properties
        isLoading,
        pokemon,


        // Methods
    }
}
