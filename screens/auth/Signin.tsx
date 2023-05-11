import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type SignUpFormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum of 8 characters required")
    .matches(/[A-Z]/, "One UPPERCASE character required")
    .matches(/[\W_]/, "One unique character required"),
});

const SignInScreen: React.FC = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setFocusedInput("");
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        {/* <View style={styles.container}> */}
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subheading}>
          Let’s get you logged in to get back to building your
          dollar-denominated investment portfolio.
        </Text>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.email
                        ? "red"
                        : focusedInput === "email"
                        ? "#0898A0"
                        : "#E1E8ED",
                    },
                  ]}
                  placeholder={focusedInput === "email" ? "" : "Email address"}
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onFocus={() => handleFocus("email")}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
                {focusedInput === "email" || value ? (
                  <Text
                    style={[
                      styles.floatingInput,
                      { color: errors.email ? "red" : "#0898A0" },
                    ]}
                  >
                    Email address
                  </Text>
                ) : null}
              </View>
            )}
            name="email"
            rules={{
              required: "Email address is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
            defaultValue=""
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.password
                        ? "red"
                        : focusedInput === "password"
                        ? "#0898A0"
                        : "#E1E8ED",
                    },
                  ]}
                  placeholder={focusedInput === "password" ? "" : "Password"}
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  onFocus={() => handleFocus("password")}
                />
                {focusedInput === "password" || value ? (
                  <Text
                    style={[
                      styles.floatingInput,
                      { color: errors.password ? "red" : "#0898A0" },
                    ]}
                  >
                    Password
                  </Text>
                ) : null}
              </View>
            )}
            name="password"
            rules={{
              required: "Password is required",
              validate: {
                minLength: (value) =>
                  value.length >= 8 || "Minimum of 8 characters required",
                uppercase: (value) =>
                  /[A-Z]/.test(value) || "One UPPERCASE character required",
                unique: (value) =>
                  /[\W_]/.test(value) || "One unique character required",
              },
            }}
            defaultValue=""
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
          <IconButton
            icon={showPassword ? "eye-off" : "eye"}
            size={20}
            iconColor="#0898A0"
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          />
        </View>

        <TouchableOpacity
          style={[styles.button]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#0898A0" }}>
              I forgot my password
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#71879C" }}>
            Have an account?
          </Text>
          <TouchableOpacity style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#0898A0" }}>
              I forgot my password
            </Text>
          </TouchableOpacity>
        </View> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 17,
  },
  heading: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 11,
    color: "#222222",
  },
  subheading: {
    fontSize: 15,
    textAlign: "left",
    marginBottom: 30,
    color: "#71879C",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
    position: "relative",
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "700",
    color: "#292F33",
  },
  floatingInput: {
    position: "absolute",
    left: 10,
    top: -7,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    fontSize: 10,
    fontWeight: "700",
  },
  error: {
    color: "red",
    marginVertical: 2,
  },
  eyeIcon: {
    position: "absolute",
    right: -5,
    top: 0,
  },
  button: {
    backgroundColor: "#0898A0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default SignInScreen;
