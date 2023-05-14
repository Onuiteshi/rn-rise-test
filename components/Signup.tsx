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
import { NavigationProp, ParamListBase } from "@react-navigation/native";

type SignUpFormData = {
  email: string;
  password: string;
};

type Props = {
  navigation: NavigationProp<ParamListBase>;
  next: (data: SignUpFormData) => void;
};

const SignUp: React.FC<Props> = ({ navigation, next }) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
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

  const handleSignin = () => {
    navigation.navigate("Signin");
  };

  const onSubmit = (data: SignUpFormData) => {
    next(data);
  };

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const minLengthRegex = /.{8,}/;
  const uppercaseRegex = /^(?=.*[A-Z]).+$/;
  const uniqueRegex = /^(?=.*[!@#$%^&*?]).+$/;

  const isPasswordValid = () => {
    const minLengthRegex = /.{8,}/;
    const uppercaseRegex = /^(?=.*[A-Z]).+$/;
    const uniqueRegex = /^(?=.*[!@#$%^&*?]).+$/;

    return (
      minLengthRegex.test(password) &&
      uppercaseRegex.test(password) &&
      uniqueRegex.test(password)
    );
  };

  const isMinLengthRegexValid = () => {
    return minLengthRegex.test(password);
  };
  const isUppercaseRegexValid = () => {
    return uppercaseRegex.test(password);
  };
  const isUniqueRegexValid = () => {
    return uniqueRegex.test(password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        {/* <View style={styles.container}> */}
        <Text style={styles.heading}>Create an account</Text>
        <Text style={styles.subheading}>
          Start building your dollar-denominated investment portfolio
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
                  keyboardType={"email-address"}
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

        <View style={{ marginBottom: 19, marginTop: 3 }}>
          <View style={styles.indicatorContainer}>
            <MaterialCommunityIcons
              name={
                isMinLengthRegexValid()
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={16}
              color={isMinLengthRegexValid() ? "#0898A0" : "#cccccc"}
            />
            <Text style={styles.indicatorText}>Minimum of 8 characters</Text>
          </View>

          <View style={styles.indicatorContainer}>
            <MaterialCommunityIcons
              name={
                isUppercaseRegexValid()
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={16}
              color={isUppercaseRegexValid() ? "#0898A0" : "#cccccc"}
            />
            <Text style={styles.indicatorText}>One UPPERCASE character</Text>
          </View>

          <View style={styles.indicatorContainer}>
            <MaterialCommunityIcons
              name={
                isUniqueRegexValid()
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={16}
              color={isUniqueRegexValid() ? "#0898A0" : "#cccccc"}
            />
            <Text style={styles.indicatorText}>
              One unique character (e.g: !@#$%^&*?)
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { opacity: isPasswordValid() ? 1 : 0.5 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isPasswordValid()}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View
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
          <TouchableOpacity onPress={handleSignin} style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#0898A0" }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 17,
    backgroundColor: "#fff",
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
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  indicatorText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "400",
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

export default SignUp;
