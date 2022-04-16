import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from "react-native";
import { useState, useEffect, useRef } from "react";

export default function GuessMyNumber() {
  const [myNumber, setMyNumber] = useState("");
  const [message, setMessage] = useState("Lower or higher?");
  const [randomNumber, setRandomNumber] = useState(0);
  const [resetNumber, setResetNumber] = useState(true);
  const [isGameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const textInputRef = useRef(null);

  useEffect(() => {
    if (resetNumber) {
      setRandomNumber(Math.floor(Math.random() * 100));
      setResetNumber(false);
      setMyNumber("");
      setMessage("Lower or higher?");
      setGameOver(false);
      setGuesses(new Array());
      textInputRef.current.focus();
    }
  }, [resetNumber]);

  const handleNumericInput = (t) => {
    if (/^\d{1,2}$/.test(t) || t === "") {
      setMyNumber(t);
    }
  };

  const checkNumber = () => {
    if (isGameOver) return;
    if (!myNumber) setMessage("Error!!");
    const guess = parseInt(myNumber);
    // console.log('guesses.push("1")', guesses.push("1"));
    if (guess > randomNumber) {
      setMessage("Lower");
      setGuesses((prev) => [...prev, "<" + guess]);
    } else if (guess < randomNumber) {
      setMessage("Higher");
      setGuesses((prev) => [...prev, ">" + guess]);
    } else if (guess === randomNumber) {
      setMessage("Congrats!!");
      setGuesses((prev) => [...prev, "=" + guess]);
      setGameOver(true);
    }
    textInputRef.current.focus();
    setMyNumber("");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18 }}>Enter your guess between 0 and 99:</Text>
        <View style={styles.sideByside}>
          <TextInput
            onChangeText={handleNumericInput}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Enter") {
                e.preventDefault();
                checkNumber();
              }
            }}
            value={myNumber}
            placeholder="Enter your guess"
            keyboardType="numeric"
            returnKeyType="done"
            ref={textInputRef}
          />
          <Button title="Check" onPress={checkNumber} />
        </View>
      </View>
      <View style={styles.sideByside}>
        <Text>Your guesses: {guesses.length && guesses.join(", ")}</Text>
      </View>
      <View style={styles.message}>
        <Text style={{ fontSize: 40 }}>{message}</Text>
      </View>
      {/* <Text>{randomNumber}</Text>*/}
      <View style={styles.sideByside}>
        <Button title="Reset" onPress={() => setResetNumber(true)} />
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "flex-start",
    margin: 10,
  },
  header: {
    flex: 1,
    // backgroundColor: "#f0f",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    flex: 1,
    // backgroundColor: "#ff0",
    alignItems: "center",
    justifyContent: "center",
  },
  sideByside: {
    // backgroundColor: "#0ff",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: 100,
    margin: 10,
  },
});
