import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { getCities } from "../../db/Data/products";
import PitemAdmin from "./PitemAdmin";
import { subscribe } from "../../db/Data/products";
import { useEffect, useState } from "react";
import { editCity } from "../../db/Data/products";
export default function EditP({ navigation }) {
  const getCitiesList = async () => {
    const c = await getCities();
    await setCities(c);
    console.log("products", c);
  };

  useEffect(async () => {
    await getCitiesList();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        getCitiesList();
      }
      if (change.type === "modified") {
        getCitiesList();
      }
      if (change.type === "removed") {
        getCitiesList();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [cities, setCities] = useState([]);

  return (
    <View>
      <Image
        source={require("../../assets/megan.png")}
        style={{
          width: 80,
          height: 80,
          alignSelf: "center",
          marginTop: "1%",
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("AddP")}>
        <View style={styles.pp}>
          <Text
            style={{
              fontWeight: "bold",
              // paddingTop: "5%",
              color: "#F9FFB7",
            }}
          >
            Add Product
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.items}>
        <FlatList
          data={cities}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <PitemAdmin navigation={navigation} item={item} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  items: {
    // paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",

    width: "70%",
    borderRadius: 20,
    height: 50,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2DCCA9",
    flexDirection: "row",
    marginLeft: "15%",
  },
});
