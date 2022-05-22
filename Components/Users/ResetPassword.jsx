import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { sendPassword } from "../../db/auth/auth";
import { async } from "@firebase/util";

export default function ResetPassword({ navigation }) {
    const [email, setEmail] = useState("");
    return (
        <View style={styles.content}>
            <View style={styles.in}>
                <TextInput
                    onChangeText={(e) => { setEmail(e) }}
                    keyboardType="default"
                    placeholder="Enter Email"
                    style={{
                        flex: 2,
                        borderColor: "black",
                        borderWidth: 2,
                        height: 40,
                        // margin: 12,
                        borderWidth: 1,
                        padding: 10,
                    }}
                />
            </View>

            <TouchableOpacity onPress={() => {sendPassword(email).then(navigation.navigate("Login")) }}
            >
                Reset
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {

        marginTop: 24,
        padding: 20,
        paddingHorizontal: 20,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",

    },
    image: {
        width: 50,
        height: 50,
    },
    infoView: {
        flexDirection: "row",
        alignItems: "center",

    },
    info: {
        width: 20,
        height: 20,
        backgroundColor: "#55BCF6",
        marginRight: 10,

    },

    select: {
        width: 15,
        height: 15,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#55BCF6",
        marginLeft: 230,

    },
});
