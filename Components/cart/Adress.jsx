import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
  ScrollView,
  CheckBox,
} from "react-native";
import { useState, useEffect } from "react";
import { RadioButton } from "react-native-paper";
import { getUserById } from "../../db/Data/Users";
import { getAuth } from "firebase/auth";
import { addOrder } from "../../db/Data/Orders";
import { editUser, getUsers, subscribeUser } from "../../db/Data/Users";
import AdressItem from "../items/AdressItem";
export default function Adress({ navigation, route }) {
  const item = route.params;
  const cartt = item.cart;
  const total = item.total;
  const [adress, setAdress] = useState([]);
  const [isSelected, setSelected] = useState("");
  const [newA, setNewA] = useState("");
  const auth = getAuth();
  const userr = auth.currentUser;
  const getAdress = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      let adress = user1[0].adress;
      let adress2 = [];
      for (let i = 0; i < adress.length; i++) {
        adress2[i] = { adress: adress[i], isSelected: false };
      }
      setAdress(adress2);
      console.log(adress2);
    });
  };
  useEffect(() => {
    getAdress();
  }, []);

  useEffect(() => {
    const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
      if (change.type === "added") {
        getAdress();
      }
      if (change.type === "modified") {
        getAdress();
      }
      if (change.type === "removed") {
        getAdress();
      }
    });

    return () => {
      unsubscribeUser();
    };
  }, []);
  const Cash = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      let money = user1[0].money;
      let sold = user1[0].sold;
      console.log("soled ", cartt);
      let carr = cartt;
      addOrder({order:cartt,adress:isSelected,client:user1[0].name,clientId:user1[0].id,cost:total});
      editUser({
        ...user1[0],
        money: money - total,
        cart: [],
        sold: [...carr, ...sold],
      }).then(navigation.navigate("Cart"));
    });
  };
  const AddAdress = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      let adress = user1[0].adress;
      adress[adress.length] = newA;
      
      editUser({
        ...user1[0],
        adress: adress,
      });
    });
  };
  return (
    <View>
      
      <View style={styles.inpp}>
        <View style={styles.input}>
          <TextInput onChangeText={setNewA} placeholder="New Adress" />
        </View>
        <Button title="Add" color="#000" onPress={() => AddAdress()} />
      </View>
      <Button title="cash" color="#000" onPress={() => Cash()} />
      <ScrollView>
        <FlatList
          data={adress}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Text>{item.adress}</Text>
              <RadioButton
                value={item.adress}
                status={isSelected === item.adress ? "checked" : "unchecked"}
                onPress={() => setSelected(item.adress)}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    width: 200,
    backgroundColor: "white",
  },
  inpp: {
    flexDirection: "row",
  },
});