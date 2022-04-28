import { View, Text, Button, TextInput ,FlatList ,Image } from "react-native";
import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
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
    console.log("cities", c);
  };
  
  useEffect(() => {
    getCitiesList();
    
  }, []);
  
  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      //   console.log("changes", change, snapshot, change.type);
      // if (snapshot.metadata.hasPendingWrites) {
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
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

  const [cartt, setCartt] = useState([]);
  const sasa ='sss';
  const AddToCart = (id)=>{
    setCartt ((prevCart)=>{
        return [
          cities.filter(iteem => iteem.id == id),
          ...prevCart
          ];
      })
    }
    
    const showCart =()=> {
      return cartt ;
    }
  console.log(cartt);
  
//const bed = cities.filter((e)=>e.type=="dolab");

  return (
    <View>
      <Button
        title="cart"
        onPress={() => navigation.navigate('cart', {itemId:cartt} )}
      />
      <View
          style={{
            height:550,
          }}>
      <FlatList 
        data={cities}
        keyExtractor={cities.id}
        renderItem={({item})=>(
          <Pitem navigation={navigation} item = {item} AddToCart={AddToCart} />
          )}
      />
    </View>
  </View>
    
  );
};

export default CitiesList;