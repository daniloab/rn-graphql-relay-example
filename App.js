import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./src/signIn/SignIn";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Back4App React Native Relay - SignIn Flow</Text>
      <SignIn />
    </View>
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
