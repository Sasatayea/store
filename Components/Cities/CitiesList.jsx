import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Image,
  Picker,
  StyleSheet,
  Dimensions,
} from "react-native";

import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
  addCart,
  deleteCity,
  subscribe,
} from "../../db/cities/cities";
import { subscribeUser } from "../../db/cities/users";
import Pitem from "../items/Pitem";
import { editUser, getUsers } from "../../db/cities/users";
import image1 from "../../assets/loginn.png";
import EditCity from "./EditCity";
import { TouchableOpacity } from "react-native-web";
import { async } from "@firebase/util";
import { getCart } from "../../db/cities/cities";
const width = Dimensions.get("window").width;
const CitiesList = ({ navigation }) => {
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
  const [users, setUsers] = useState([]);
  const [cityToEdit, setCityToEdit] = useState(undefined);

  const [selectedValue, setSelectedValue] = useState("All");
  
  let dataa = cities.filter((e)=>e.type== selectedValue);
  if(selectedValue == "All"){
    dataa = cities ;
    console.log("done");
  }

  return cityToEdit ? (
    <EditCity city={cityToEdit} onSave={() => setCityToEdit(undefined)} />
  ) : (
    <View style={styles.container}>
      <View style={styles.search}>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: 150,
            backgroundColor: "#fff",
          }}
          onValueChange={(itemValue, itemIndex) => {
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
          renderItem={({ item }) => <Pitem item={item} />}
        />
        
      </View>
      
    </View>
  );
};

export default CitiesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  search: {
    // flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  items: {
    // paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
});
