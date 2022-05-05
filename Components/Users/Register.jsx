import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";
import { register } from "../../db/auth/auth";
import loginn from "../../assets/loginn.png";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [country, setcountry] = useState("");

  const [error, setError] = useState("");
  return (
    <ImageBackground source={loginn} resizeMode="cover" style={styles.heder}>
      <View
        style={{
          marginTop: "40%",
          backgroundColor: "white",
          borderRadius: 20,
          height: "58%",
        }}
      >
        <Text
          style={{
            padding: 2,
            textAlign: "center",
            fontSize: 30,
            //fontFamily: "bold",
          }}
        >
          {" "}
          Sign Up{" "}
        </Text>
        <View style={styles.in}>
          <TextInput
            onChangeText={setusername}
            keyboardType="default"
            placeholder="User name"
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
        <View style={styles.in}>
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
        <View style={styles.in}>
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
              // margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
          />
        </View>

        <View style={styles.in}>
          <TextInput
            onChangeText={setcountry}
            keyboardType="default"
            placeholder="country name"
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
            width: 170,
            padding: 10,
          }}
        >
          <Button
            title="Register"
            color="#000"
            onPress={() => {
              console.log(email, password);

              register(email, password, username, country)
                .then()
                .catch((e) => setError(e.message));
            }}
          />

          <Text>{error}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Fpage")}>
            <Text style={{ paddingTop: 10, paddingLeft: 5 }}>
              {" "}
              Go to Home page{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  heder: {
    height: "100%",
    width: "100%",
  },
  in: {
    padding: 10,
    borderRadius: 20,
  },
});
