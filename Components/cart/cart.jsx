import { StyleSheet, Text, View, TouchableOpacity,Button, TextInput  ,FlatList } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-web";
export default function cart({ route,navigation }) {
    const { itemId, otherParam } = route.params;
    return (
    <View style={styles.content}> 
        <Text>heloll</Text> 

        <Text>{JSON.stringify(itemId)}</Text>
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
