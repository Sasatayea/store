import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { TextInput } from "react-native";
import { Button } from "react-native-web";
import { editUser, getUserById } from "../../db/Data/Users";
import { getAuth } from "firebase/auth";

const UserEditInPro = (items) => {
  let item = items.route.params;
  console.log("user info", item);
  const auth = getAuth();
  const userr = auth.currentUser;
  const [image, setImage] = useState(item.image);
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
      });
    });
  };
  return (
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
        Profile Edit
      </Text>
      <Text> </Text>
<View style={{ alignSelf:"center"}}>
      <View style={{ flexDirection: "row" }}>
        
        <View style={styles.in}>
          <TextInput
            onChangeText={setName}
            keyboardType="default"
            placeholder="user name"
            value={name}
            style={styles.inpp}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        
        <View style={styles.in}>
          <TextInput
            onChangeText={setImage}
            keyboardType="default"
            placeholder="Image"
            value={image}
            style={styles.inpp}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        
        <View style={styles.in}>
          <TextInput
            onChangeText={setpass}
            keyboardType="password"
            placeholder="password"
            value={pass}
            style={styles.inpp}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        
        <View style={styles.in}>
          <TextInput
            onChangeText={setcountryname}
            keyboardType="default"
            placeholder="countr yname"
            value={countryname}
            style={styles.inpp}
          />
        </View>
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
