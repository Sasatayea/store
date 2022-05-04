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
import fpage from "./fpage";
import { getUsers, subscribeUser } from "../../db/cities/Users";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import ProfileItem from "./ProfileItem";
import { logout } from "../../db/auth/auth";
export default function profile({ navigation }) {
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
  console.log("gggggggggggggg", users);
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
          <Button color="#000" title="Logout" onPress={() => logout()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    fontSize: 30,
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  botton: {
    width: 250,
    padding: 10,
    paddingLeft: 100,
  },
});
