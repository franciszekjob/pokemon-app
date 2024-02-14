import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PokemonsProvider } from "~/providers/pokemons/PokemonsProvider";
import { LoadingProvider } from "~/providers/loading/LoadingProvider";
import Loading from "~/components/loading/Loading";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "~/screens/home/Home";
import PokemonDetails from "~/screens/pokemonDetails/PokemonDetails";
import { FavoritePokemonsProvider } from "~/providers/favoritePokemons/FavoritePokemonsProvider";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();
const headerStyle = {
  headerStyle: {
    backgroundColor: "red",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <LoadingProvider>
        <PokemonsProvider>
          <FavoritePokemonsProvider>
            <PaperProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="PokemonDetails"
                    component={PokemonDetails}
                    options={{
                      headerStyle: {},
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </FavoritePokemonsProvider>
        </PokemonsProvider>
      </LoadingProvider>
    </SafeAreaProvider>
  );
}
