import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


export default function product({ navigation,route }) {
  let item = route.params.item;
  console.log("item: ",route.params.item);
  return (
    <View style={styles.content}>
      {/* <Text> {navigation.getParam('name')} </Text> */}
      {/* <Text> {navigation.getParam('name')} </Text> */}
      {/* <Text> {navigation.getParam('<Image style = {{height:100,width:100, margin:10}} 
                  source={{uri:item.image}}></Image>')} </Text> */}
      <Text> {item.name} </Text>
      <Text> hellow </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    
    marginTop:24,
    padding:20,
    paddingHorizontal:20,
    backgroundColor: "#FFFFFF",    
  },
});
