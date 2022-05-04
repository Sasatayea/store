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
} from "../../db/cities/cities";
import { useEffect, useState } from "react";
import Pitem from "./../items/Pitem";
export default function search({ navigation }) {
  const getCitiesList = async () => {
    const c = await getCities();
    await setCities(c);
    console.log("products", c);
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
  console.log("myci: ", cities);

  const search = (searchItem) => {
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
      const ddd = cities[i].name;
      for (let j = 0; j < x.length; j++) {
        if (ddd == x[j]) {
          data[k] = cities[i];
          k++;
        }
      }
    }
    setDataa(data);
  };

  if (!searchItem) {
    return (
      <View>
        <TextInput
          onChangeText={(e) => {
            setsearchItem(e), search(e);
          }}
          //onChange ={()=>search(searchItem)}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
        <Button title="search" onPress={() => search(searchItem)} />
        <Text> Nothing</Text>
      </View>
    );
  } else {
    return (
      <View>
        <TextInput
          onChangeText={(e) => {
            setsearchItem(e), search(e);
          }}
          //onChange ={()=>search(searchItem)}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
        <Button title="search" onPress={() => search(searchItem)} />

        <View
          style={{
            height: 550,
          }}
        >
          <FlatList
            data={dataa}
            keyExtractor={cities.id}
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
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
});
