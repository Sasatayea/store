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
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { getCities, subscribe } from "../../db/Data/products";
import Pitem from "../items/Pitem";
import SlideshowTest from "./SlideshowTest ";
import logo from "../../assets/megan.png";
const Home = ({ navigation }) => {
  const getProduct = async () => {
    const c = await getCities();
    await setproduct(c);
    setslide(c);
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
  const [slide, setslide] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [selectedValue, setSelectedValue] = useState("All");
  let dataa = product.filter((e) => e.type == selectedValue);
  if (selectedValue == "All") {
    dataa = product;
  }
  const search = (searchItem) => {
    if (
      searchItem.match(/\*/) ||
      searchItem.match(/\(/) ||
      searchItem.match(/\)/) ||
      searchItem.match(/\?/)
    ) {
    } else {
      let s = "";
      s = searchItem;
      let h = 0;

      let data = [];
      for (let i = 0; i < product.length; i++) {
        if (product[i].name.match(s)) {
          data[h] = product[i];
          h++;
        }
      }
      if (searchItem != "") setproduct(data);
      else setproduct(slide);
    }
  };
  //console.log(dataa);
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={bc} resizeMode="cover" style={styles.heder}> */}

      <Image
        source={require("../../assets/megan.png")}
        style={{ width: 80, height: 80, alignSelf: "center", marginTop: "5%" }}
      />

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
        <View style={styles.contentS}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(e) => {
                setsearchItem(e), search(e);
              }}
              placeholder="Search"
              // //onChange ={()=>search(searchItem)}
              // style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => search(searchItem)}>
              <Image
                style={{ width: 30, height: 30, marginLeft: 10 }}
                source={require("../../assets/search.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.slide}>
          <SlideshowTest item={slide} />
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
    backgroundColor: "#fff",
  },
  heder: {
    height: "100%",
    width: "100%",
  },
  slide: {
    width: "100%",
    borderColor: "#fff",
    borderWidth: 2,
    marginTop: "5%",
  },
  search: {
    // paddingTop: 10,
    flexDirection: "row",
    marginLeft: "8%",
  },
  items: {
    // paddingTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2%",
  },
  picker: {
    height: 41,
    width: 80,
    backgroundColor: "#fff",
    fontSize: 17,
    paddingLeft: 5,
    borderRadius: 50,

    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 2,
  },
  contentS: {
    flexDirection: "row",

    backgroundColor: "white",
    marginLeft: "5%",
    // backgroundColor: "#fff",
  },
  input: {
    height: 40,
    // margin: 12,
    marginBottom: "10%",
    borderRadius: 20,
    padding: 10,
    width: "85%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 2,
  },
  button: {
    borderRadius: 200,
    flex: 1,
    marginTop: "3%",
    backgroundColor: "white",
  },
});
