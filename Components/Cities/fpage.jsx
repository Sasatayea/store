import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import React from "react";
import fpagee from "../../assets/fpagee.png";
import { StatusBar } from 'expo-status-bar';
function Fpage({ navigation }) {
  return (

    <ImageBackground source={fpagee} resizeMode="cover" style={styles.heder}>
            <StatusBar style="auto" />
      <View style={styles.pp}>
        <Button
          title="Login"
          color="#011F26"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <View style={styles.pp2}>
        <Button
          title="Sign Up"
          color="#011F26"
          onPress={() => navigation.navigate("Register")}
        />
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
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  pp2: {
    paddingTop: "5%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
});
