import { StyleSheet, Text, View, Button, ImageBackground,TouchableOpacity } from "react-native";
import React from "react";
import fpagee from "../../assets/fpagee.png";
function Fpage({ navigation }) {
  return (
    <ImageBackground source={fpagee} resizeMode="cover" style={styles.heder}>
      <View style={styles.pp}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#fff" }}> Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pp2}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#fff" }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Fpage;

const styles = StyleSheet.create({
  heder: {
    height: "100%",
    width: "100%",
  },
  pp: {
    marginTop: "90%",
    marginLeft: "10%",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#011F26",
  },
  pp2: {
    marginLeft: "10%",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    backgroundColor: "#011F26",
  },
});
