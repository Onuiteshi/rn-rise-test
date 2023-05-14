import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SetPin: React.FC = () => {
  const [pin, setPin] = useState("");
  const pinInputRefs = useRef<Array<TextInput | null>>([]);

  const handlePinChange = (text: string, index: number) => {
    const updatedPin = pin.split("");
    updatedPin[index] = text.replace(/[^0-9]/g, "");

    setPin(updatedPin.join(""));

    if (text.length > 0 && index < pinInputRefs.current.length - 1) {
      pinInputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirm = () => {
    if (pin.length === 6) {
      console.log(pin);
    } else {
      Alert.alert("Error", "Please enter a 6-digit pin");
    }
  };

  const handleClear = () => {
    setPin("");
    pinInputRefs.current[0]?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        {/* <View style={styles.container}> */}
        <Text style={styles.heading}>Create a 6-digit PIN</Text>
        <Text style={styles.subheading}>
          You’ll use this PIN to sign in and confirm transactions
        </Text>

        <View style={styles.pinContainer}>
          {Array.from({ length: 6 }, (_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (pinInputRefs.current[index] = ref)}
              style={[
                styles.input,
                pin.length > index && styles.filledInput,
                {
                  borderColor: pin[index] ? "#0898A0" : "#71879C33",
                  borderWidth: pin[index] ? 1.5 : 1,
                },
              ]}
              value={pin[index] || ""}
              onChangeText={(text) => handlePinChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <View style={styles.numKeypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.key}
              onPress={() => handlePinChange(String(num), pin.length)}
            >
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.key} onPress={handleClear}>
            <Ionicons name="ios-backspace" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 17,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 11,
    color: "#222222",
  },
  subheading: {
    fontSize: 15,
    textAlign: "left",
    marginBottom: 30,
    color: "#71879C",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  pinContainer: {
    flexDirection: "row",
    marginBottom: 20,
    columnGap: 9,
  },
  input: {
    width: 40,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    textAlign: "center",
  },
  filledInput: {
    backgroundColor: "#fff",
    fontSize: 15,
    fontWeight: "900",
    color: "#222222",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0898A0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  numKeypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  key: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#000",
    borderRadius: 70 / 2,
    margin: 5,
    backgroundColor: "#71879C1A",
  },
  keyText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#0898A0",
  },
});

export default SetPin;
