import { StyleSheet, Text, View, Image,FlatList, TouchableOpacity } from "react-native";
import React from "react";


const OrderHistory = ({route,navigation}) => {
  let item = route.params;

  console.log("iteem", item);
  if (item.sold.length != 0) {
    return (
      <View>
        <Text styles={{ marginButton: 30 }}>
          Your Order History That You Buy
        </Text>
        <Text> </Text>
        <FlatList
          data={item.sold}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Product", { item: item })}
              style={[styles.card, styles.shadowProp]}
            >
              <View>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: item.image }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text>Name : {item.name}</Text>
                <Text>Price : {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  } else {
    return <Text> NoThing</Text>;
  }
};

export default OrderHistory;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: "3%",
    width: 350,
    height: 120,
    alignSelf: "center",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
