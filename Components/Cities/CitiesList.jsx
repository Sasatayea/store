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
const CitiesList = ({ navigation }) => {
  const getCitiesList = async () => {
    const c = await getCities();
    await setCities(c);
    console.log("products", c);
  };

  useEffect(async() => {
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
  const [searchItem, setsearchItem] = useState("");
  const [dataa, setDataa] = useState(cities);
  const [toggle, setToggle] = useState(true);
  console.log("myci: ",cities);
  
  if (toggle) {
    if (selectedValue == "All") {
      setDataa(cities);
      console.log(cities);
    } else {
      setDataa(cities.filter((e) => e.type == selectedValue));
    }
      setToggle(false);

  }

  
  const search = (searchItem) => {
    let x = [];
    let s = "";
    let h =0 ;
    for (let i = 0; i < cities.length; i++) {

        s = cities[i].name; 
        if (s.match(searchItem)){
          if(s.match(searchItem).input!=null){
          x[h] = s.match(searchItem).input;
            h++;
          }
        };
    
    }
    console.log("match2: ", x);
    let k =0;
    let data = [];
    for (let i = 0; i < cities.length; i++) {
      const ddd = cities[i].name ;
      for (let j = 0; j < x.length; j++) {
        if( ddd == x[j]){
          data[k] = cities[i];
          k++;
          console.log("match: ", data[j]);
        
      }
        
        
      }
    }
    console.log("x:", data);
    setDataa(data);
  };

  return cityToEdit ? (
    <EditCity city={cityToEdit} onSave={() => setCityToEdit(undefined)} />
  ) : (
    <View>
      <Button title="cart" onPress={() => navigation.navigate("cart")} />

      <View style={styles.container}>
        <TextInput
          onChangeText={(e)=>{setsearchItem(e),search(e)}}
          //onChange ={()=>search(searchItem)}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
        <Button title="search" onPress={() => search(searchItem)} />
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue), setToggle(true);
          }}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="chair" value="chair" />
          <Picker.Item label="bed" value="bed" />
          <Picker.Item label="sofa" value="sofa" />
        </Picker>
      </View>

      <View
        style={{
          height: 550,
        }}
      >
        <FlatList
          data={dataa}
          keyExtractor={cities.id}
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
  container: {
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
