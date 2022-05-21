import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";

import { getUserById } from "../../db/Data/Users";
import { deleteCart, getCart } from "../../db/Data/products";
import searchitem from "./Searchitem";
import { getAuth } from "firebase/auth";
import { subscribeCart } from "../../db/Data/products";
import { editUser, getUsers, subscribeUser } from "../../db/Data/Users";
import Pitem from "./../items/Pitem";
import Searchitem from "./Searchitem";

export default function search({ route, navigation }) {
  const auth = getAuth();
  const userr = auth.currentUser;
  const [fav, setfav] = useState([]);

  const getFavtList = async () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const favo = user1[0].favourite;
      setfav(favo);
    });
  };
  useEffect(() => {
    getFavtList();
  }, []);

  useEffect(() => {
    const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
      if (change.type === "added") {
        getFavtList();
      }
      if (change.type === "modified") {
        getFavtList();
      }
      if (change.type === "removed") {
        getFavtList();
      }
    });

    return () => {
      unsubscribeUser();
    };
  }, []);

  console.log(fav);

  return (
    <View style={styles.item}>
      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold" }}>
        Selected Items
      </Text>
      <FlatList
        data={fav}
        keyExtractor={(item, index) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Searchitem navigation={navigation} item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    // height: 500,
    // width: 200,
    backgroundColor: "red",
    margin: 10,
  },
  item: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2%",
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",
    width: "200%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#011F26",
  },
});
