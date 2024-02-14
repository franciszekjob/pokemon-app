import { View, Text, Image } from "react-native";
import React from "react";
import IPokemon from "~/ts/interfaces/pokemon/pokemon";
import { List, TouchableRipple } from "react-native-paper";
import { styles } from "./styles";
import lodash from "lodash";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "~/config/navigationConfig";
import { useFavoritePokemons } from "~/contexts/favoritePokemons/FavoritePokemonsContext";
type Props = {
  item: IPokemon;
  right: () => JSX.Element;
};

const PokemonListItem = ({ item }: Props) => {
  const navigation = useNavigation();
  const {
    addFavoritePokemon,
    deleteFavoritePokemon,
    isPokemonFavorite,
  } = useFavoritePokemons();
  return (
    <List.Item
      style={styles.tile}
      title={lodash.capitalize(item.name)}
      left={() => (
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
          }}
          style={{ width: 50, height: 50 }}
        />
      )}
      right={() => (
        <TouchableRipple
          style={styles.right}
          onPress={() => {
            if (isPokemonFavorite(item.id)) {
              deleteFavoritePokemon(item.id);
            } else {
              addFavoritePokemon(item);
            }
          }}
        >
          <List.Icon
            icon={isPokemonFavorite(item.id) ? "star" : "star-outline"}
          />
        </TouchableRipple>
      )}
      onPress={() =>
        navigation.navigate(ROUTES.POKEMON_DETAILS, { pokemonId: item.id })
      }
    />
  );
};

export default PokemonListItem;
