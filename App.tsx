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
import { PokemonPinsProvider } from "~/providers/pokemonPinsProvider/PokemonPinsProvider";

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
            <PokemonPinsProvider>
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
                        headerStyle: {
                          backgroundColor: "transparent",
                        },
                        headerTitle: "",
                        headerTransparent: true,
                        headerTintColor: "#fff",
                      }}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </PaperProvider>
            </PokemonPinsProvider>
          </FavoritePokemonsProvider>
        </PokemonsProvider>
      </LoadingProvider>
    </SafeAreaProvider>
  );
}
