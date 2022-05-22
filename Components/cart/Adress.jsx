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
  Image,
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
  const [error2, setError2] = useState("");
  const [newA, setNewA] = useState("");
  const [error, setError] = useState("");
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
    if (isSelected != "") {
      if (total != 0) {
        getUserById(userr.uid).then((user) => {
          const user1 = user;
          let money = user1[0].money;
          let sold = user1[0].sold;
          console.log("soled ", cartt);
          let carr = cartt;
          addOrder({
            order: cartt,
            adress: isSelected,
            client: user1[0].name,
            clientId: user1[0].id,
            cost: total,
          });
          editUser({
            ...user1[0],
            money: money - total,
            cart: [],
            sold: [...carr, ...sold],
          }).then(navigation.navigate("Cart"));
        });
      } else {
        setError("The cart is emtpty");
      }
    } else {
      setError2("Please choose an adress");
    }
  };
  const AddAdress = () => {
    if (newA.length > 12) {
      getUserById(userr.uid).then((user) => {
        const user1 = user;
        let adress = user1[0].adress;
        adress[adress.length] = newA;

        editUser({
          ...user1[0],
          adress: adress,
        });
      });
    } else {
      setError("The adress should be at least 13 character");
    }
  };
  return (
    <View>
      <Image
        source={require("../../assets/megan.png")}
        style={{
          width: 80,
          height: 80,
          alignSelf: "center",
          marginTop: "1%",
        }}
      />
      <View style={styles.inpp}>
        <View style={styles.input}>
          <TextInput onChangeText={setNewA} placeholder="New Adress" />
        </View>
        <View style={styles.pp2}>
          <TouchableOpacity
            title="Add"
            color="#000"
            onPress={() => AddAdress()}
          >
            <Text
              style={{
                fontWeight: "bold",
                // paddingTop: "5%",
                color: "#F9FFB7",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>{error}</Text>
      <View style={{ marginLeft: "33%", marginTop: "5%" }}>
        <View style={styles.pp}>
          <TouchableOpacity title="cash" color="#000" onPress={() => Cash()}>
            <Text
              style={{
                fontWeight: "bold",
                // paddingTop: "5%",
                fontSize: 17,
                color: "#F9FFB7",
              }}
            >
              Cash
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{}}>
        <Text style={{ fontSize: 15, color: "red", paddingLeft: "30%" }}>
          {error2}
        </Text>
      </View>
      <ScrollView>
        <FlatList
          data={adress}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                marginLeft: "5%",
                marginTop: "5%",
                marginRight: "5%",
                backgroundColor: "#E7E9EB",
                borderRadius: 18,
              }}
            >
              <Text style={{ marginTop: "2%", paddingLeft: "3%" }}>
                {item.adress}
              </Text>
              <View style={{ marginLeft: "50%" }}>
                <RadioButton
                  value={item.adress}
                  status={isSelected === item.adress ? "checked" : "unchecked"}
                  onPress={() => setSelected(item.adress)}
                />
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderRadius: 20,

    borderWidth: 2,
    borderColor: "black",
    paddingLeft: "3%",
    paddingTop: "2%",
    width: 250,
    backgroundColor: "white",
  },
  inpp: {
    marginLeft: "6%",
    marginTop: "5%",
    flexDirection: "row",
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",

    width: "40%",
    borderRadius: 20,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2DCCA9",
    flexDirection: "row",
    marginLeft: "5%",
  },
  pp2: {
    // marginTop: "90%",
    // marginLeft: "10%",

    width: "20%",
    borderRadius: 20,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2DCCA9",
    flexDirection: "row",
    marginLeft: "5%",
  },
});
