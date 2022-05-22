import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
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
     console.log(Myorder[0]);

    addHistory({...Myorder[0]});
    deleteOrder(item.id);
  };

  return (
    <View>
      <Text>Orders</Text>
      <Button title="Hestory" onPress={() => navigation.navigate("History")} />
      <FlatList
        data={Orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View
              style={{
                borderColor: item.Accept == 0 ? "red" : "green",
                borderWidth: 2,
                margin: 3,
              }}
            >
              <Text>Client name : {item.client}</Text>
              <Text>total cost : {item.cost}</Text>
              <Text>Address : {item.adress}</Text>
              <View style={styles.Buttonn}>
                <Button title="Accept" onPress={() => changeAcc(item.id)} />
                <Button title="complete" onPress={() => complete(item)} />
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
    marginLeft: 110,
  },
});
