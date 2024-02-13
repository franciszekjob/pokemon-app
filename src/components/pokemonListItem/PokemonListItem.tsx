import { View, Text, Image } from "react-native";
import React from "react";
import IPokemon from "~/ts/interfaces/pokemon/pokemon";
import { List } from "react-native-paper";
import { styles } from "./styles";
import lodash from "lodash";
type Props = {
  item: IPokemon;
};

const PokemonListItem = ({ item }: Props) => {
  return (
    <List.Item
      style={styles.tile}
      title={lodash.capitalize(item.name)}
      description="Item description"
      left={(props) => (
        <Image
          source={{
            uri:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          }}
          style={{ width: 50, height: 50 }}
        />
      )}
      right={(props) => <List.Icon {...props} icon="star-outline" />}
    />
  );
};

export default PokemonListItem;
