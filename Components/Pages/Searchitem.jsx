import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from "react-native";

import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { addCity, editCity, getCities } from "../../db/Data/products";
import { editUser, getUserById, subscribeUser } from "../../db/Data/Users";

export default function Searchitem({ navigation, item }) {
  const [count, setCount] = useState(0);

  const auth = getAuth();

  const userr = auth.currentUser;

  const [cartI, setCartI] = useState();
  const [cart, setCart] = useState([]);
  //let isInCart = route.params.isInCart;

  const addCart = async (item) => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const ucart = user1[0].cart;
      let flag = true;
      for (let i = 0; i < ucart.length; i++) {
        if (ucart[i].id == item.id) flag = false;
      }
      if (flag) {
        setCart([...ucart, item]);
        editUser({ ...user1[0], cart: [...ucart, item] });
      } else {
        let arr = ucart.filter((e) => e.id != item.id);
        setCart([...arr]);
        editUser({ ...user1[0], cart: [...arr] });
      }
    });
  };
  const isInCart = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const ucart = user1[0].cart;
      setCartI(false);
      for (let i = 0; i < ucart.length; i++) {
        if (ucart[i].id == item.id) {
          setCartI(true);
        }
      }
    });
  };

  useEffect(() => {
    const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
      if (change.type === "added") {
        isInCart();
      }
      if (change.type === "modified") {
        isInCart();
      }
      if (change.type === "removed") {
        isInCart();
      }
    });

    return () => {
      unsubscribeUser();
    };
  }, []);

  if (userr !== null) {
    const email = userr.email;
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Product", {
                item: item,
              })
            }
          >
            <Image
              style={{
                height: 150,
                width: 150,
                borderRadius: 20,
                alignSelf: "center",
              }}
              source={{ uri: item.image }}
            ></Image>
            <Text style={{ fontWeight: "bold" }}> {item.name} </Text>
            {item.size ? (
              <Text style={{ fontWeight: "bold" }}>{item.size}</Text>
            ) : (
              <Text> </Text>
            )}
            <Text style={{ fontWeight: "bold" }}> $ {item.price}</Text>
          </TouchableOpacity>
          <Text> </Text>
          <View style={styles.button}>
            <View style={{ flexDirection: "row" }}>
              {cartI ? (
                <TouchableOpacity
                  onPress={() => {
                    addCart(item), isInCart();
                  }}
                >
                  <View style={styles.pp2}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        // paddingTop: "5%",
                        color: "#F9FFB7",
                      }}
                    >
                      Delete
                    </Text>
                    <Image
                      source={require("../../assets/shopping-cart (2).png")}
                      style={{ width: 25, height: 25, margintop: "5%" }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    addCart(item), isInCart();
                  }}
                >
                  <View style={styles.pp}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        // paddingTop: "5%",
                        color: "#F9FFB7",
                      }}
                    >
                      Add to
                    </Text>
                    <Image
                      source={require("../../assets/shopping-cart (1).png")}
                      style={{ width: 25, height: 25, margintop: "5%" }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
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
  card: {
    marginRight: 10,
    backgroundColor: "#E7E9EB",
    borderRadius: 8,
    paddingVertical: "5%",
    // paddingHorizontal: "3%",
    width: 175,
    height: 300,
    marginVertical: 10,
  },
  // button: {
  //   textAlign: "center",
  //   flexDirection: "row",
  // },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",

    width: "100%",
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
    width: "100%",
    borderRadius: 20,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    flexDirection: "row",
    marginLeft: "5%",
  },
  button: {
    marginLeft: "20%",

    // textAlign: "center",
    width: "50%",
    flexDirection: "row",
  },
});
