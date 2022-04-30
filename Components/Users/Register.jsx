import { StyleSheet, Text, View, TextInput, Button ,ImageBackground } from "react-native";
import { React, useState } from "react";
import { register } from "../../db/auth/auth";
import loginn from '../../assets/loginn.png'


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [country, setcountry] = useState("");


  const [error, setError] = useState("");
  
  return (
    <ImageBackground source={loginn} resizeMode="cover"
      style={styles.heder}>
      <View style={{
          marginTop:'50%',
          backgroundColor:'white',
          borderRadius:20,
          height:'50%'
        }}>
        
        <Text  style={{
          padding: 2,
          textAlign:'center',
          fontSize:30
        }}> Sign Up </Text>
      <View
        style={{
          padding: 10,
          borderRadius:20,
        }}
      >
        <TextInput
          onChangeText={setusername}
          keyboardType="default"
          placeholder="User name"
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
      </View>
      <View
        style={{
          padding: 10,
          borderRadius:20,
        }}
      >
        <TextInput
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="email-address"
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
      </View>
      <View
        style={{
          padding: 10,
          borderRadius:20,
        }}
      >  
        <TextInput
          onChangeText={setpassword}
          keyboardType="visible-password"
          placeholder="password"
          secureTextEntry={true}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
      </View>

      <View
        style={{
          padding: 10,
          borderRadius:20,
        }}
      >
        <TextInput
          onChangeText={setcountry}
          keyboardType="default"
          placeholder="country name"
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
      </View>

      <View style={{
          width:100,
          padding:10,
        }}>
        <Button
          title="Register"
          onPress={() => {
            console.log(email, password);
            register(email,password ,username )
              .then()
              .catch((e) => setError(e.message));
          }}
        />

        <Text>{error}</Text>
      </View>
      </View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  heder:{
    height:'100%',
    width:'100%',
  },
});
