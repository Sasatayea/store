import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { React, useState } from "react";
import { register } from "../../db/auth/auth";

const Register = () => {
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
          title="Register"
          onPress={() => {
            console.log(email, password);
            register(email,password)
              .then()
              .catch((e) => setError(e.message));
          }}
        />
        <Text>{error}</Text>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
