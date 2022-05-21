import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

const OrderHistory = ({ route, navigation }) => {
  let item = route.params;

  console.log("iteem", item);
  if (item.sold.length != 0) {
    return (
      <View style={styles.contant}>
        <View style={{ paddingLeft: "30%", marginTop: "5%" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Order History
          </Text>
        </View>

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
                  style={{ height: 135, width: 120, borderRadius: 15 }}
                  source={{ uri: item.image }}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: "10%",
                  paddingLeft: "3%",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Name : {item.name}</Text>
                <Text> </Text>
                <Text style={{ fontWeight: "bold" }}>{item.size}</Text>
                <Text> </Text>
                <Text style={{ fontWeight: "bold" }}>
                  Price :$ {item.price}
                </Text>
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
  contant: {
    backgroundColor: "#fff",
    height: "100%",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#E7E9EB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: "3%",
    width: 350,
    height: 155,
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
