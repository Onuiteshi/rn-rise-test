import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { fetchUser, store } from "./store";
// import AuthStackNavigator from "./navigation/AuthStacknavigator";
import { useEffect } from "react";
import MainStackNavigator from "./navigation/MainStackNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <GestureHandlerRootView> */}

        <View style={styles.container}>
          {/* <AuthStackNavigator /> */}
          <MainStackNavigator />
          <StatusBar style="auto" />
        </View>

        {/* </GestureHandlerRootView> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
