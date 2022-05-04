import { StyleSheet, Text, View, TouchableOpacity ,Button, TextInput  ,Image} from "react-native";

export default function Admin({ navigation }) {
  
  return (
    <View style={styles.content}>
        <Button title="Edit Products" onPress={()=>navigation.navigate("EditP")}/>
        <Button title="Add Product" onPress={()=>navigation.navigate("AddP")}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
});