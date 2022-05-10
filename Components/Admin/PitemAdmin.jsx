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
      <TouchableOpacity onPress={()=>navigation.navigate("Edit",{item:item})}>
        <Image
          style={{ height: 150, width: 150, margin: 10 }}
          source={{ uri: item.image }}
        ></Image>
        <Text> {item.name} </Text>
        <Text>$ {item.price}</Text>
        <View style={styles.button}>
          <Button
            title="Delet"
            color="#000"
            onPress={() => deleteCity(item.id)}
          />
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
    borderRadius: 200,
    flex: 1,
    padding: 20,
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
