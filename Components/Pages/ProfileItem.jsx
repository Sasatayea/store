import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfileItem = (items) => {
  let item = items.route.params;
  return (
    <View style={styles.profile}>
      <Text style={styles.profile1}>Name: {item.name}</Text>
      <Text style={styles.profile1}>Email: {item.email}</Text>
      <Text style={styles.profile1}>Country name: {item.countryname}</Text>
      <Text style={styles.profile1}>Balance: $ {item.money}</Text>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  profile: {
    // backgroundColor: "#D9D9D9",
  },
  profile1: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
