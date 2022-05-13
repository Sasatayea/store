import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import fpage from "./Fpage";
import { getUsers, subscribeUser } from "../../db/cities/users";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import ProfileItem from "./ProfileItem";
import { logout } from "../../db/auth/auth";
export default function Profile({ navigation }) {
  const getUserList = async () => {
    const c = await getUsers();
    await setusers(c);
    console.log("user", c);
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
  const [users, setusers] = useState([]);

  if (userr !== null) {
    let user = users.filter((e) => e.email == userr.email);

    return (
      <View style={styles.content}>
        <FlatList
          data={user}
          keyExtractor={user.id}
          renderItem={({ item }) => <ProfileItem item={item} />}
        />
        <View style={styles.botton}>
          <View style={styles.pp}>
            <TouchableOpacity onPress={() => logout()}>
              <Text style={{ color: "#fff" }}> Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    fontSize: 30,
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    // backgroundColor: "#D9D9D9",
  },
  // botton: {
  //   width: 250,
  //   padding: 10,
  //   paddingLeft: 100,
  // },
  botton: {
    marginLeft: "30%",
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",
    width: "60%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#011F26",
  },
});
