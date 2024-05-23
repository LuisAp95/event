import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Map() {
  
 
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
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
