import { FlatList, Image, Text, View } from "react-native";
import { List } from "react-native-paper";
import PokemonListItem from "~/components/pokemonListItem/PokemonListItem";
import { usePokemons } from "~/contexts/pokemons/PokemonsContext";

const PokemonList = () => {
  const { pokemons, fetchPokemons, fetchingPokemons } = usePokemons();

  const onMomentumScrollEnd = () => {
    const threshold = 0.9;

    if (isCloseToBottom(threshold) && !isFetching) {
      fetchPokemons();
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View>
      <FlatList
        data={pokemons}
        renderItem={({ item }) => <PokemonListItem item={item} />}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
    </View>
  );
};

export default PokemonList;
