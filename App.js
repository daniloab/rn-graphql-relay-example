import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import SignIn from "./src/signIn/SignIn";
import SignUp from "./src/signUp/SignUp";
import Styles from "./Style";

export default function App() {
  return (
    <SafeAreaView style={Styles.login_container}>
      <View style={Styles.login_header}>
        <Image
          style={Styles.login_header_logo}
          source={require("./assets/logo-back4app.png")}
        />
        <Text style={Styles.login_header_text}>
          <Text style={Styles.login_header_text_bold}>
            {"React Native on Back4App - "}
          </Text>
          {" User registration"}
        </Text>
      </View>
      <SignIn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
