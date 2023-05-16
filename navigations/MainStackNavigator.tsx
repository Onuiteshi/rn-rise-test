import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import Index from "../screens/dashboard";
import Plans from "../screens/plans";
import Wallet from "../screens/wallet";
import Account from "../screens/account";
import Feeds from "../screens/feeds";

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
              <Ionicons
                name="home"
                size={24}
                color={focused ? "#0898A0" : "#A0A0A0"}
              />
              <DotIndicator focused={focused} />
            </>
          ),
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen
        name="Plan"
        component={Plans}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Ionicons
                name="calendar"
                size={24}
                color={focused ? "#0898A0" : "#A0A0A0"}
              />
              <DotIndicator focused={focused} />
            </>
          ),
          tabBarLabel: "Plan",
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Ionicons
                name="wallet"
                size={24}
                color={focused ? "#0898A0" : "#A0A0A0"}
              />
              <DotIndicator focused={focused} />
            </>
          ),
          tabBarLabel: "Wallet",
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feeds}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <MaterialIcons
                name="dynamic-feed"
                size={24}
                color={focused ? "#0898A0" : "#A0A0A0"}
              />

              <DotIndicator focused={focused} />
            </>
          ),
          tabBarLabel: "Feed",
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <MaterialIcons
                name="account-circle"
                size={24}
                color={focused ? "#0898A0" : "#A0A0A0"}
              />
              <DotIndicator focused={focused} />
            </>
          ),
          tabBarLabel: "Account",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStackNavigator;
