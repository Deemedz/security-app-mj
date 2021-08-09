import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Location, Permissions } from "expo";

const useTracking = () => {
  state = {
    location,
    errorMessage: "",
  };

  /*componentWillMount(){
      this.getLocation();
  }*/

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permisions.Location);

    if (status !== "granted") {
        console.log('PERMISSION NOT GRANTED!');


      this.setState({
        errorMessage: "PERMISSION NOT GRANTED",
      });
    }

    const userLocation = await Location.getCurrentPositionAsync();

    this.setState({
      location: userLocation,
    });
  };

  return (
      <View>
          <Text>
              {JSON.stringify(this.state.location)}
          </Text>
      </View>
  )
};
