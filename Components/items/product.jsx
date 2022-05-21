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
    <View style={styles.page}>
      <Image
        source={require("../../assets/megan.png")}
        style={{ width: 80, height: 80, alignSelf: "center", marginTop: "5%" }}
      />
      <ScrollView>
        <View style={styles.slide}>
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
        </View>

        <View style={styles.content}>
          <Text style={styles.font}>Name: {item.name} </Text>
          <Text style={styles.font}>Price: $ {item.price}</Text>
          <Text style={styles.font}>Description:</Text>
          <Text style={{ fontSize: 17 }}>{item.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#E7E9EB",
    marginBottom: "5%",
  },
  font: {
    fontSize: 25,
  },
  slide: {
    width: "100%",
    borderColor: "#fff",
    borderWidth: 2,
    marginTop: "5%",
  },
});
