import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./src/signUp/SignUp";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Back4App React Native Relay - SignUp Flow</Text>
      <SignUp />
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
