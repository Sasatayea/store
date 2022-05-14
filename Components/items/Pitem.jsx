import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { addCity, editCity, getCities } from "../../db/Data/products";
import { editUser, getUserById } from "../../db/Data/Users";

export default function Pitem({ navigation, item }) {
  const unsubLike = async () => {
    if (curLike[0] == userr.email) setFlage(false);
    else setFlage(true);
  };
  useEffect(async () => {
    await unsubLike();
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const ucart = user1[0].cart;
      setCart(ucart);
    });
  }, []);

  const auth = getAuth();

  const userr = auth.currentUser;

  const [liked, setLiked] = useState(item.liked);
  const [cart, setCart] = useState([]);
  const liked1 = [...liked];

  const [curLike, setCurLike] = useState(
    liked1.filter((e) => userr.email == e)
  );
  const [flag, setFlage] = useState(curLike[0] == userr.email);

  if (userr !== null) {
    const email = userr.email;

    const Like = () => {
      if (flag) {
        editCity({ ...item, liked: [...liked, email] });
        setFlage(false);
      } else {
        let arr = liked.filter((e) => e != email);

        console.log(arr);
        editCity({ ...item, liked: arr });
        setFlage(true);
      }
    };
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
        }
      });
    };

    return (
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Product", { item: item })}
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
            <Text style = {{fontWeight:"bold",}}> {item.name} </Text>
            {item.size ? (
              <Text style = {{fontWeight:"bold",}}> {item.size}</Text>
            ) : (
              <Text> </Text>
            )}
            <Text style = {{fontWeight:"bold",}}> $ {item.price}</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <View style={styles.pp}>
            <TouchableOpacity onPress={() => addCart(item)}>
              <View
                style={{
                  borderRadius: 20,
                  height: 40,
                  width: 120,
                  backgroundColor: "#0D1F2B",
                }}
              >
                <Text
                  style={{
                    fontWeight:"bold",
                    color: "white",
                    marginTop: 8,
                  }}
                >
                  Add To Cart
                </Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.react}>
            <TouchableOpacity onPress={() => Like()}>
              {flag ? (
                <Image
                  source={require("../../assets/like.png")}
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                />
              ) : (
                <Image
                  source={require("../../assets/like (1).png")}
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                />
              )}
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#000",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  button: {
    marginLeft: "5%",
    marginTop: "5%",
    // textAlign: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 10,
    //fontWeight: 600,
    textTransform: "uppercase",
  },

  heading: {
    fontSize: 18,
    //fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    marginRight: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    paddingVertical: "5%",
    //paddingHorizontal: "3%",
    width: 170,
    height: 300,
    marginVertical: 10,
  },
  button: {
    textAlign: "center",
    flexDirection: "row",
    
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  shadowText: {
    fontStyle: "italic",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",
    
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#011F26",
  },
  react: {
    marginTop: "5%",
  },
});
