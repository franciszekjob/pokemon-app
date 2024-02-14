import React, { useContext, useState, ReactNode, useEffect } from "react";
import { PokemonsContext } from "~/contexts/pokemons/PokemonsContext";
import IPokemon from "~/ts/interfaces/pokemon/pokemon";
import axios from "axios";
import { useLoading } from "../loading/LoadingProvider";
import { extractPokemontId } from "~/utils/utils";
// import { BACKEND_URL } from "@env";
interface PokemonsProviderProps {
  children: ReactNode;
}
const BACKEND_URL = "https://pokeapi.co/api/v2";
const PokemonsProvider: React.FC<PokemonsProviderProps> = ({ children }) => {
  const itemsPerFetch = 20;
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [fetchingPokemons, setFetchingPokemons] = useState<boolean>(false);

  // const fetchPokemonData = async (id: number) => {
  //   const response = await axios.get(`${BACKEND_URL}/pokemon/${id}`);
  //   return response.data;
  // };

  const fetchPokemons = async () => {
    setFetchingPokemons(true);
    const response = await axios.get(`${BACKEND_URL}/pokemon`, {
      params: {
        limit: itemsPerFetch,
        offset: offset,
      },
    });

    setPokemons((pokemons) => [
      ...pokemons,
      ...response.data.results.map((pokemon: IPokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
        id: extractPokemontId(pokemon.url),
      })),
    ]);
    setOffset((offset) => offset + itemsPerFetch);
    setFetchingPokemons(false);
    // // fetch data of each pokemon
    // const pokemonsData = await Promise.all(
    //   response.data.results.map(async (pokemon: any) => {
    //     const pokemonData = await fetchPokemonData(pokemon.name);
    //     return pokemonData;
    //   })
    // );
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPokemons();
    };

    fetchData();
  }, []);

  return (
    <PokemonsContext.Provider
      value={{ pokemons, fetchPokemons, fetchingPokemons }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};

const usePokemons = () => {
  const context = useContext(PokemonsContext);
  if (!context) {
    throw new Error("usePokemons must be used within a PokemonProvider");
  }
  return context;
};

export { PokemonsProvider, usePokemons };
