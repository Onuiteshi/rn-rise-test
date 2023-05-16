import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface CompletedProps {
  title: string;
  subTitle: string;
  buttonText: string;
  navigation?: any;
  navigationText?: string | undefined;
  toggleModal?: () => void;
}

const Completed: React.FC<CompletedProps> = ({
  title,
  subTitle,
  buttonText,
  navigation,
  navigationText,
  toggleModal,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <AntDesign name="check" size={34} color="#0898A0" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <TouchableOpacity
        onPress={() =>
          toggleModal ? toggleModal() : navigation.navigate(navigationText)
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#71879C1A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    marginTop: 20,
    color: "#222222",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    marginTop: 7,
    textAlign: "center",
    color: "#71879C",
  },
  button: {
    marginTop: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#0898A0",
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Completed;
