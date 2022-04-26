import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


export default function product({ navigation }) {
  return (
    <View style={styles.content}>
      {/* <Text> {navigation.getParam('name')} </Text> */}
      <Text> hellow </Text>
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
