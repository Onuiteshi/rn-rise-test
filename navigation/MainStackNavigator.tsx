import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Index from "../screens/dashboard";

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

const DotIndicator: React.FC<{ focused: boolean }> = ({ focused }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Ionicons
        name="ellipse"
        size={8}
        color={focused ? "#0898A0" : "transparent"}
      />
    </View>
  );
};

const MainStackNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      //   tabBarOptions={{
      //     showLabel: true,
      //     activeTintColor: "#0898A0",
      //     inactiveTintColor: "#A0A0A0",
      //     style: {
      //       backgroundColor: "#F5F5F5",
      //     },
      //   }}
    >
      <Tab.Screen
        name="Home"
        component={Index}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <DotIndicator focused={focused} />
              <Ionicons
                name="home"
                size={24}
                color={focused ? "#0898A0" : "#A0A0A0"}
              />
            </>
          ),
          tabBarLabel: "Home",
        }}
      />
      {/* <Tab.Screen
          name="Plan"
          component={PlanScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <DotIndicator focused={focused} />
                <Ionicons
                  name="calendar"
                  size={24}
                  color={focused ? "#0898A0" : "#A0A0A0"}
                />
              </>
            ),
            tabBarLabel: "Plan",
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
                <DotIndicator focused={focused} />
                <Ionicons
                  name="wallet"
                  size={24}
                  color={focused ? "#0898A0" : "#A0A0A0"}
                />
              </>
            ),
            tabBarLabel: "Wallet",
          }}
        /> */}
    </Tab.Navigator>
  );
};

export default MainStackNavigator;
