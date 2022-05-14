import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { React, useState } from "react";
import { login } from "../../db/auth/auth";


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
          marginTop: "55%",
          // backgroundColor: "white",
          // borderRadius: 30,
          // height: "40%",
          // padding: 5,
          // margin: 10,
        }}
      >
        <Text
          style={{
            padding: 2,
            textAlign: "center",
            fontSize: 30,
            // fontFamily: "bold",
            color: "#fff",
          }}
        >
          {" "}
          Login
        </Text>
        <View
          style={{
            // borderRadius: 30,
            height: 45,
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <TextInput
            keyboardType="email-address"
            placeholder="email-address"
            placeholderTextColor="#fff"
            onChangeText={setEmail}
            style={{
              width: "70%",
              flex: 1,
              color: "#fff",
              borderRadius: 25,
              borderColor: "black",
              height: 90,
              borderWidth: 1,
              backgroundColor: "#011F26",
              paddingLeft: "5%",
            }}
          />
        </View>

        <View
          style={{
            borderRadius: 30,
            height: 45,
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <TextInput
            onChangeText={setpassword}
            keyboardType="visible-password"
            placeholder="password"
            placeholderTextColor="#fff"
            color="white"
            secureTextEntry={true}
            style={{
              width: "70%",
              flex: 1,
              color: "#fff",
              borderRadius: 30,
              borderColor: "black",
              height: 90,
              borderWidth: 1,
              backgroundColor: "#011F26",
              paddingLeft: "5%",
            }}
          />
        </View>

        <View style={styles.pp}>
          <TouchableOpacity
            onPress={() => {
              login(email, password)
                .then()
                .catch((e) => setError(e.message));
            }}
          >
            <Text style={{ color: "#fff" }}> Login</Text>
          </TouchableOpacity>
          <Text>{error}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ marginTop: "5%", marginLeft: "15%", color: "#fff" }}>
            {" "}
            Create an account{" "}
          </Text>
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
  inpp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  texttinput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  pp: {
    marginLeft: "15%",
    width: "30%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",

    backgroundColor: "#011F26",
  },
});
