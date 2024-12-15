import { useEffect, useState } from "react";
import { View, Alert, Text, ActivityIndicator } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

import { api } from "@/services/api";

import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import { Categories, CategoriesProps } from "@/components/categories";
import { colors, fontFamily } from "@/styles/theme";
import React from "react";

type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

type region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [region, setRegion] = useState<region>();
  const [mapKey, setMapKey] = useState(0);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return;
      }

      const { data } = await api.get("/markets/category/" + category);
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Locais", "Não foi possível carregar os locais.");
    }
  }

  async function getCurrentLocation() {
    try {
      let { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const location = await Location.getCurrentPositionAsync();
        console.log("🚀 ~ getCurrentLocation ~ location:", location);
      } else {
        Alert.alert("Permissão para acessa a locatlização negada");
      }
    } catch (Error) {
      console.log("🚀 ~ getCurrentLocation ~ Error:", Error);
    }
  }

  {
    markets.map((item) => {
      console.log("🚀 ~ Home ~ markets - latitude:", item.latitude);
    });
  }
  useEffect(() => {
    getCurrentLocation();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  useEffect(() => {
    if (currentLocation) {
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [currentLocation]);

  useEffect(() => {
    console.log("IsMapReady" + isMapReady);
  }, [isMapReady]);

  useEffect(() => {
    if (!isMapReady) {
      console.log("🚀 ~ useEffect ~ isMapReady:", isMapReady);
      setMapKey(1);
    }
  }, [isMapReady]);

  setTimeout(() => {
    if (!isMapReady) {
      console.warn("Map is not ready, triggering fallback");
      setMapKey(1 + 1);
    }
  }, 5000); // 5 segundos

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />
      {region ? (
        <MapView
          style={{
            height: "100%",
          }}
          key={mapKey}
          region={region}
          moveOnMarkerPress={false}
          loadingEnabled={false}
          onMapReady={() => {
            setIsMapReady((prev) => true);
            console.log("Map is ready");
          }}
          onMapLoaded={() => {
            setIsMapReady((prev) => true), console.log("Map is loaded");
          }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {isMapReady === true ? (
            <View>
              <Marker
                identifier="current"
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                image={require("@/assets/location.png")}
              />

              {markets.map((item) => (
                <Marker
                  key={item.id}
                  identifier={item.id}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  image={require("@/assets/pin.png")}
                />
              ))}
            </View>
          ) : null}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      {/* {region && (
        <MapView
          style={{ height: "100%", width: "100%" }}
          onMapReady={() => setIsMapReady(true)}
          loadingEnabled={true}
          // loadingIndicatorColor="#666666"
          // loadingBackgroundColor="#eeeeee"
          // moveOnMarkerPress={false}
          // showsUserLocation={true}
          // showsCompass={true}
          // showsPointsOfInterest={false}
          // provider="google"
          // region={region}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {isMapReady && (
            <>
              <Marker
                identifier="current"
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                image={require("@/assets/location.png")}
              />

              {markets.map((item) => (
                <Marker
                  key={item.id}
                  identifier={item.id}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  image={require("@/assets/pin.png")}
                />
              ))}
            </>
          )}
        </MapView>
      )} */}
      <Places data={markets} />
      {/* {isMapReady && <Places data={markets} />} */}
    </View>
  );
}
