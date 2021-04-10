import React, { useState } from "react";
import environment from "../../relay/environment";
import { FormikProvider, useFormik } from "formik";
import { Button, Text, View } from "react-native";

import styled from "styled-components";
import LogInMutation from "./mutations/LogInMutation";

const TextInput = styled.TextInput``;

const SignIn = () => {
  const [userLogged, setUserLogged] = useState({});

  const onSubmit = (values) => {
    const { username, password } = values;

    const input = {
      username,
      password,
    };

    LogInMutation.commit({
      environment,
      input,
      onCompleted: (response) => {
        if (!response?.logIn || response?.logIn === null) {
          alert("Error while logging");
          return;
        }

        const { viewer } = response?.logIn;
        const { sessionToken, user } = viewer;

        if (sessionToken !== null) {
          setUserLogged(user);
          alert(`user ${user.username} successfully logged`);
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

  if (userLogged?.id) {
    return (
      <View style={{ marginTop: 15, alignItems: "center" }}>
        <Text>User {userLogged.name} logged</Text>
      </View>
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
