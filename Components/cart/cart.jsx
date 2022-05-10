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
  const [users, setUsers] = useState([]);
  const [cashdata, setCashData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [buy, setBuy] = useState("");

  const getCartList = async () => {
    getUserById(userr.uid).then((user)=>{
      const user1 = user;
      const ucart = user1[0].cart;
      setCart(ucart);
    })
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

  const delet = (id)=>{
    let carttt = cart.filter((e)=>(e.id != id));

    getUserById(userr.uid).then((user)=>{
      const user1 = user;
      editUser({...user1[0],cart:carttt});
    })
    
  }

  // const Cash = () => {
  //   let dataa = cart.filter((e) => e.username == userr.email);
  //   const cartmoney = dataa.map((e) => e.price);
  //   let user = users.filter((e) => e.email == userr.email);
  //   let total = 0;
  //   for (let i = 0; i < cartmoney.length; i++) {
  //     total += parseInt(cartmoney[i]);
  //   }
  //   if (user[0].money >= total) {
  //     setBuy("");
  //     let usermoney = 0;

  //     usermoney = user[0].money;
  //     editUser({ ...user[0], money: parseInt(usermoney) - total, sold: dataa });

  //     for (let j = 0; j < dataa.length; j++) {
  //       deleteCart(dataa[j].id);
  //     }
  //   } else {
  //     setBuy("You don't have enough money  ي شحات");
  //     alert("You don't have enough money  ي شحات");
  //   }
  // };
  // if (userr !== null) {
  //   const email = userr.email;
  //   let dataa = cart.filter((e) => e.username == email);
  //   if (toggle) {
  //     setCashData(dataa);
  //     setToggle(false);
  //   }

    return (
      <View style={styles.item}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Selected Items</Text>
        <FlatList
          data={cart}
          keyExtractor={cart.id}
          numColumns={2}
          renderItem={({ item }) => (
            <CartItem navigation={navigation} item={item} delet={delet} />
          )}
        />
        <View style={styles.button}>
          {/* <Button title="cash" color="#000" onPress={() => Cash()} /> */}
          <Text>{buy}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // borderRadius: 100,
    // flex: 1,
    padding: 15,
  },
});
