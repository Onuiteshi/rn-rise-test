import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { signout } from "../../store";
import { useSelector } from "react-redux";

const Account: React.FC = () => {
  const signOut = () => {
    signout();
  };
  const user = useSelector((state: any) => state.user.user);
  const token = useSelector((state: any) => state.user.token);
  console.log(token);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#0898A0",
          padding: 16,
          borderRadius: 8,
          width: 300,
          alignItems: "center",
        }}
        onPress={signOut}
      >
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#fff" }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
