import { View, Text ,  StyleSheet ,Button } from 'react-native'
import React from 'react'
import { editOrder, getOrders, subscribeOrders } from '../../db/Data/Orders';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-web';

const OrderL = ({navigation}) => {
    const getOrder = async () => {
        const c = await getOrders();
        await setOrders(c);
        // console.log("products", c);
    };
    
    useEffect(async () => {
        await getOrder();
    }, []);
    
      useEffect(() => {
        const unsubscribe = subscribeOrders(({ change, snapshot }) => {
          if (change.type === "added") {
            getOrder();
          }
          if (change.type === "modified") {
            getOrder();
          }
          if (change.type === "removed") {
            getOrder();
          }
        });
        return () => {
          unsubscribe();
        };
      }, []);
    
    const [Orders, setOrders] = useState([]);    
    console.log(Orders) ;

    const changeAcc =(id)=>{
        console.log(id);
        let Myorder = Orders.filter((e) => e.id == id);
        let Allorder= Orders.filter((e) => e.id != id);
        console.log(Myorder) ;
        editOrder({
            ...Myorder[0],
            Accept:1 ,
        })
    }
    const complete =(id)=>{
        console.log(id);
    }
return (
    <View>
        <Text>Orders</Text>
        <Button title="Hestory" onPress={()=>navigation.navigate("Hestory")}/>
        <FlatList
            data={Orders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                  <View style={{borderColor: item.Accept == 0 ? 'red' :'green' , borderWidth:2 ,margin:3}}>
                  <Text>Client name : {item.client.name}</Text>
                  <Text>total cost : {item.cost}</Text>
                  <Text>Address : {item.adress}</Text>
                  <View style={styles.Buttonn} >
                  <Button title="Accept" onPress={()=>changeAcc(item.id)} />
                  <Button title="complete" onPress={()=>complete(item.id)} />
                  </View>
                  </View>
              </TouchableOpacity>
              
            )} 
          /> 
    </View>
  )
}

export default OrderL
const styles = StyleSheet.create({
    Buttonn:{
        flexDirection:'row',
        marginLeft:110
    }
  });