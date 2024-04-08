import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "9bebe07b840e4602599fb2da041e472f";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();

    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("03:00:00")) {
          return weather;
        }
      })
    );
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.daily}>
                {new Date(day.dt * 1000).toDateString()}{" "}
              </Text>
              <Text style={styles.temp}>
                {parseFloat(day.main.temp).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Fontisto
                icons={icons[day.weather[0].main]}
                size={96}
                color="white"
              />
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222822",
  },
  city: {
    flex: 1,
  },
  cityName: {
    fontSize: 40,
    fontWeight: "500",
    color: "#f4f4ea",
    textAlign: "center",
    marginTop: 70,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  daily: {
    fontSize: 25,
    color: "#f4f4ea",
  },
  temp: {
    fontSize: 110,
    color: "#f4f4ea",
    paddingTop: 50,
  },
  description: {
    fontSize: 40,
    color: "#f4f4ea",
    paddingTop: 35,
  },
  tinyText: {
    fontSize: 20,
    color: "#f4f4ea",
    paddingTop: 10,
  },
});
