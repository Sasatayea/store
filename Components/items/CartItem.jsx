import { StyleSheet, Text, View, TouchableOpacity,Button, TextInput  ,Image } from "react-native";
import { editCity } from "../../db/cities/Cities";
import { getAuth } from "firebase/auth";
import { useState ,useEffect } from "react";
import {
  addCity,
  addCart,
  deleteCart,
  subscribe
} from "../../db/cities/Cities";
export default function CartItem({ navigation ,item }) {
    const [productsCart, setProductsCart] = useState([]);  
    
    const auth = getAuth();
    const userr = auth.currentUser;
    

    if (userr !== null) {
      const email = userr.email;
      console.log("ssssssssss",email);
  return (
    <View
          style={styles.content}
          >
          <TouchableOpacity onPress={() =>navigation.navigate('product',{item:item})} >
            <Image style = {{height:100,width:100, margin:10}} source={{uri:item.image}}></Image>
            <Text> {item.name} </Text>
            <Text>$ {item.price}</Text>
          </TouchableOpacity>
          {/* <Button title="Delete" onPress={() => deleteCity(item.id)} /> */}
          {/* <Button title="Add to char" onPress={()=>AddToCart(item.id)}/> */}
          <Button
          title="dellet"
          onPress={() =>
            deleteCart(item.id)
          }
        />
        </View>
  );
        }
}

const styles = StyleSheet.create({
  content: {
    
        height:200,
        width:200 ,
        backgroundColor:'red',
        margin:10,
        
  },
});
