import { StyleSheet, Text, View, TouchableOpacity ,Button, TextInput  ,Image} from "react-native";

export default function profile({ navigation }) {

  return (
    <View >
                  <View style={{padding: 10}}>
                <Button title={"Logout"}/>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 24,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
});
