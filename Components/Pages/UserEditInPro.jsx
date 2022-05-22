import { StyleSheet, Text, View,Button,TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import { editUser, getUserById } from "../../db/Data/Users";
import { getAuth } from "firebase/auth";
import { ScrollView } from "react-native-web";

const UserEditInPro = ({navigation,route}) => {
  let item = route.params;
  console.log(route)
  console.log("user info", item);
  const auth = getAuth();
  const userr = auth.currentUser;
  const [image, setImage] = useState(item.image);
  const [background, setBackground] = useState(item.background);
  const [pass, setpass] = useState(item.password);
  const [countryname, setcountryname] = useState(item.countryname);

  const [name, setName] = useState(item.name);
  const change = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      editUser({
        ...user1[0],
        name: name,
        image: image,
        password: pass,
        countryname: countryname,
        background:background,
      });
    }).then(navigation.navigate("Profile"));
  };
  return (
    <ScrollView>
    <View
      style={{
        marginTop: "40%",
        backgroundColor: "white",
        borderRadius: 20,
        height: "100%",
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
        Profile Edit
      </Text>
      <Text> </Text>
      <View style={{ alignSelf:"center"}}>
        
        <View style={styles.in}>
          <Text style={{ marginTop:20}}> Edit name </Text>
          <TextInput
            onChangeText={setName}
            keyboardType="default"
            placeholder="user name"
            value={name}
            style={styles.inpp}
          />
      </View>
        
        <View style={styles.in}>
        <Text style={{ marginTop:20}}> Edit Image </Text>
          <TextInput
            onChangeText={setImage}
            keyboardType="default"
            placeholder="Image"
            value={image}
            style={styles.inpp}
          />
        </View>
        <View style={styles.in}>
        <Text style={{ marginTop:20}}> Edit Image Background </Text>
          <TextInput
            onChangeText={setBackground}
            keyboardType="default"
            placeholder="background"
            value={background}
            style={styles.inpp}
          />
        </View>
        
        <View style={styles.in}>
        <Text style={{ marginTop:20}}> Edit countryname </Text>
          <TextInput
            onChangeText={setcountryname}
            keyboardType="default"
            placeholder="countr yname"
            value={countryname}
            style={styles.inpp}
          />
      </View>
      </View>
      <View
        style={{
          width: 170,
          padding: 10,
          alignSelf:"center",
        }}
      >
        <Button color="#000" title="done" onPress={change} />
      </View>
    </View>
    </ScrollView>
  );
};

export default UserEditInPro;

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
  in:{
    flexDirection:'row'
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
