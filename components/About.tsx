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
  Button,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DatePicker from "react-native-datepicker";
// import DatePicker from "@react-native-community/datetimepicker"
import DateTimePicker from "@react-native-community/datetimepicker";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fetchSession, signup, User } from "../store";

type AboutFormData = {
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: string;
  phone_number?: string;
};

type SignUpFormData = {
  email: string;
  password: string;
};

type ScreenProps = {
  prev: () => void;
  signUpData: SignUpFormData | null;
  navigation: NavigationProp<ParamListBase>;
};

const About: React.FC<ScreenProps> = ({ prev, signUpData, navigation }) => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AboutFormData>();

  const [focusedInput, setFocusedInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");

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

  const dispatch: any = useDispatch();

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const onSubmit = (data: AboutFormData) => {
    let signupFormData: User = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email_address: signUpData?.email,
      password: signUpData?.password,
      date_of_birth: data.date_of_birth,
    };
    let myData: {} = {
      data: signupFormData,
      navigation,
    };

    dispatch(signup(myData));
  };
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, date: any) => {
    setShowDatePicker(false);
    setSelectedDate(date);
    setValue("date_of_birth", date);
    handleFocus("date_of_birth");
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <TouchableOpacity
          style={{ marginBottom: 10, marginRight: 10 }}
          onPress={() => prev()}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color="#222222"
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Tell Us More About You</Text>

        <Text style={styles.subheading}>
          Please use your name as it appears on your ID.
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
                      borderColor: errors.first_name
                        ? "red"
                        : focusedInput === "first_name"
                        ? "#0898A0"
                        : "#E1E8ED",
                    },
                  ]}
                  placeholder={
                    focusedInput === "first_name" ? "" : "Legal First Name"
                  }
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onFocus={() => handleFocus("first_name")}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
                {focusedInput === "first_name" || value ? (
                  <Text
                    style={[
                      styles.floatingInput,
                      { color: errors.first_name ? "red" : "#0898A0" },
                    ]}
                  >
                    Legal First Name
                  </Text>
                ) : null}
              </View>
            )}
            name="first_name"
            rules={{
              required: "First Name is required",
            }}
            defaultValue=""
          />
          {errors.first_name && (
            <Text style={styles.error}>{errors.first_name.message}</Text>
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
                      borderColor: errors.last_name
                        ? "red"
                        : focusedInput === "last_name"
                        ? "#0898A0"
                        : "#E1E8ED",
                    },
                  ]}
                  placeholder={
                    focusedInput === "last_name" ? "" : "Legal Last Name"
                  }
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onFocus={() => handleFocus("last_name")}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
                {focusedInput === "last_name" || value ? (
                  <Text
                    style={[
                      styles.floatingInput,
                      { color: errors.last_name ? "red" : "#0898A0" },
                    ]}
                  >
                    Legal Last Name
                  </Text>
                ) : null}
              </View>
            )}
            name="last_name"
            rules={{
              required: "Last Name is required",
            }}
            defaultValue=""
          />
          {errors.last_name && (
            <Text style={styles.error}>{errors.last_name.message}</Text>
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
                      borderColor: errors.username
                        ? "red"
                        : focusedInput === "username"
                        ? "#0898A0"
                        : "#E1E8ED",
                    },
                  ]}
                  placeholder={focusedInput === "username" ? "" : "Username"}
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onFocus={() => handleFocus("username")}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
                {focusedInput === "username" || value ? (
                  <Text
                    style={[
                      styles.floatingInput,
                      { color: errors.username ? "red" : "#0898A0" },
                    ]}
                  >
                    Username
                  </Text>
                ) : null}
              </View>
            )}
            name="username"
            rules={{
              required: "Username is required",
            }}
            defaultValue=""
          />
          {errors.username && (
            <Text style={styles.error}>{errors.username.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            name="date_of_birth"
            defaultValue=""
            render={({ field }) => (
              <View>
                {Platform.OS === "ios" ? (
                  <>
                    <DatePicker
                      style={[
                        styles.datePicker,
                        {
                          borderColor: errors.date_of_birth
                            ? "red"
                            : focusedInput === "date_of_birth"
                            ? "#0898A0"
                            : "#E1E8ED",
                        },
                      ]}
                      date={selectedDate}
                      mode="date"
                      placeholder="Choose Date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: styles.dateInput,
                        dateText: styles.dateText,
                        placeholderText: styles.placeholderText,
                      }}
                      onDateChange={handleDateChange}
                    />
                    {selectedDate ? (
                      <Text
                        style={[
                          styles.floatingInput,
                          { color: errors.date_of_birth ? "red" : "#0898A0" },
                        ]}
                      >
                        Date of Birth
                      </Text>
                    ) : null}
                  </>
                ) : (
                  <View
                    style={[
                      styles.datePicker,
                      {
                        borderColor: errors.date_of_birth
                          ? "red"
                          : focusedInput === "date_of_birth"
                          ? "#0898A0"
                          : "#E1E8ED",
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={showDatepicker}
                      style={{
                        position: "absolute",
                        top: 15,
                        right: 5,
                      }}
                      activeOpacity={0.8}
                    >
                      <MaterialCommunityIcons
                        name="calendar-month"
                        size={20}
                        color="#0898A0"
                      />
                    </TouchableOpacity>
                    {selectedDate === "" ? (
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          color: "#999",
                          marginLeft: 3,
                        }}
                      >
                        Choose Date of Birth
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          color: "#292F33",
                          marginLeft: 3,
                        }}
                      >
                        {new Date(selectedDate).toISOString().split("T")[0]}
                      </Text>
                    )}

                    {selectedDate ? (
                      <Text
                        style={[
                          styles.floatingInput,
                          { color: errors.date_of_birth ? "red" : "#0898A0" },
                        ]}
                      >
                        Date of Birth
                      </Text>
                    ) : null}

                    {showDatePicker && (
                      <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                      />
                    )}
                  </View>
                )}
              </View>
            )}
          />
        </View>

        <TouchableOpacity
          style={[styles.button]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "400", color: "#71879C" }}>
            By clicking Continue, you agree to our
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#0898A0",
                marginHorizontal: 5,
              }}
            >
              Terms of Service
            </Text>
            and
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#0898A0",
                marginHorizontal: 20,
              }}
            >
              Privacy Policy.
            </Text>
          </Text>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 90,
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
  datePicker: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,

    marginBottom: 20,
    justifyContent: "center",
    width: "100%",

    position: "relative",
  },
  dateInput: {
    borderWidth: 0,
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#292F33",
  },
  placeholderText: {
    color: "#999999",
    fontSize: 15,
    fontWeight: "700",
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

export default About;
