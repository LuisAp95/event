import * as React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";


export default function Maps() {
  const [origin, setOrigin] = React.useState({
    latitude: 10.47019,
    longitude: -66.89712,
    
  });

  const [destino, setDestino] = React.useState({
    latitude: 10.47489,
    longitude: -66.88665,
  

  });
  //   10.47489, -66.88665

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          longitudeDelta: 0.009,
          latitudeDelta: 0.04,
        }}
      >
        <Marker
          draggable
          coordinate={origin}
          onDragEnd={(directions) =>
            setOrigin(directions.nativeEvent.coordinate)
          }
        />
        <Marker
          draggable
          coordinate={destino}
          onDragEnd={(directions) =>
            setOrigin(directions.nativeEvent.coordinate)
          }
        />
         <MapViewDirections
         origin={origin}
         directions={destino}
         apikey= "AIzaSyC83yVY0CuGnFnZkZSuEBKjZxhoT_xsSX8"
         /> 

        <Polyline
          coordinates={[origin, destino]}
          strokeColor="purple"
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#afff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
