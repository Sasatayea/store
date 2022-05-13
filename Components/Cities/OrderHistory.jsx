import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native-web';

const OrderHistory = (items) => {
    let item = items.route.params;
    console.log(item.sold);
    if(item.sold.length != 0){
        return (
            <View>
              <FlatList
        data={item.sold}
        keyExtractor={item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
              <Text>
                {item.name}
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