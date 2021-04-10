import React, { useState } from "react";
import environment from "../../relay/environment";
import { FormikProvider, useFormik } from "formik";
import { Button, Text, View } from "react-native";

import styled from "styled-components";
import LogInMutation from "./mutations/LogInMutation";
import UserLoggedRenderer from "./UserLoggedRenderer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogOutMutation from "./mutations/LogOutMutation";

const TextInput = styled.TextInput``;

const SignIn = () => {
  const [sessionToken, setSessionToken] = useState(null);

  const handleLogout = async () => {
    LogOutMutation.commit({
      environment,
      input: {},
      onCompleted: async () => {
        await AsyncStorage.removeItem("sessionToken");
        setSessionToken(null);
        alert("User successfully logged out");
      },
      onError: (errors) => {
        alert(errors[0].message);
      },
    });
  };

  const onSubmit = (values) => {
    const { username, password } = values;

    const input = {
      username,
      password,
    };

    LogInMutation.commit({
      environment,
      input,
      onCompleted: async (response) => {
        if (!response?.logIn || response?.logIn === null) {
          alert("Error while logging");
          return;
        }

        const { viewer } = response?.logIn;
        const { sessionToken, user } = viewer;

        if (sessionToken !== null) {
          setSessionToken(sessionToken);
          await AsyncStorage.setItem("sessionToken", sessionToken);
          return;
        }
      },
      onError: (errors) => {
        alert(errors[0].message);
      },
    });
  };

  const formikbag = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  const { handleSubmit, setFieldValue } = formikbag;

  if (sessionToken) {
    return (
      <>
        <UserLoggedRenderer />
        <Button title={"logout"} onPress={() => handleLogout()} />
      </>
    );
  }

  return (
    <FormikProvider value={formikbag}>
      <View style={{ marginTop: 15, alignItems: "center" }}>
        <Text>Username</Text>
        <TextInput
          name={"username"}
          style={{
            width: 150,
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
          }}
          autoCapitalize="none"
          onChangeText={(text) => setFieldValue("username", text)}
        />

        <Text style={{ marginTop: 15 }}>Password</Text>
        <TextInput
          style={{
            width: 150,
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
          }}
          name={"password"}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setFieldValue("password", text)}
        />
        <Button title={"sign in"} onPress={() => handleSubmit()} />
      </View>
    </FormikProvider>
  );
};

export default SignIn;
