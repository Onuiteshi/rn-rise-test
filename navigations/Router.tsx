import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./MainStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector } from "react-redux";
import { UserState } from "../store";

const Router = () => {
  const token = useSelector((state: UserState) => state.token);

  console.warn(token);
  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView> */}

      <View style={styles.container}>
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
          <StatusBar
            barStyle={"dark-content"}
            translucent
            backgroundColor={"#fff"}
          />
        </SafeAreaView>

        {token === undefined ? <MainStackNavigator /> : <AuthStackNavigator />}
      </View>

      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
