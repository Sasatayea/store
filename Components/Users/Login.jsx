import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { React, useState } from "react";
import { login } from "../../db/auth/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Text style={{ flex: 1 }}>Email:</Text>
        <TextInput
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Text style={{ flex: 1 }}>Password:</Text>
        <TextInput
          onChangeText={setpassword}
          keyboardType="visible-password"
          secureTextEntry={true}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
      </View>
      <View>
        <Button
          title="Login"
          onPress={() => {
            console.log(email, password);
            login(email,password)
              .then()
              .catch((e) => setError(e.message));
          }}
        />
        <Text>{error}</Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
