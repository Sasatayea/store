import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import {
  getHistory,
  editHistory,
  deleteHistory,
  addHistory,
  subscribehistory,
} from "../../db/Data/History";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

const History = () => {
  const getHistorylist = async () => {
    const c = await getHistory();
    await setHistory(c);
    // console.log("products", c);
  };

  useEffect(async () => {
    await getHistorylist();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribehistory(({ change, snapshot }) => {
      if (change.type === "added") {
        getHistorylist();
      }
      if (change.type === "modified") {
        getHistorylist();
      }
      if (change.type === "removed") {
        getHistorylist();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [History, setHistory] = useState([]);

  console.log(History);
  const dellete = (id) => {
    deleteHistory(id);
  };
  return (
    <View>
      <Text>Hestory</Text>
      <FlatList
        data={History}
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
                <Button title="dellete" onPress={() => dellete(item.id)} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  Buttonn: {
    flexDirection: "row",
    marginLeft: 110,
  },
});
