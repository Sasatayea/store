import { StyleSheet, Text, View, Button, Image } from "react-native";
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
      <Image
        source={require("../../assets/megan.png")}
        style={{
          width: 80,
          height: 80,
          alignSelf: "center",
          marginTop: "1%",
        }}
      />
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
              <View>
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
