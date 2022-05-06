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
import { addCity, addCart, editCity, getCities } from "../../db/cities/cities";
import { subscribe } from "../../db/cities/cities";
import { async } from "@firebase/util";
export default function Pitem({ navigation, item }) {
  const unsubLike = async () => {
    if (curLike[0] == userr.email) setFlage(false);
    else setFlage(true);

  };
  useEffect(async () => {
    await unsubLike();
  }, []);

  const auth = getAuth();
  
  const userr = auth.currentUser;

  
  const [liked, setLiked] = useState(item.liked);
  const liked1 = [...liked];
  const [curLike, setCurLike] = useState(liked1.filter((e) => userr.email == e));
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
    flexDirection: "row",
    borderRadius: 200,
    padding: 15,
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

    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: 200,
    height: 335,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
