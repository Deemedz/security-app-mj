import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";

import { Alert } from "react-native";
import { Location, Permissions } from "expo";

const TrackerScreen = ({ navigation }) => {
  //const [location, setLocation] = useState([]);
  const state = {
    location: "",
    errorMessage: "",
  };

const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!");

      setState({
        errorMessage: "PERMISSION NOT GRANTED",
      });
    } else {
      const location = await Location.getCurrentPositionAsync();

      setState({
        location,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state.location)}</Text>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <TouchableOpacity activeOpacity={0.5} onPress={getLocation}>
            <Text style={styles.text}>Turn On Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TrackerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#62A5DF",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    backgroundColor: "#D4EEC2",
    width: 250,
    height: 250,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: "#72C833",
    width: 200,
    height: 200,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: "center",
  },
});
