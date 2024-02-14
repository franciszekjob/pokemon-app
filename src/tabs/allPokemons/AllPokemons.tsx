import { View } from "react-native";
import PokemonsList from "~/components/pokemonsList/PokemonsList";
import { useFavoritePokemons } from "~/contexts/favoritePokemons/FavoritePokemonsContext";
import { usePokemons } from "~/contexts/pokemons/PokemonsContext";

const AllPokemons = ({}) => {
  const { pokemons, fetchPokemons, fetchingPokemons } = usePokemons();
  const onScrollEnd = () => {
    if (!fetchingPokemons) {
      fetchPokemons();
    }
  };

  return (
    <View>
      <PokemonsList
        pokemons={pokemons}
        onScrollEnd={onScrollEnd}
        loading={true}
      />
    </View>
  );
};

export default AllPokemons;
