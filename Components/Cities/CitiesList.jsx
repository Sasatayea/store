import { View, Text, Button, TextInput ,FlatList ,Image ,Picker ,StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
  addCart,
  deleteCity,
  subscribe,
} from "../../db/cities/cities";
import Pitem from "../items/Pitem";
import image1 from "../../assets/loginn.png";
import EditCity from "./EditCity";
import { TouchableOpacity } from "react-native-web";

const CitiesList = ({ navigation }) => {
  
  const getCitiesList = async () => {
    const c = await getCities();
    setCities(c);
    console.log("products", c);
  };
  
  useEffect(() => {
    getCitiesList();
    
  }, []);
  
  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      //   console.log("changes", change, snapshot, change.type);
      // if (snapshot.metadata.hasPendingWrites) {
      if (change.type === "added") {
        //console.log("New city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
        getCitiesList();
      }
      // }
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const [cities, setCities] = useState([]);
  
  const [cityToEdit, setCityToEdit] = useState(undefined);
  const [selectedValue, setSelectedValue] = useState("All");

  let dataa = cities.filter((e)=>e.type== selectedValue);
  //const [dataa, setDataa] = useState([]);
  //setDataa = cities.filter((e)=>e.type== selectedValue);
  if(selectedValue == "All"){
    dataa = cities ;
    console.log("done");
    }
    //console.log(selectedValue);

    return cityToEdit ? (
      <EditCity city={cityToEdit} onSave={()=>setCityToEdit(undefined)} />
    ) : (

    <View>

      <Button
        title="cart"
        onPress={() => navigation.navigate('cart')}
      />
    
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="chair" value="chair" />
        <Picker.Item label="bed" value="bed" />
        <Picker.Item label="sofa" value="sofa" />
      </Picker>
    </View>

      <View
          style={{
            height:550,
          }}>
      <FlatList 
        data={dataa}
        keyExtractor={cities.id}
        renderItem={({item})=>(
          <Pitem navigation={navigation} item = {item} />
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
    alignItems: "center"
  }
});