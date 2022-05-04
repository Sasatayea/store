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
import { addCity, addCart } from "../../db/cities/cities";
export default function Pitem({ navigation, item }) {
  const [productsCart, setProductsCart] = useState([]);

  const auth = getAuth();
  const userr = auth.currentUser;

  if (userr !== null) {
    const email = userr.email;
    // console.log("ssssssssss", email);
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Product", { item: item })}
          >
            <Image
              style={{ height: 150, width: 150, margin: 10 ,borderRadius: 20 }}
              source={{ uri: item.image }}
            ></Image>
            <Text> {item.name} </Text>
            <Text>$ {item.price}</Text>
          </TouchableOpacity>
          
          <View style={styles.button}>
            <Button
              title="Add to char"
              color="#000"
              onPress={() =>
                addCart({
                  username: email,
                  name: item.name,
                  size: item.size,
                  type: item.type,
                  image: item.image,
                  price: item.price || "new city" + item.length,
                })
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  card: {
    marginRight: 10,

    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: "3%",
    width: 200,
    height: 335,
    marginVertical: 10,
  },
  button: {
    textAlign: 'center',
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
