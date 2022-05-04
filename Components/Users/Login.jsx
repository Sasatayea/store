import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import { React, useState } from "react";
import { login } from "../../db/auth/auth";
import loginn from "../../assets/loginn.png";
import Register from "./Register";
import { TouchableOpacity } from "react-native-web";
import {
  getUsers,
  addUser,
  deleteUser,
  subscribe,
} from "../../db/cities/Users";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/loginn.png")}
      resizeMode="cover"
      style={styles.heder}
    >
      <View
        style={{
          marginTop: "50%",
          backgroundColor: "white",
          borderRadius: 20,
          height: "40%",
        }}
      >
        <Text
          style={{
            padding: 2,
            textAlign: "center",
            fontSize: 30,
            fontFamily: "bold",
          }}
        >
          {" "}
          Login
        </Text>
        <View
          style={{
            padding: 10,
            borderRadius: 20,
          }}
        >
          <TextInput
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="email-address"
            style={{
              flex: 2,
              borderColor: "black",
              borderWidth: 2,
              height: 40,
              // margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
          />
        </View>

        <View
          style={{
            padding: 10,
            borderRadius: 20,
          }}
        >
          <TextInput
            onChangeText={setpassword}
            keyboardType="visible-password"
            placeholder="password"
            secureTextEntry={true}
            style={{
              flex: 2,
              borderColor: "black",
              borderWidth: 2,
              height: 40,
              padding: 10,
            }}
          />
        </View>
        <View
          style={{
            width: 150,
            padding: 10,
          }}
        >
          <Button
            title="Login"
            color="#000"
            onPress={() => {
              login(email, password)
                .then()
                .catch((e) => setError(e.message));
            }}
          />
          <Text>{error}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ paddingTop: 15 }}> Create an account </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  heder: {
    height: "100%",
    width: "100%",
  },
});
