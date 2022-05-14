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
    <View>
      <Text>UserEditInPro</Text>
      <Text> </Text>

      <View style={{ flexDirection: "row" }}>
        <Text>Set you name</Text>
        <TextInput
          onChangeText={setName}
          keyboardType="default"
          placeholder="user name"
          value={name}
          style={styles.inpp}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Set you imge</Text>
        <TextInput
          onChangeText={setImage}
          keyboardType="default"
          placeholder="Image"
          value={image}
          style={styles.inpp}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Set you pass</Text>
        <TextInput
          onChangeText={setpass}
          keyboardType="default"
          placeholder="Image"
          value={pass}
          style={styles.inpp}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Set you pass</Text>
        <TextInput
          onChangeText={setcountryname}
          keyboardType="default"
          placeholder="Image"
          value={countryname}
          style={styles.inpp}
        />
      </View>

      <Button title="done" onPress={change} />
    </View>
  );
};

export default UserEditInPro;

const styles = StyleSheet.create({
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
