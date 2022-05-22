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
import { deleteCity } from "../../db/Data/products";

import { useState, useEffect } from "react";

export default function PitemAdmin({ navigation, item }) {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit", { item: item })}
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
        <Text style={{ fontWeight: "bold" }}> ${item.price}</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => deleteCity(item.id)}>
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
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
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
    width: "50%",
    borderRadius: 200,
    flex: 1,
    marginLeft: "20%",
    marginTop: "5%",
  },
  text: {
    fontSize: 10,

    textTransform: "uppercase",
  },

  heading: {
    fontSize: 18,

    marginBottom: 13,
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
});
