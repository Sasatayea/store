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
  const [description, setDescription] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [priceerr, setPriceerr] = useState("");
  const [imageerr, setImageerr] = useState("");
  const [nameerr, setNameerr] = useState("");
  const [descriptionerr, setDescriptionerr] = useState("");
  const [image2err, setImage2err] = useState("");
  const [image3err, setImage3err] = useState("");
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
          onChangeText={(e) => {
            setName(e);
          }}
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
        <Text>{nameerr}</Text>
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
        <Text>{descriptionerr}</Text>
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
        <Text>{priceerr}</Text>
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
        <Text>{imageerr}</Text>
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
        <Text>{image2err}</Text>
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
        <Text>{image3err}</Text>
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
          onPress={() => {
            if (name.length < 3) setNameerr("This name less than 3 characters");
            else if (description.length < 12) {
              setDescriptionerr("This description less than 12 characters");
            } else if (price == "") {
              setPriceerr("Enter the price");
            } else if (image == "") {
              setImageerr("Please uplode an Image1");
            } else if (image2 == "") {
              setImage2err("Please uplode an Image2");
            } else if (image3 == "") {
              setImage3err("Please uplode an Image3");
            } else {
              addCity({
                name: name,
                price: price,
                size: size,
                type: type,
                image: image,
                image2: image2,
                image3: image3,
                description: description,
                liked: [],
              }).then(navigation.navigate("EditP"));
            }
          }}
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
