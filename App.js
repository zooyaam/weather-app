import React from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";

const { width: SCREEN_WIDTH1 } = Dimensions.get("window");
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>City</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4ea",
  },
  city: {
    flex: 1,
  },
  cityName: {
    fontSize: 40,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 60,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    fontSize: 110,
    color: "#426B1F",
  },
  description: {
    fontSize: 40,
    color: "#426B1F",
  },
});
