import { createContext, useContext } from "react";
import IPokemon from "~/ts/interfaces/loading/loading";

type PokemonState = {
  loading: IPokemon;
  setPokemon: (loading: IPokemon) => void;
};

const PokemonContext = createContext<PokemonState | null>(null);

const usePokemon = (): PokemonState => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { PokemonContext, usePokemon };
