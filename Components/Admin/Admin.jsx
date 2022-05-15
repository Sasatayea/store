import { StyleSheet, Text, View, TouchableOpacity ,Button, TextInput  ,Image} from "react-native";
import { logout } from "../../db/auth/auth";

export default function Admin({ navigation }) {
  
  return (
    <View style={styles.content}>
        <Button title="Edit Products" onPress={()=>navigation.navigate("EditP")}/>
        <Button title="Add Product" onPress={()=>navigation.navigate("AddP")}/>
        <Button title="EditUserInfo" onPress={()=>navigation.navigate("EditUserInfo")}/>
        <View style={styles.botton}>
          <Button color="#000" title="Logout" onPress={() => logout()} />
        </View>
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
  botton: {
    width: 250,
    padding: 10,
    paddingLeft: 100,
  },
});