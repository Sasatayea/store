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
import CartItem from "../items/CartItem";
import { getAuth } from "firebase/auth";
import { subscribeCart } from "../../db/Data/products";
import { editUser, getUsers, subscribeUser } from "../../db/Data/Users";
import { async } from "@firebase/util";

export default function Cart({ route, navigation }) {
  const [cart, setCart] = useState([]);
  const getCartList = async () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const ucart = user1[0].cart;
      setCart(ucart);
    });
  };
  useEffect(async () => {
    await getCartList();
  }, []);
  const [total, setTotal] = useState(0);
  const init = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const ucart = user1[0].cart;
      let t = 0;
      for (let i = 0; i < ucart.length; i++) {
        t += parseInt(ucart[i].price);
      }
      setTotal(t);
      console.log(t);
    });
  };
  useEffect(async () => {
    await init();
  }, []);
  const auth = getAuth();
  const userr = auth.currentUser;

  const [buy, setBuy] = useState("");

  useEffect(() => {
    const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
      if (change.type === "added") {
        getCartList();
      }
      if (change.type === "modified") {
        getCartList();
      }
      if (change.type === "removed") {
        getCartList();
      }
    });

    return () => {
      unsubscribeUser();
    };
  }, []);

  const delet = (id) => {
    let carttt = cart.filter((e) => e.id != id);

    getUserById(userr.uid).then((user) => {
      const user1 = user;
      editUser({ ...user1[0], cart: carttt });
    });
  };
  const plus = (count, item) => {
    let price = parseInt(item.price);
    setTotal(total + price);
    console.log("total :", total);
  };
  const minus = (count, item) => {
    if (count > 0) {
      let price = parseInt(item.price);
      setTotal(total - price);
      console.log("total :", total);
    }
  };
  const Cash = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      let money = user1[0].money;
      if (money >= total) {
        navigation.navigate("Adress", { total: total, cart: cart });
        //editUser({ ...user1[0], money: money - total,cart:[], sold:[...carr  ,...sold]});
        console.log("total :", total);
      } else {
        setBuy("You don't have enough money ");
        alert("You don't have enough money  ");
      }
    });
  };
  return (
    <View style={styles.item}>
      <Text
        style={{
          marginTop: "5%",
          fontSize: 16,
          fontWeight: "bold",
          paddingLeft: "35%",
        }}
      >
        Selected Items
      </Text>
      <FlatList
        data={cart}
        keyExtractor={cart.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CartItem
            navigation={navigation}
            item={item}
            delet={delet}
            minus={minus}
            plus={plus}
          />
        )}
      />

      <Text style={{ fontSize: 22, fontWeight: "bold", paddingLeft: "22%" }}>
        Total price = {total}
      </Text>
      <View style={styles.button}>
        <TouchableOpacity title="cash" color="#000" onPress={() => Cash()}>
          <Text
            style={{
              fontWeight: "bold",
              // paddingTop: "5%",
              color: "#F9FFB7",
            }}
          >
            Cash
          </Text>
        </TouchableOpacity>
      </View>
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
    alignSelf: "stretch",
    backgroundColor: "#fff",

    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  button: {
    width: "25%",
    borderRadius: 20,
    height: 50,
    marginLeft: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2DCCA9",
    flexDirection: "row",
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