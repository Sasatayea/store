import { StyleSheet, Text, View, TouchableOpacity,Button, TextInput  ,Image } from "react-native";


export default function Pitem({ navigation ,item}) {
  return (
    <View
          style={styles.content}
          >
          <TouchableOpacity onPress={() =>navigation.navigate('product',item)} >
            <Image style = {{height:100,width:100, margin:10}} source={{uri:item.image}}></Image>
            <Text> {item.name} </Text>
            <Text>$ {item.price}</Text>
          </TouchableOpacity>
          {/* <Button title="Delete" onPress={() => deleteCity(item.id)} /> */}
          <Button title="Add to char"/>
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
