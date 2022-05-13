import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from "react-native";
import { editCity } from "../../db/cities/cities";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  addCity,
  addCart,
  deleteCart,
  subscribe,
} from "../../db/cities/cities";
export default function CartItem({ navigation, item }) {
  const [productsCart, setProductsCart] = useState([]);

  const auth = getAuth();
  const userr = auth.currentUser;

  if (userr !== null) {
    const email = userr.email;
    console.log("ssssssssss", email);
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Product", { item: item })}
          >
            <Image
              style={{ height: 150, width: 150, margin: 10 }}
              source={{ uri: item.image }}
            ></Image>
            <Text style={{ paddingLeft: "5%", fontWeight: "700" }}>
              {" "}
              {item.name}{" "}
            </Text>
            <Text style={{ paddingLeft: "5%", fontWeight: "700" }}>
              {" "}
              ${item.price}
            </Text>
          </TouchableOpacity>
          {/* <Button title="Delete" onPress={() => deleteCity(item.id)} /> */}
          {/* <Button title="Add to char" onPress={()=>AddToCart(item.id)}/> */}
          <View style={styles.button}>
            <View style={styles.pp}>
              <TouchableOpacity onPress={() => deleteCart(item.id)}>
                <Text style={{ color: "#fff" }}> Delete</Text>
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
    height: 200,
    width: 200,
    backgroundColor: "red",
    margin: 10,
  },
  card: {
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: "5%",
    // paddingHorizontal: "3%",
    width: 170,
    height: 300,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    flexDirection: "row",
    borderRadius: 200,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});
