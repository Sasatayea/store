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
          marginTop: "60%",
          backgroundColor: "white",
          borderRadius: 30,
          height: "50%",
          padding: 5,
          margin: 10,
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
        <TextInput
          onChangeText={setusername}
          keyboardType="default"
          placeholder="User name"
          style={styles.inpp}
        />

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

        <TextInput
          onChangeText={setcountry}
          keyboardType="default"
          placeholder="country name"
          style={styles.inpp}
        />

        <View
          style={{
            width: 170,
            padding: 10,
            marginLeft: "50%",
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
  inpp: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    height: 60,
  },
});
