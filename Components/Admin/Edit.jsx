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
import { editCity } from "../../db/Data/products";
import { React, useState } from "react";

const Edit = ({ navigation, route }) => {
  let item = route.params.item;
  const [price, setPrice] = useState(item.price);
  const [image, setImage] = useState(item.image);
  const [name, setName] = useState(item.name);
  const [size, setSize] = useState(item.size);
  const [description, setDescription] = useState(item.description);
  const [image2, setImage2] = useState(item.image2);
  const [image3, setImage3] = useState(item.image3);
  return (
    <View
      style={{
        padding: 2,
        textAlign: "center",
        fontSize: 30,
      }}
    >
      <Text> Edit Product: {item.name}</Text>
      <View style={styles.in}>
        <TextInput
          onChangeText={setName}
          keyboardType="default"
          placeholder="Product name"
          style={{
            padding: 2,
            textAlign: "center",
            fontSize: 30,
          }}
        />
      </View>

      <View style={styles.in}>
        <TextInput
          onChangeText={setDescription}
          keyboardType="default"
          placeholder="Description"
          value={description}
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
          value={price}
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
          value={image}
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
          onChangeText={setImage2}
          keyboardType="default"
          placeholder="Image2"
          value={image2}
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
          onChangeText={setImage3}
          keyboardType="default"
          placeholder="Image3"
          value={image3}
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
          value={size}
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
          title="Edit"
          color="#000"
          onPress={() =>
            editCity({
              id: item.id,
              name: name,
              price: price,
              size: size,
              type: type,
              image: image,
              image2: image2,
              image3: image3,
              description: description,
              liked: [],
            })
          }
        />
      </View>
    </View>
  );
};

export default Edit;

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
