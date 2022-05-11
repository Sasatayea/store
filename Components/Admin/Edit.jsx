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
  
  
  const Edit = ({ navigation,route }) => {
    let item = route.params.item;
    const [price, setPrice] = useState(item.price);
    const [image, setImage] = useState(item.image);
    const [name, setName] = useState(item.name);
    const [size, setSize] = useState(item.size);
    const [type, setType] = useState(item.type);
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
          Edit Product: {item.name}
        </Text>
        <View style={styles.in}>
          <TextInput
            onChangeText={setName}
            keyboardType="default"
            placeholder="Product name"
            value={name}
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
            value ={image}
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
  