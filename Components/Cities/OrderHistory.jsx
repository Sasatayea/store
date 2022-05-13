import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native-web';

const OrderHistory = (items) => {
    let item = items.route.params;
    console.log("iteem",item);
    if(item.sold.length != 0){
        return (
            <View>
              <Text styles={{marginButton:30}}> Your Order History That You Buy </Text>  
              <Text>       </Text>            
              <FlatList
        data={item.sold}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
              <Text>
                  Product name :  {item.name}
              </Text>
          </TouchableOpacity>
        )}
      />
            </View>
          )
    }else{
        return(
            <Text> NoThing</Text>
        );
    }
  
}

export default OrderHistory

const styles = StyleSheet.create({})