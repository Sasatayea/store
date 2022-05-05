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
<<<<<<< HEAD
=======
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
    borderRadius: 200,
    // flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 10,
    //fontWeight: 600,
    textTransform: "uppercase",
  },
>>>>>>> f205de3c440b3d41af6adb724318e6c04fea2702

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
