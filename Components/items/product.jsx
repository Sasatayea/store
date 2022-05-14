import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Slideshow from "react-native-image-slider-show";
export default function Product({ navigation, route }) {
  let item = route.params.item;
  console.log("item: ", route.params.item);
  const [position, setposition] = useState(1);
  
  return (
    <ScrollView>
      <Slideshow 
        dataSource={[
          {
            url: item.image,
          },
          {
            url: item.image2,
          },
          {
            url: item.image3,
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={styles.font}>{item.name} </Text>
        <Text style={styles.font}>Price: $ {item.price}</Text>
        <Text style={styles.font}>Description:</Text>
        <Text style={{ fontSize: 17 }}>{item.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  font: {
    fontSize: 25,
  },
});
