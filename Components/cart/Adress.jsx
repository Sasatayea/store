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
  const user1 = item.user1;
  const total = item.total;
  const [adress, setAdress] = useState(user1[0].adress);
  
  const [isSelected, setSelected] = useState("");
  const [newA, setNewA] = useState("");

  const Cash = () => {
  const carr = user1[0].cart ;
  const sold = user1[0].sold ;
  const money = user1[0].money ;
      addOrder({order:carr,adress:isSelected,client:user1[0],cost:total ,Accept :0});
      editUser({
        ...user1[0],
        money: money - total,
        cart: [],
        sold: [...carr, ...sold],
      }).then(navigation.navigate("Home"));
  };

  const AddAdress = () => {

    console.log("El user =>" ,user1[0].adress);
      let lastaddr = user1[0].adress ;
      editUser({
        ...user1[0],
        adress:[...lastaddr ,newA],
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
              <Text>{item}</Text>
              <RadioButton
                value={item}
                status={isSelected === item ? "checked" : "unchecked"}
                onPress={() => setSelected(item)}
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
