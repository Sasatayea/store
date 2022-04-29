import { View, Text, Button, TextInput ,FlatList ,Image } from "react-native";
import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
  deleteCity,
  subscribe,
} from "../../db/cities/cities";
import Pitem from "../items/Pitem";


export default function Sofas({ navigation,route }){
    
    let cities = route.params.cities;
    const Sofa = cities.filter((e)=>e.type=="sofa");
    return(
        <View
        style={{
          height:550,
        }}>
    <FlatList 
      data={Sofa}
      keyExtractor={cities.id}
      renderItem={({item})=>(
        <Pitem navigation={navigation} item = {item}  />
        )}
    />
  </View>
    );
};