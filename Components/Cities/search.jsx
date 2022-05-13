import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import {
  getCities,
  addCity,
  addCart,
  deleteCity,
  subscribe,
} from "../../db/Data/products";
import { useEffect, useState } from "react";
import Pitem from "../items/Pitem";
export default function Search({ navigation }) {
  const getCitiesList = async () => {
    const c = await getCities();
    await setCities(c);
    //console.log("products", c);
  };

  useEffect(async () => {
    await getCitiesList();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        getCitiesList();
      }
      if (change.type === "modified") {
        getCitiesList();
      }
      if (change.type === "removed") {
        getCitiesList();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [cities, setCities] = useState([]);

  const [searchItem, setsearchItem] = useState("");
  const [dataa, setDataa] = useState(cities);
  console.log("myci: ", dataa);

  const search = (searchItem) => {
    if (searchItem.match(/\*/)||
    searchItem.match(/\(/)||
    searchItem.match(/\)/)||
    searchItem.match(/\?/)) {
    } else {
      let x = [];
      let s = "";
      let h = 0;
      for (let i = 0; i < cities.length; i++) {
        s = cities[i].name;
        if (s.match(searchItem)) {
          if (s.match(searchItem).input != null) {
            x[h] = s.match(searchItem).input;
            h++;
          }
        }
      }
      let k = 0;
      let data = [];
      for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < x.length; j++) {
          if (cities[i].name == x[j]) {
            data[k] = cities[i];
            k++;
          }
        }
      }
      setDataa(data);
    }
  };

  if (!searchItem) {
    return (
      <View>
        <View style={styles.content}>
          <View style={styles.input}>
            <TextInput
              onChangeText={(e) => {
                setsearchItem(e), search(e);
              }}
              placeholder="Search"
              //onChange ={()=>search(searchItem)}
              // style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="search"
              color="#000"
              onPress={() => search(searchItem)}
            />
          </View>
        </View>
        <View style={styles.text}>
          <Text style={styles.text}> Nothing</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.content}>
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
            <Button
              title="search"
              color="#000"
              onPress={() => search(searchItem)}
            />
          </View>
        </View>
        <View style={styles.item}>
          <FlatList
            data={dataa}
            keyExtractor={cities.id}
            numColumns={2}
            renderItem={({ item }) => (
              <Pitem navigation={navigation} item={item} />
            )}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    // backgroundColor: "#fff",
  },
  input: {
    flex: 2,
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    width: 200,
  },
  button: {
    borderRadius: 200,
    flex: 1,
    paddingTop: 15,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
});
