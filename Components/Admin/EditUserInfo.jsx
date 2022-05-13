import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { editUser, getUserById, subscribeUser } from "../../db/Data/Users";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-native";
import { TextInput } from "react-native";

const EditUserInfo = () => {
  const getUserList = async () => {
    const auth = getAuth();
    const userr = auth.currentUser;
    await getUserById(userr.uid).then((u) => {
      setuser(u[0]);
      //console.log("useruuuu", u);
    });
  };

  useEffect(async () => {
    await getUserList();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeUser(({ change, snapshot }) => {
      if (change.type === "added") {
        getUserList();
      }
      if (change.type === "modified") {
        getUserList();
      }
      if (change.type === "removed") {
        getUserList();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const auth = getAuth();
  const userr = auth.currentUser;
  const [user, setuser] = useState({});
  const [image, setImage] = useState();
  const [pass, setpass] = useState();
  const [countryname, setcountryname] = useState();
  const [name, setName] = useState();
  const [mony, setmony] = useState();
  const [id, setId] = useState(0);

  const change = () => {
    console.log("nin", user);
  };
  return (
    <View>
      <Text>AdminEditInPro</Text>
      <Text> </Text>
      <View style={{ flexDirection: "row" }}>
        <Text>Enter User Id</Text>
        <TextInput
          onChangeText={setId}
          keyboardType="default"
          placeholder="Image"
          style={styles.inpp}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text>Enter User name</Text>
        <TextInput
          onChangeText={setName}
          keyboardType="default"
          placeholder="user name"
          style={styles.inpp}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Enter User image</Text>
        <TextInput
          onChangeText={setImage}
          keyboardType="default"
          placeholder="Image"
          style={styles.inpp}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Enter User pass</Text>
        <TextInput
          onChangeText={setpass}
          keyboardType="default"
          placeholder="Image"
          style={styles.inpp}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Enter User money</Text>
        <TextInput
          onChangeText={setmony}
          keyboardType="default"
          placeholder="Image"
          style={styles.inpp}
        />
      </View>

      <Button title="done" onPress={change} />
    </View>
  );
};

export default EditUserInfo;

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
