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

import { deleteCart, getCart } from "../../db/cities/cities";
import CartItem from "../items/CartItem";
import { getAuth } from "firebase/auth";
import { subscribeCart } from "../../db/cities/cities";
import { editUser, getUsers, subscribeUser } from "../../db/cities/users";

export default function Cart({ route, navigation }) {
  //const { itemId, otherParam } = route.params;
  const auth = getAuth();
  const userr = auth.currentUser;
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([]);
  const [cashdata, setCashData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [buy, setBuy] = useState("");
  const getCartsList = async () => {
    const c = await getCart();
    setCart(c);
    console.log("carts: ", c);
  };
  const getUsersList = async () => {
    const u = await getUsers();
    setUsers(u);
    console.log("users: ", u);
  };
  useEffect(() => {
    getCartsList();
    getUsersList();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeCart(({ change, snapshot }) => {
      if (change.type === "added") {
        getCartsList();
      }
      if (change.type === "modified") {
        getCartsList();
      }
      if (change.type === "removed") {
        getCartsList();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeCart(({ change, snapshot }) => {
      if (change.type === "added") {
        getCartsList();
      }
      if (change.type === "modified") {
        getCartsList();
      }
      if (change.type === "removed") {
        getCartsList();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
      if (change.type === "added") {
        getUsersList();
      }
      if (change.type === "modified") {
        getUsersList();
      }
      if (change.type === "removed") {
        getUsersList();
      }
    });

    return () => {
      unsubscribeUser();
    };
  }, []);

  const Cash = () => {
    let dataa = cart.filter((e) => e.username == userr.email);
    const cartmoney = dataa.map((e) => e.price);
    let user = users.filter((e) => e.email == userr.email);
    let total = 0;
    for (let i = 0; i < cartmoney.length; i++) {
      total += parseInt(cartmoney[i]);
    }
    if (user[0].money >= total) {
      setBuy("");
      let usermoney = 0;

      usermoney = user[0].money;
      editUser({ ...user[0], money: parseInt(usermoney) - total, sold: dataa });

      for (let j = 0; j < dataa.length; j++) {
        deleteCart(dataa[j].id);
      }
    } else {
      setBuy("You don't have enough money  ي شحات");
      alert("You don't have enough money  ي شحات");
    }
  };
  if (userr !== null) {
    const email = userr.email;
    let dataa = cart.filter((e) => e.username == email);
    if (toggle) {
      setCashData(dataa);
      setToggle(false);
    }

    return (
      <View style={styles.item}>
        <FlatList
          data={dataa}
          keyExtractor={cart.id}
          renderItem={({ item }) => (
            <CartItem navigation={navigation} item={item} />
          )}
        />
        <Button title="cash" onPress={() => Cash()} />
        <Text>{buy}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    height: 200,
    width: 200,
    backgroundColor: "red",
    margin: 10,
  },
  item: {
    flex: 1,
  },
});
