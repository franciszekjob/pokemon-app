import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { styles } from "./styles";

const PokemonMap = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default PokemonMap;
