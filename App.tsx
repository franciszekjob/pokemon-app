import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { defaultTheme } from "~/style/defaultTheme";
import TabIcon from "~/components/tabIcon/TabIcon";
import { BottomNavigation, Appbar } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PokemonMap from "~/screens/pokemonMap/PokemonMap";
import PokemonList from "~/screens/pokemonList/PokemonList";
import { PokemonsProvider } from "~/providers/pokemons/PokemonsProvider";

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "pokemons",
      title: "All Pokemons",
      focusedIcon: "view-list",
      unfocusedIcon: "view-list-outline",
    },
    {
      key: "map",
      title: "Map",
      focusedIcon: "map",
      unfocusedIcon: "map-outline",
    },
    {
      key: "favorites",
      title: "Favorites",
      focusedIcon: "star",
      unfocusedIcon: "star-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    pokemons: PokemonList,
    map: PokemonMap,
    favorites: PokemonList,
  });

  return (
    <SafeAreaProvider>
      <PokemonsProvider>
        <Appbar.Header>
          <Appbar.Content title={routes[index].title} />
          {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </PokemonsProvider>
    </SafeAreaProvider>
  );
}
