import { StyleSheet, Text, View, TouchableOpacity ,Button, TextInput  ,Image} from "react-native";

export default function product({ navigation, route }) {
  let item = route.params.item;
  console.log("item: ", route.params.item);
  return (
    <View style={styles.content}>
      <Image
        style={{ height: 100, width: 100, margin: 10 }}
        source={{ uri: item.image }}
      ></Image>
      <Text> {item.name} </Text>
      <Text>$ {item.price}</Text>
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
