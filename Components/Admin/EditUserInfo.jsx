import { StyleSheet, Text, View ,TouchableOpacity ,Image} from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { editUser, getUserById, getUsers, subscribeUser } from "../../db/Data/Users";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { FlatList } from 'react-native-web';

const EditUserInfo = ({navigation}) => {

  const getUserList = async () => {
    const c = await getUsers();
    await setuser(c);
    // console.log("products", c);
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

  const [user, setuser] = useState([]);


  return (
    <View>
      <Text> </Text>
      <View>
        <Text styles={{ marginButton: 30 }}>
        AdminEditInPro
                </Text>
        <Text> </Text>
        <FlatList
          data={user}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("UserSite", { item: item })}
              style={[styles.card, styles.shadowProp]}
            >
              <View>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: item.image }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text>Name : {item.name}</Text>
                <Text>money : {item.money}</Text>
                <Text>countryname :{item.countryname}</Text>
                <Text>email :{item.email}</Text>
                <Text>password :{item.password}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
  card: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: "3%",
    width: 350,
    height: 120,
    alignSelf: "center",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
