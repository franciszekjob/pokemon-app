import React, { useContext, useState, ReactNode } from "react";
import { PokemonContext } from "~/contexts/loading/PokemonContext";
import IPokemon from "~/ts/interfaces/loading/loading";

interface PokemonProviderProps {
  children: ReactNode;
}

const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [loading, setPokemon] = useState<IPokemon>({
    state: false,
  });

  return (
    <PokemonContext.Provider value={{ loading, setPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};

export { PokemonProvider, usePokemon };
