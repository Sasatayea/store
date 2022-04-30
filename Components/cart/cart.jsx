import { StyleSheet, Text, View, TouchableOpacity,Button, TextInput  ,FlatList } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-web";
import { editUser } from "../../db/cities/users";
export default function cart({ route,navigation }) {
    
    const { itemId, otherParam } = route.params;
    console.log(itemId);

    return (
    <View style={styles.content}> 
        <FlatList 
        data={itemId}
        keyExtractor={itemId.id}
        renderItem={({item})=>(
        <Text>{item[0].name}</Text>
        )}
      />

        
        {/* <ScrollView>
            {itemId.map((e,index)=>(
            <View key={index}>
                <Text>{e}</Text>
            </View>
            ))}
        </ScrollView> */}
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
