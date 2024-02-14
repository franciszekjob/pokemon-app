import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import IGeoLocation from "~/ts/interfaces/map/location";
import { DEFAULT_LOCATION } from "~/config/mapConfig";
import { styles } from "./styles";
import { styles as listItemStyles } from "../../components/pokemonListItem/styles";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  ActivityIndicator,
  Button,
  List,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import axios from "axios";
import IPokemon from "~/ts/interfaces/pokemon/pokemon";
import lodash from "lodash";
const PokemonMap = () => {
  const [currentLocation, setCurrentLocation] = useState<IGeoLocation | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // // variables
  // const snapPoints = useMemo(() => ["25%", "50%"], []);

  // // callbacks
  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.present();
  // }, []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${lodash.lowerCase(searchText)}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((error) => {
        console.error("Error getting pokemon:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    // <BottomSheetModalProvider>
    <View style={styles.container}>
      {/* <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal> */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <TextInput
            label="Search"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            style={{ marginTop: 10 }}
          />
          {loading && (
            <View
              style={{
                paddingVertical: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" />
            </View>
          )}
          {pokemon && !loading && (
            <List.Item
              style={listItemStyles.tile}
              title={lodash.capitalize(pokemon.name)}
              left={() => (
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
                  }}
                  style={{ width: 50, height: 50 }}
                />
              )}
              onPress={() => {}}
            />
          )}
          <Button
            mode="contained"
            onPress={handleSearch}
            style={{ marginTop: 10 }}
          >
            Search
          </Button>
        </Modal>
      </Portal>
      <MapView
        style={styles.map}
        initialRegion={currentLocation || DEFAULT_LOCATION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        onLongPress={showModal}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Moja Lokalizacja"
            description="Jesteś tutaj!"
          />
        )}
      </MapView>
    </View>
    // </BottomSheetModalProvider>
  );
};

export default PokemonMap;
