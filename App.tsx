import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./components/Onboarding";
import SignUpScreen from "./screens/auth/Signup";
import SignInScreen from "./screens/auth/Signin";
import SetPin from "./screens/auth/SetPin";
import AuthStackNavigator from "./navigation/AuthStacknavigator";

export default function App() {
  const handleNext = () => {
    // Logic to handle "Next" button press
    console.log("Next button pressed");
  };

  const handleBack = () => {
    // Logic to handle "Back" button press
    console.log("Back button pressed");
  };

  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView> */}
      <View style={styles.container}>
        <AuthStackNavigator />
        <StatusBar style="auto" />
      </View>
      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
