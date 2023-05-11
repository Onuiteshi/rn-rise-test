import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Onboarding from "./components/Onboarding";

export default function App() {
  const handleNext = () => {
    // Logic to handle "Next" button press
    console.log("Next button pressed");
  };

  const handleBack = () => {
    // Logic to handle "Back" button press
    console.log("Back button pressed");
  };
  // const [fontsLoaded] = useFonts({
  //   "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    // <GestureHandlerRootView>
    <View style={styles.container}>
      <Onboarding onNext={handleNext} onBack={handleBack} />
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
