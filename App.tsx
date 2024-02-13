import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PokemonList from './src/screens/pokemon-list/PokemonList';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen name="PokemonList" component={PokemonList} />
    <Tab.Screen name="FavoritePokemonList" component={PokemonList} />
    <Tab.Screen name="PokemonMap" component={PokemonList} />
  </Tab.Navigator>
  </NavigationContainer>
  );
}
