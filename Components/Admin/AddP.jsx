import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { addCity } from "../../db/Data/products";
import { React, useState } from "react";

const AddP = ({ navigation }) => {
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("chair");
  return (
    <View
      style={{
        marginTop: "40%",
        backgroundColor: "white",
        borderRadius: 20,
        height: "58%",
      }}
    >
      <Text
        style={{
          padding: 2,
          textAlign: "center",
          fontSize: 30,
          //fontFamily: "bold",
        }}
      >
        {" "}
        Add Product{" "}
      </Text>
      <View style={styles.in}>
        <TextInput
          onChangeText={setName}
          keyboardType="default"
          placeholder="Product name"
          style={{
            flex: 2,
            borderColor: "black",
            borderWidth: 2,
            height: 40,
            // margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
        />
      </View>
      <View style={styles.in}>
        <TextInput
          onChangeText={setPrice}
          keyboardType="number-pad"
          placeholder="Price"
          style={{
            flex: 2,
            borderColor: "black",
            borderWidth: 2,
            height: 40,
            // margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
        />
      </View>
      <View style={styles.in}>
        <TextInput
          onChangeText={setImage}
          keyboardType="default"
          placeholder="Image"
          style={{
            flex: 2,
            borderColor: "black",
            borderWidth: 2,
            height: 40,
            // margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          onChangeText={setSize}
          keyboardType="default"
          placeholder="Size"
          style={{
            flex: 2,
            borderColor: "black",
            borderWidth: 2,
            height: 40,
            // margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
        />

        <Picker
          selectedValue={type}
          style={{
            height: 40,
            width: 150,
            backgroundColor: "#fff",
          }}
          onValueChange={(itemValue, itemIndex) => {
            setType(itemValue);
          }}
        >
          <Picker.Item label="chair" value="chair" />
          <Picker.Item label="bed" value="bed" />
          <Picker.Item label="sofa" value="sofa" />
        </Picker>
      </View>

      <View
        style={{
          width: 170,
          padding: 10,
        }}
      >
        <Button
          title="Add"
          color="#000"
          onPress={() =>
            addCity({
              name: name,
              price: price,
              size: size,
              type: type,
              image: image,
            })
          }
        />
      </View>
    </View>
  );
};

export default AddP;

const styles = StyleSheet.create({
  heder: {
    height: "100%",
    width: "100%",
  },
  in: {
    padding: 10,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
  },
});
