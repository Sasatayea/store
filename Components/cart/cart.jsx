import { StyleSheet, Text, View, TouchableOpacity,Button, TextInput  ,FlatList } from "react-native";
import { useState ,useEffect } from "react";
import { ScrollView } from "react-native-web";
import {
    getCart,
  } from "../../db/cities/cities";
  import Pitem from "../items/Pitem";
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

    return (
    <View> 
        <Text>heloll</Text> 

        {/* <Text>{JSON.stringify(itemId)}</Text> */}
        {/* <ScrollView>
            {itemId.map((e,index)=>(
            <View key={index}>
                <Text>{e}</Text>
            </View>
            ))}
        </ScrollView> */}

        <FlatList 
        data={cart}
        keyExtractor={cart.id}
        renderItem={({item})=>(
          <Pitem navigation={navigation} item = {item} />
          )}
      />
    </View>
    );
}

const styles = StyleSheet.create({
    content: {
        height:200,
        width:200 ,
        backgroundColor:'red',
        margin:10,
        
    },
});
