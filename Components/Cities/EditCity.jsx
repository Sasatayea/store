import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { editCity ,deleteCity } from "../../db/cities/cities";
import CitiesList from './CitiesList';


const EditCity = ({ city: cityToEdit, onSave }) => {
  const [cityToEditName, setCityToEditName] = useState(cityToEdit.name);

  const fun=()=>{
    deleteCity(city);
    <CitiesList /> 
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <TextInput
          onChangeText={setCityToEditName}
          defaultValue={cityToEditName}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
        <Button
          title="Save"
          onPress={() => {
            editCity({ ...cityToEdit, name: cityToEditName })
              .then((d) => {
                onSave();
                console.log(cityToEditName);
              })
              .catch((e) => console.log(e));
          }}
        />
      </View>
      <Button title="Delete" onPress={() => this.fun } />
      <Button title="back" onPress={() => <CitiesList />  } />

    </View>
  );
};

export default EditCity;

const styles = StyleSheet.create({});
