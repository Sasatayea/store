import { StyleSheet, Text, View, TouchableOpacity,Button, TextInput  ,FlatList } from "react-native";
import { useState ,useEffect } from "react";
import { ScrollView } from "react-native-web";
import {
    getCart,
    } from "../../db/cities/cities";
  import CartItem from "../items/CartItem";
  import { getAuth } from "firebase/auth";

  export default function cart({ route,navigation }) {
    //const { itemId, otherParam } = route.params;
    const [cart, setCart] = useState([]);
    const getCartsList = async () => {
        const c = await getCart();
        setCart(c);
        console.log("carts", c);
      };
      useEffect(() => {
        getCartsList();
      }, []);
      
      const auth = getAuth();
      const userr = auth.currentUser;
      if (userr !== null) {
        const email = userr.email;
        let dataa = cart.filter((e)=>e.username == email);

    return (
    <View> 
        <Text>heloll</Text> 
        <FlatList 
        data={dataa}
        keyExtractor={cart.id}
        renderItem={({item})=>(
          <CartItem navigation={navigation} item = {item} />
          )}
      />
    </View>
    );}
}

const styles = StyleSheet.create({
    content: {
        height:200,
        width:200 ,
        backgroundColor:'red',
        margin:10,
        
    },
});
