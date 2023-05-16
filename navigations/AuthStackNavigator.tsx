import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screens/auth/Signup";
import SignInScreen from "../screens/auth/Signin";
import SetPin from "../screens/auth/SetPin";
import Onboarding from "../components/Onboarding";
import AuthCompletedScreen from "../screens/auth/AuthCompletedScreen";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Signin" component={SignInScreen} />
      <Stack.Screen name="Pin" component={SetPin} />
      <Stack.Screen name="Done" component={AuthCompletedScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
