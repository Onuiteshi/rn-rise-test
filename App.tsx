import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Onboarding from "./components/Onboarding";
import SignUpScreen from "./screens/auth/Signup";
import SignInScreen from "./screens/auth/Signin";

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
    // <GestureHandlerRootView>
    <View style={styles.container}>
      {/* <SignUpScreen /> */}
      {/* <Onboarding onNext={handleNext} onBack={handleBack} /> */}
      <SignInScreen />
      <StatusBar style="auto" />
    </View>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
