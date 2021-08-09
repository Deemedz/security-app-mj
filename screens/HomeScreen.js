import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native"; //Protects content from notches or inscreen cameras.
import { Avatar } from "react-native-elements";
import CustomListItem from "./components/CustomListItem";
import { auth, db } from "../firebase";
import { TouchableOpacity } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"; //Vector icons from expo library

//import AddChatScreen from "./AddChatScreen";
//import ChatScreen from "./ChatScreen";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  //SIGNOUT API
  const signOutUser = () => {
    auth.signOut().then(() => {
      //Returns promise that'll user to LoginScreen
      navigation.replace("Login");
    });
  };

  //Styles the header of the chat
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: "Signal",
      headerStyle: { backgroundColor: "#F68519" },
      headerTitle: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar
              rounded
              source={{
                uri: "https://bcassetcdn.com/social/qvhlj9kgd3/preview.png",
              }} /*Displays profile photo of the signed in user*/
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <View style={styles.container} /*Allow screen scroll for chat*/>
      <View style={styles.categoryContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="play" size={72} color="black" />
        </TouchableOpacity>
        <Text style={styles.txt}>Screen recording</Text>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="Compass" size={72} color="black" />
        </TouchableOpacity>
        <Text style={styles.txt}>Tracker</Text>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="camerao" size={72} color="black" />
        </TouchableOpacity>
        <Text style={styles.txt}>Camera</Text>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="setting" size={72} color="black" />
        </TouchableOpacity>
        <Text style={styles.txt}>Vault</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#F68519",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
  },
  categoryContainer: {
    width: 185,
    height: 185,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    opacity: 0.3,
  },
  txt: {
    alignSelf: "center",
    justifyContent: "center",
  },
});
