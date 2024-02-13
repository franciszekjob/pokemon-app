import React, { useContext, useState, ReactNode, useEffect } from "react";
import { PokemonsContext } from "~/contexts/pokemons/PokemonsContext";
import IPokemon from "~/ts/interfaces/pokemon/pokemon";
import axios from "axios";
import { useLoading } from "../loading/LoadingProvider";
// import { BACKEND_URL } from "@env";
interface PokemonProviderProps {
  children: ReactNode;
}
const BACKEND_URL = "https://pokeapi.co/api/v2";
const PokemonsProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const { setLoading } = useLoading();
  const itemsPerFetch = 20;
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [fetchingPokemons, setFetchingPokemons] = useState<boolean>(false);

  const fetchPokemons = async () => {
    setFetchingPokemons(true);
    setLoading({ state: true });
    const response = await axios.get(`${BACKEND_URL}/pokemon`, {
      params: {
        limit: itemsPerFetch,
        offset: offset,
      },
    });

    setPokemons(response.data.results);
    setOffset((offset) => offset + itemsPerFetch);
    setFetchingPokemons(false);
    setLoading({ state: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPokemons();
    };

    fetchData();
  }, []);

  return (
    <PokemonsContext.Provider value={{ pokemons }}>
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
