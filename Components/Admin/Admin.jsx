import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from "react-native";
import { logout } from "../../db/auth/auth";

export default function Admin({ navigation }) {
  return (
    <View style={styles.content}>
      <Image
        source={require("../../assets/megan.png")}
        style={{
          width: 80,
          height: 80,
          alignSelf: "center",
          marginTop: "1%",
        }}
      />
      <View style={{ marginBottom: "12%" }}>
        <TouchableOpacity onPress={() => navigation.navigate("EditP")}>
          <View style={styles.pp}>
            <Text
              style={{
                fontWeight: "bold",
                // paddingTop: "5%",
                fontSize: 22,
                color: "#F9FFB7",
              }}
            >
              Edit Product{" "}
            </Text>
            <Image
              source={require("../../assets/edit.png")}
              style={{ width: 30, height: 30, margintop: "5%" }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: "12%" }}>
        <TouchableOpacity onPress={() => navigation.navigate("EditUserInfo")}>
          <View style={styles.pp}>
            <Text
              style={{
                fontWeight: "bold",
                // paddingTop: "5%",
                fontSize: 22,
                color: "#F9FFB7",
              }}
            >
              Edit User Information{" "}
            </Text>
            <Image
              source={require("../../assets/resume.png")}
              style={{ width: 35, height: 35, margintop: "5%" }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: "12%" }}>
        <TouchableOpacity onPress={() => navigation.navigate("OrderL")}>
          <View style={styles.pp}>
            <Text
              style={{
                fontWeight: "bold",
                // paddingTop: "5%",
                fontSize: 22,
                color: "#F9FFB7",
              }}
            >
              Order List{" "}
            </Text>
            <Image
              source={require("../../assets/to-do-list.png")}
              style={{ width: 35, height: 35, margintop: "5%" }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => logout()}>
        <View style={styles.pp}>
          <Text
            style={{
              fontWeight: "bold",
              // paddingTop: "5%",
              fontSize: 22,
              color: "#F9FFB7",
            }}
          >
            Log Out{" "}
          </Text>
          <Image
            source={require("../../assets/logout.png")}
            style={{ width: 35, height: 35, margintop: "5%" }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  botton: {
    width: 250,
    padding: 10,
    paddingLeft: 100,
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",

    width: "100%",
    borderRadius: 20,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2DCCA9",
    flexDirection: "row",
  },
});
