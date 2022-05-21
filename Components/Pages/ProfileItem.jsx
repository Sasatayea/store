import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfileItem = (items) => {
  let item = items.route.params;
  return (
    <View style={styles.profile}>
      <Text style={{ fontSize: 30, paddingLeft: "20%", paddingTop: "10%" }}>
        User Information
      </Text>
      <View style={styles.profile2}>
        <Text style={styles.profile1}>Name: {item.name}</Text>
        <Text> </Text>
        <Text style={styles.profile1}>Email: {item.email}</Text>
        <Text> </Text>
        <Text style={styles.profile1}>Country name: {item.countryname}</Text>
        <Text> </Text>
        <Text style={styles.profile1}>Balance: $ {item.money}</Text>
      </View>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  profile: {
    height: "100%",
    backgroundColor: "#fff",
  },
  profile2: {
    paddingTop: "30%",
    paddingLeft: "10%",
  },
  profile1: {
    fontSize: 20,

    fontWeight: "bold",
  },
});
