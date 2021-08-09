import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar"; //The extreme top where the time, wifi and battery icons are
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //Check is user is logged in
      if (authUser) {
        navigation.replace("Home"); //Replaces LoginScreen with HomeScreen. Disallowing swipeback
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding" //Push screen content up when keyboard opens.
      style={styles.container} //React native version of div is View.
    >
      <StatusBar
        style="light" /*Determines the color theme of the status bar*/
      />
      <Image
        source={{
          uri: "https://bcassetcdn.com/social/qvhlj9kgd3/preview.png",
          //uri: "http://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          //autoFocus
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="Password" /*secureTextEntry allows the pasword to be hidden*/
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() => navigation.navigate("Register")} //Uses navigation as props to pop the screen being called
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <View
        style={{
          height: 100,
        }} //Adds a view gap between register button and keyboard
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
