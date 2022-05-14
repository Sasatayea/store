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

export default function Cart({ route, navigation }) {

  const auth = getAuth();
  const userr = auth.currentUser;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [buy, setBuy] = useState("");

  const getCartList = async () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const ucart = user1[0].cart;
      setCart(ucart);
    });
  };
  useEffect(() => {
    getCartList();
  }, []);

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
    console.log("total :",total);
  };
  const minus = (count, item) => {
    if (count > 0) {
      let price = parseInt(item.price);
      setTotal(total - price);
      console.log("total :",total);
    }
  };
  const Cash = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      let money = user1[0].money;
      let sold = user1[0].sold;
      console.log("soled " , sold)
      let carr = cart ;
      if (money >= total) {
        editUser({ ...user1[0], money: money - total,cart:[], sold:[...carr  ,...sold]});
        setTotal(0);
        console.log("total :",total);
      } else {
        setBuy("You don't have enough money ");
        alert("You don't have enough money  ");
      }
    });
  };
  return (
    <View style={styles.item}>
      <Text style={{marginTop:10 , fontSize: 16, fontWeight: "bold" }}>Selected Items</Text>
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

      <Text style={{fontSize:24}}>total price = {total}</Text>
      <View style={styles.button}>
        <Button title="cash" color="#000" onPress={() => Cash()} />
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
    // flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 15,
  },
});
