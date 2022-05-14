import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from "react-native";
import { editCity } from "../../db/Data/products";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

export default function CartItem({ navigation, item,delet,plus,minus }) {
  const [count, setCount] = useState(0);

  const auth = getAuth();
  const userr = auth.currentUser;

  if (userr !== null) {
    const email = userr.email;
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
            <Text style={styles.shadowText}> {item.name} </Text>
            <Text style={styles.shadowText}>$ {item.price}</Text>
          </TouchableOpacity>
          <Text>       </Text>
            <View style={{flexDirection:'row'}}>
            <View style={styles.button}>
            <Button
              title="Delete"
              color="red"
              onPress={() => delet(item.id)}
            />
          </View>
            <Button
              title="+"
              color="blue"
              onPress={() => {setCount(count+1); plus(count,item);}}
            />
          <Text>{count}</Text>

          <Button
              title="-"
              color="blue"
              onPress={() => {if(count>0)setCount(count-1); minus(count,item)}}
            />
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
  button: {
    flexDirection: "row",
    borderRadius: 200,
    alignItems: "center",
    marginRight:10 ,
    justifyContent: "center",
  },
  shadowText: {
    fontStyle: "italic",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
