import { View, Text, Button, TextInput ,FlatList ,Image } from "react-native";
import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
  deleteCity,
  subscribe,
} from "../../db/cities/cities";
import Pitem from "../items/Pitem";


export default function Bed({ navigation,route }){
    
    let cities = route.params.cities;
    const bed = cities.filter((e)=>e.type=="bed");
    return(
        <View
        style={{
          height:550,
        }}>
    <FlatList 
      data={bed}
      keyExtractor={cities.id}
      renderItem={({item})=>(
        <Pitem navigation={navigation} item = {item}  />
        )}
    />
  </View>
    );
};