import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Completed from "../../components/Completed";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<ParamListBase> | undefined;
}

const AuthCompletedScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Completed
      title="You just created your Rise account"
      subTitle="Welcome to Rise, let’s take you home"
      buttonText="Okay"
      navigation={navigation}
      navigationText="Pin"
    />
  );
};

export default AuthCompletedScreen;

const styles = StyleSheet.create({});
