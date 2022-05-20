import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Image,
  Picker,
  StyleSheet,
  ScrollView,
  ImageBackground
} from "react-native";
import { useEffect, useState } from "react";
import { getCities, subscribe } from "../../db/Data/products";
import Pitem from "../items/Pitem";
import SlideshowTest from "./SlideshowTest ";
import bc from "../../assets/bc.jpg";
const Home = ({ navigation }) => {
  const getProduct = async () => {
    const c = await getCities();
    await setproduct(c);
    // console.log("products", c);
  };

  useEffect(async () => {
    await getProduct();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        getProduct();
      }
      if (change.type === "modified") {
        getProduct();
      }
      if (change.type === "removed") {
        getProduct();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [product, setproduct] = useState([]);

  const [selectedValue, setSelectedValue] = useState("All");

  let dataa = product.filter((e) => e.type == selectedValue);
  if (selectedValue == "All") {
    dataa = product;
  }
  //console.log(dataa);
  return (
    
    <View style={styles.container}>
      {/* <ImageBackground source={bc} resizeMode="cover" style={styles.heder}> */}
      <View style={styles.search}>
        
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
          }}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="chair" value="chair" />
          <Picker.Item label="bed" value="bed" />
          <Picker.Item label="sofa" value="sofa" />
        </Picker>
      </View>

      <ScrollView>
        <View style = {styles.slide}>
          <SlideshowTest  item={product} />
        </View>
        <View style={styles.items}>
          <FlatList
            data={dataa}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              
                <Pitem navigation={navigation} item={item} />
              
            )}
          />
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
    </View>
    
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  heder: {
    height: "100%",
    width: "100%",
  },
  slide:{
    borderColor:"#D9D9D9",
    borderWidth:6,
  },
  search: {
    paddingTop: 10,
    flexDirection: "row",
    
   
  },
  items: {
    // paddingTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: "#D9D9D9",
    fontSize: 17,
    fontStyle: "italic",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginLeft:70,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    borderWidth: 2,
  },
});
