import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { subscribeUser } from "../../db/Data/Users";
import { useEffect, useState } from "react";
import React from "react";
import Slideshow from "react-native-image-slider-show";
import { getUserById } from "../../db/Data/Users";
import { editCity } from "../../db/Data/products";
import { editUser } from "../../db/Data/Users";
import { getAuth } from "firebase/auth";
export default function Product({ navigation, route }) {
  let item = route.params.item;

  const auth = getAuth();

  const userr = auth.currentUser;
  const [liked, setLiked] = useState(item.liked);
  const liked1 = [...liked];
  const [flag, setFlage] = useState();
  const [cartI, setCartI] = useState();
  const [cart, setCart] = useState([]);
  //let isInCart = route.params.isInCart;
  const [curLike, setCurLike] = useState(
    liked1.filter((e) => userr.email == e)
  );
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
  
  const unsubLike = async () => {
    if (curLike[0] == userr.email) setFlage(false);
    else setFlage(true);
  };
  useEffect(async () => {
    await unsubLike();
  }, []);
  const Like = () => {
    if (flag) {
      editCity({ ...item, liked: [...liked, userr.email] });
      setFlage(false);
      getUserById(userr.uid).then((user) => {
        const user1 = user;
        const fav = user1[0].favourite;
        editUser({ ...user1[0], favourite: [...fav, item] });
      });
    } else {
      let arr = liked.filter((e) => e != userr.email);
      editCity({ ...item, liked: arr });
      setFlage(true);
      getUserById(userr.uid).then((user) => {
        const user1 = user;
        const fav = user1[0].favourite;
        let arr2 = fav.filter((e) => e.id != item.id);
        editUser({ ...user1[0], favourite: [...arr2] });
      });
    }
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
  
  return (
    <View style={styles.page}>
      <Image
        source={require("../../assets/megan.png")}
        style={{ width: 80, height: 80, alignSelf: "center", marginTop: "5%" }}
      />
      <ScrollView>
        <View style={styles.slide}>
          <Slideshow
            dataSource={[
              {
                url: item.image,
              },
              {
                url: item.image2,
              },
              {
                url: item.image3,
              },
            ]}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.font}>Name: {item.name} </Text>
          <Text style={styles.font}>Price: $ {item.price}</Text>
          <Text style={styles.font}>Description:</Text>
          <Text style={{ fontSize: 17 }}>{item.description}</Text>
        </View>
        <View style={styles.button}>
          <View style={{ flexDirection: "row" }}>
            {cartI ? (
              <View style={styles.pp2}>
                <TouchableOpacity
                  onPress={() => {
                    addCart(item), isInCart();
                  }}
                >
                  <Image
                    source={require("../../assets/shopping-cart (2).png")}
                    style={{ width: 25, height: 25, margintop: "5%" }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingTop: "5%",
                      color: "#F9FFB7",
                    }}
                  >
                    Delet from Cart
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.pp}>
                <TouchableOpacity
                  onPress={() => {
                    addCart(item), isInCart();
                  }}
                >
                  <Image
                    source={require("../../assets/shopping-cart (1).png")}
                    style={{ width: 25, height: 25, margintop: "5%" }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingTop: "5%",
                      color: "#F9FFB7",
                    }}
                  >
                    Add to The Cart
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.react}>
            <TouchableOpacity onPress={() => Like()}>
              {flag ? (
                <Image
                  source={require("../../assets/heart.png")}
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                />
              ) : (
                <Image
                  source={require("../../assets/heart (1).png")}
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#E7E9EB",
    marginBottom: "5%",
  },
  font: {
    fontSize: 25,
  },
  button: {
    marginLeft: "5%",
    marginTop: "5%",
    // textAlign: "center",
    flexDirection: "row",
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
  },
  pp2: {
    width: "100%",
    borderRadius: 20,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  react: {
    marginTop: "5%",
  },
  slide: {
    width: "100%",
    borderColor: "#fff",
    borderWidth: 2,
    marginTop: "5%",
  },
});
