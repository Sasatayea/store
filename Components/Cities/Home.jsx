import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Image,
  Picker,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { getCities, subscribe } from "../../db/Data/products";

import Pitem from "../items/Pitem";

const Home = ({ navigation }) => {

  const getProduct = async () => {
    const c = await getCities();
    await setproduct(c);
    // console.log("products", c);
  };

  useEffect(async () => {
    await getProduct();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        getProduct();
      }
      if (change.type === "modified") {
        getProduct();
      }
      if (change.type === "removed") {
        getProduct();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [product, setproduct] = useState([]);

  const [selectedValue, setSelectedValue] = useState("All");

  let dataa = product.filter((e) => e.type == selectedValue);
  if (selectedValue == "All") {
    dataa = product;
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: 150,
            // backgroundColor: "red",
            borderWidth: 2,
          }}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
          }}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="chair" value="chair" />
          <Picker.Item label="bed" value="bed" />
          <Picker.Item label="sofa" value="sofa" />
        </Picker>
      </View>

      <View style={styles.items}>
        <FlatList
          data={dataa}
          numColumns={2}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({ item }) => (
            <Pitem navigation={navigation} item={item} />
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  search: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  items: {
    // paddingTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
