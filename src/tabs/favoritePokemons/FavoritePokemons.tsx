import { useEffect } from "react";
import { View } from "react-native";
import PokemonsList from "~/components/pokemonsList/PokemonsList";
import { useFavoritePokemons } from "~/contexts/favoritePokemons/FavoritePokemonsContext";

const FavoritePokemons = ({}) => {
  const {
    favoritePokemons,
    retrieveFavoritePokemons,
    addFavoritePokemon,
    deleteFavoritePokemon,
    retrievingFavoritePokemons,
  } = useFavoritePokemons();

  useEffect(() => {
    retrieveFavoritePokemons();
  }, []);

  return (
    <View>
      <PokemonsList
        pokemons={favoritePokemons}
        loading={retrievingFavoritePokemons}
      />
    </View>
  );
};

export default FavoritePokemons;
