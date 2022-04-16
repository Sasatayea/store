import { View, Text, Button, TextInput } from "react-native";
import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
  deleteCity,
  subscribe,
} from "../../db/cities/cities";
import EditCity from "./EditCity";

const CitiesList = () => {
  const getCitiesList = async () => {
    const c = await getCities();
    setCities(c);
    console.log("cities", c);
  };

  useEffect(() => {
    getCitiesList();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      //   console.log("changes", change, snapshot, change.type);
      // if (snapshot.metadata.hasPendingWrites) {
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
        getCitiesList();
      }
      // }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityToEdit, setCityToEdit] = useState(undefined);

  return cityToEdit ? (
    <EditCity city={cityToEdit} onSave={()=>setCityToEdit(undefined)} />
  ) : (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <TextInput
          onChangeText={setCityName}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
        <Button
          title="Add city"
          onPress={() =>
            addCity({ name: cityName || "new city" + cities.length })
          }
        />
      </View>
      {cities.map((c) => (
        <View
          key={c.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Text
            onPress={() => {
              setCityToEdit(c);
              console.log('cityToEdit', c);
            }}
          >
            {c.name}
          </Text>
          <Button title="Delete" onPress={() => deleteCity(c.id)} />
        </View>
      ))}
    </View>
  );
};

export default CitiesList;
