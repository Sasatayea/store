import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { React, useState } from "react";
import { login } from "../../db/auth/auth";
import loginn from "../../assets/loginn.png";
import Register from "./Register";
import {
  getUsers,
  addUser,
  deleteUser,
  subscribe,
} from "../../db/cities/users";
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
      <StatusBar style="auto" />
      <View
        style={{
          marginTop: "60%",
          backgroundColor: "white",
          borderRadius: 30,
          height: "40%",
          padding:5,
          margin:10
        }}
      >
        <Text
          style={{
            padding: 2,
            textAlign: "center",
            fontSize: 35,
          }}
        > Login </Text>

          <TextInput
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="email-address"
            style={styles.inpp}
          />
          <TextInput
            onChangeText={setpassword}
            keyboardType="visible-password"
            placeholder="password"
            secureTextEntry={true}
            style={styles.inpp}
          />
        <View
          style={{
            width: 150,
            padding: 10,
            marginLeft:'50%'
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
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ paddingTop: 15 }}> Create an account </Text>
          </TouchableOpacity>
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
  inpp:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  texttinput: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8 ,
    margin: 10 ,
    width: 200,
  },
});
