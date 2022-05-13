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
          marginTop: "50%",

          // height: "50%",
          // padding: 5,
          // margin: 10,
        }}
      >
        <Text
          style={{
            padding: 2,
            textAlign: "center",
            fontSize: 30,
            color: "#fff",
            //fontFamily: "bold",
          }}
        >
          {" "}
          Sign Up{" "}
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
            onChangeText={setusername}
            keyboardType="default"
            placeholder="User name"
            placeholderTextColor="#fff"
            style={styles.inpp}
          />
        </View>
        <View
          style={{
            // borderRadius: 30,
            height: 45,
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <TextInput
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="email-address"
            placeholderTextColor="#fff"
            style={styles.inpp}
          />
        </View>
        <View
          style={{
            // borderRadius: 30,
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
            secureTextEntry={true}
            style={styles.inpp}
          />
        </View>
        <View
          style={{
            // borderRadius: 30,
            height: 45,
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <TextInput
            onChangeText={setcountry}
            keyboardType="default"
            placeholder="country name"
            placeholderTextColor="#fff"
            style={styles.inpp}
          />
        </View>
        <View style={styles.pp}>
          <TouchableOpacity
            onPress={() => {
              console.log(email, password);

              register(email, password, username, country)
                .then()
                .catch((e) => setError(e.message));
            }}
          >
            <Text style={{ color: "#fff" }}> Register </Text>
          </TouchableOpacity>
        </View>
        <Text>{error}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Fpage")}>
          <Text style={{ marginTop: "5%", marginLeft: "15%", color: "#fff" }}>
            {" "}
            Go to Home page{" "}
          </Text>
        </TouchableOpacity>
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
    width: "70%",
    flex: 1,
    color: "#fff",
    borderRadius: 25,
    borderColor: "black",
    height: 90,
    borderWidth: 1,
    backgroundColor: "#011F26",
    paddingLeft: "5%",
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
