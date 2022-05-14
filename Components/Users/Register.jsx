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
import { getUserById, addUser } from "../../db/Data/Users";
import { getUserUId } from "../../db/auth/auth";
const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [country, setcountry] = useState("");

  const [error, setError] = useState("");
  function registerUser() {
    if (email === "" || password === "") {
      alert("email or password is empty!");
    } else {
      register(email, password)
        .then(() => {
          getUserUId().then((id) => {
            // console.log(id);

            addUser({
              id: id,
              name: username,
              email: email,
              password: password,
              countryname: country,
              money: 0,
              cart: [],
              sold: [],
              image: "",
              background: "",
            });
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }
  return (
    <ImageBackground source={loginn} resizeMode="cover" style={styles.heder}>
      <View
        style={{
          marginTop: "50%",
          // backgroundColor: "white",
          // borderRadius: 30,
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
            style={styles.inpp}
          />
        </View>
        <View style={{flexDirection:"row"}}>
          <View style={styles.pp}>
            <TouchableOpacity onPress={registerUser}>
              <Text style={{ color: "#fff" }}> Register </Text>
            </TouchableOpacity>
            </View>
            <Text>{error}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Fpage")}>
              <Text style={{ marginTop: "20%",marginLeft:"30%", color: "#fff" }}>Go to Home page</Text>
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
