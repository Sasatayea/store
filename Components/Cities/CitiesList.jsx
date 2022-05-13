import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Image,
  Picker,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import { getCities, subscribe } from "../../db/cities/cities";
import { subscribeUser } from "../../db/cities/users";
import Pitem from "../items/Pitem";

const CitiesList = ({ navigation }) => {
  const getCitiesList = async () => {
    const c = await getCities();
    await setCities(c);
    // console.log("products", c);
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

  const [selectedValue, setSelectedValue] = useState("All");

  let dataa = cities.filter((e) => e.type == selectedValue);
  if (selectedValue == "All") {
    dataa = cities;
    console.log("done");
  }

  return (
    // <ImageBackground
    //   source={require("../../assets/homePage.PNG")}
    //   resizeMode="cover"
    //   style={styles.heder}
    // >
    <View style={styles.container}>
      <View style={styles.search}>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/logo.PNG")}
        />
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pitem navigation={navigation} item={item} />
          )}
        />
      </View>
    </View>
  );
};

export default CitiesList;

const styles = StyleSheet.create({
  // heder: {
  //   height: "100%",
  //   width: "100%",
  //   // marginTop: "5%",
  // },
  container: {
    flex: 1,
    backgroundColor: "#D2D6DA",
    // marginTop: "5%",
  },
  search: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    paddingRight: "5%",
  },
  items: {
    // paddingTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
