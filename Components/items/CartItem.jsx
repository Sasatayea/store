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

export default function CartItem({ navigation, item, delet, plus, minus }) {
  const [count, setCount] = useState(1);

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
            <Text style={styles.shadowText}> ${item.price}</Text>
          </TouchableOpacity>
          <Text> </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.button}>
              <TouchableOpacity
                title="Delete"
                color="red"
                onPress={() => delet(item.id)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    // paddingTop: "5%",
                    color: "#F9FFB7",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={{ height: "60%" }}>
                <Button
                  title="+"
                  color="blue"
                  onPress={() => {
                    setCount(count + 1);
                    plus(count, item);
                  }}
                />
              </View>
              <Text>{count}</Text>
              {count == 1 ? (
                <TouchableOpacity onPress={() => delet(item.id)}>
                  <Image
                    source={require("../../assets/delete.png")}
                    style={{ width: 25, height: 30, margintop: "5%" }}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{ height: "60%" }}>
                  <Button
                    title="-"
                    color="blue"
                    onPress={() => {
                      if (count > 0) setCount(count - 1);
                      minus(count, item);
                    }}
                  />
                </View>
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
  },
  row: {
    flexDirection: "row",
    borderRadius: 20,
    height: "50%",
    marginTop: "5%",
  },
  card: {
    marginLeft: "1%",
    backgroundColor: "#E7E9EB",
    borderRadius: 8,
    paddingVertical: "5%",
    // paddingHorizontal: "3%",
    width: 170,
    height: 300,
    marginLeft: "2%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // shadowText: {
  //   shadowColor: "black",
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
  button: {
    width: "40%",
    borderRadius: 20,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    flexDirection: "row",
    marginLeft: "5%",
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
