import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import {
  deleteOrder,
  editOrder,
  getOrders,
  subscribeOrders,
} from "../../db/Data/Orders";
import { useEffect, useState } from "react";
import { addHistory } from "../../db/Data/History";

const OrderL = ({ navigation }) => {
  const getOrder = async () => {
    const c = await getOrders();
    await setOrders(c);
    // console.log("products", c);
  };

  useEffect(async () => {
    await getOrder();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeOrders(({ change, snapshot }) => {
      if (change.type === "added") {
        getOrder();
      }
      if (change.type === "modified") {
        getOrder();
      }
      if (change.type === "removed") {
        getOrder();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [Orders, setOrders] = useState([]);
  console.log(Orders);

  const changeAcc = (id) => {
    console.log(id);
    let Myorder = Orders.filter((e) => e.id == id);
    let Allorder = Orders.filter((e) => e.id != id);

    editOrder({
      ...Myorder[0],
      Accept: 1,
    });
  };
  const complete = (item) => {
    let Myorder = Orders.filter((e) => e.id == item.id);
    // console.log(id);

    addHistory({
      ...Myorder[0],
    });
    deleteOrder(item.id);
  };
  return (
    <View>
      <Image
        source={require("../../assets/megan.png")}
        style={{
          width: 80,
          height: 80,
          alignSelf: "center",
          marginTop: "1%",
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("History")}>
        <View style={styles.pp}>
          <Text
            style={{
              fontWeight: "bold",
              // paddingTop: "5%",
              color: "#F9FFB7",
            }}
          >
            History
          </Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={Orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View
              style={{
                borderColor: item.Accept == 1 ? "green" : "red",
                borderWidth: 3,
                margin: 3,
              }}
            >
              <View style={{ marginTop: "2%", marginBottom: "2%" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 19,
                    paddingLeft: "4%",
                  }}
                >
                  Client name : {item.client}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 19,
                    paddingLeft: "4%",
                  }}
                >
                  total cost : {item.cost}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 19,
                    paddingLeft: "4%",
                  }}
                >
                  Address : {item.adress}
                </Text>
              </View>
              <View style={styles.Buttonn}>
                <Button title="Accept" onPress={() => changeAcc(item.id)} />
                <Button
                  title="complete"
                  style={{ marginLeft: "4%" }}
                  onPress={() => complete(item)}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OrderL;
const styles = StyleSheet.create({
  Buttonn: {
    flexDirection: "row",
    marginLeft: "30%",
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",

    width: "70%",
    borderRadius: 20,
    height: 50,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2DCCA9",
    flexDirection: "row",
    marginLeft: "15%",
  },
});
