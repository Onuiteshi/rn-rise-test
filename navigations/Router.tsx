import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./MainStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector } from "react-redux";

const Router = () => {
  const token = useSelector((state: any) => state.user.token);

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

        {token !== "" ? <MainStackNavigator /> : <AuthStackNavigator />}
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
