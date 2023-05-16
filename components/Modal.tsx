import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-native-datepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ChartScreen from "./Chart";
import CreatePlanDone from "../screens/dashboard/CreatePlanDone";
import { createplan } from "../store";
import { useDispatch } from "react-redux";

type FormData = {
  name?: string;
  target?: string;
  date?: string;
};

const Modals = ({
  toggleModal,
  isModalVisible,
  currentIndex,
  setCurrentIndex,
  token,
}: any) => {
  const screenHeight = Dimensions.get("window").height;
  const [focusedInput, setFocusedInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch: any = useDispatch();

  const handleDateChange = (event: any, date: any) => {
    setShowDatePicker(false);
    setSelectedDate(date);
    setValue("date", date);
    handleFocus("date");
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const totalSlides = 6;

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

  const handlePrevious = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSlides) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderView = () => {
    switch (currentIndex) {
      case 1:
        return (
          <View
            style={{
              // flex: 1,
              backgroundColor: "white",
              borderRadius: 8,
              padding: 16,
              paddingBottom: 100,
              justifyContent: "space-between",
              marginTop: StatusBar.currentHeight,
              width: "100%",
              height: screenHeight,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 36 / 2,
                    backgroundColor: "rgba(113, 135, 156, 0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <Ionicons name="md-close" size={24} color="#0898A0" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    textAlign: "center",
                    marginLeft: 50,
                  }}
                >
                  Create a plan
                </Text>
              </View>

              <Text
                style={{
                  color: "#71879C",
                  fontSize: 15,
                  marginTop: 30,
                  textAlign: "center",
                }}
              >
                Reach your goals faster
              </Text>
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 50,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/plan_image.png")}
                  resizeMode="cover"
                />
              </View>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 25,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 36 / 2,
                      backgroundColor: "rgba(113, 135, 156, 0.1)",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    <AntDesign name="question" size={20} color="#0898A0" />
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "700",
                        color: "#222222",
                      }}
                    >
                      Give us a few details
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: "#71879C",
                        fontSize: 13,
                        marginTop: 6,
                        width: 250,
                      }}
                    >
                      Tell us what you want to achieve and we will help you get
                      there
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 25,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 36 / 2,
                      backgroundColor: "rgba(113, 135, 156, 0.1)",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#0898A0"
                    />
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "700",
                        color: "#222222",
                      }}
                    >
                      Turn on auto-invest
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: "#71879C",
                        fontSize: 13,
                        marginTop: 6,
                        width: 250,
                      }}
                    >
                      The easiest way to get your investment working for you is
                      to fund to periodically.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 25,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 36 / 2,
                      backgroundColor: "rgba(113, 135, 156, 0.1)",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    <AntDesign name="setting" size={20} color="#0898A0" />
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "700",
                        color: "#222222",
                      }}
                    >
                      Modify as you progress
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: "#71879C",
                        fontSize: 13,
                        marginTop: 6,
                        width: 250,
                      }}
                    >
                      You are in charge. Make changes to your plan, from adding
                      funds, funding source, adding money to your wallet and
                      more.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#0898A0",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                borderRadius: 5,
                height: 50,
              }}
              onPress={handleNext}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 16,
              paddingBottom: 100,

              marginTop: StatusBar.currentHeight,
              width: "100%",
              height: screenHeight,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={styles.header}>
              {currentIndex > 1 && (
                <TouchableOpacity
                  onPress={handlePrevious}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 36 / 2,
                    backgroundColor: "rgba(113, 135, 156, 0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <AntDesign name="arrowleft" size={24} color="#0898A0" />
                </TouchableOpacity>
              )}
              <Text style={styles.goalName}>Goal Name</Text>
            </View>
            <Text style={styles.question}>
              Question {currentIndex - 1} of {totalSlides - 3}
            </Text>
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={(currentIndex - 1) / (totalSlides - 3)}
                color="#0898A0"
                style={styles.progressBar}
              />
            </View>
            <View style={{ marginTop: 60 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: "#222222",
                  marginBottom: 10,
                }}
              >
                What are you saving for ?
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
                            borderColor: errors.name
                              ? "red"
                              : focusedInput === "name"
                              ? "#0898A0"
                              : "#E1E8ED",
                          },
                        ]}
                        onBlur={onBlur}
                        onChangeText={(text) => {
                          onChange(text);
                          setName(text);
                        }}
                        value={value}
                        autoCapitalize="none"
                        onFocus={() => handleFocus("name")}
                      />
                    </View>
                  )}
                  name="name"
                  rules={{
                    required: "Target Name is required",
                  }}
                  defaultValue=""
                />
                {errors.name && (
                  <Text style={styles.error}>{errors.name.message}</Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleSubmit((data) => {
                console.log(data);
                handleNext();
              })}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === totalSlides ? "Finish" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 16,
              paddingBottom: 100,

              marginTop: StatusBar.currentHeight,
              width: "100%",
              height: screenHeight,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={styles.header}>
              {currentIndex > 1 && (
                <TouchableOpacity
                  onPress={handlePrevious}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 36 / 2,
                    backgroundColor: "rgba(113, 135, 156, 0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <AntDesign name="arrowleft" size={24} color="#0898A0" />
                </TouchableOpacity>
              )}
              <Text style={styles.goalName}>Target Amount </Text>
            </View>
            <Text style={styles.question}>
              Question {currentIndex - 1} of {totalSlides - 3}
            </Text>
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={(currentIndex - 1) / (totalSlides - 3)}
                color="#0898A0"
                style={styles.progressBar}
              />
            </View>
            <View style={{ marginTop: 60 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: "#222222",
                  marginBottom: 10,
                }}
              >
                How much do need?
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
                            borderColor: errors.target
                              ? "red"
                              : focusedInput === "target"
                              ? "#0898A0"
                              : "#E1E8ED",
                          },
                        ]}
                        onBlur={onBlur}
                        onChangeText={(text) => {
                          onChange(text);
                          setAmount(text);
                        }}
                        value={value}
                        autoCapitalize="none"
                        onFocus={() => handleFocus("target")}
                        keyboardType={"number-pad"}
                      />
                    </View>
                  )}
                  name="target"
                  rules={{
                    required: "Target Amount is required",
                  }}
                  defaultValue=""
                />
                {errors.target && (
                  <Text style={styles.error}>{errors.target.message}</Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleSubmit((data) => {
                console.log(data);
                handleNext();
              })}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === totalSlides ? "Finish" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 4:
        return (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 16,
              paddingBottom: 100,

              marginTop: StatusBar.currentHeight,
              width: "100%",
              height: screenHeight,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={styles.header}>
              {currentIndex > 1 && (
                <TouchableOpacity
                  onPress={handlePrevious}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 36 / 2,
                    backgroundColor: "rgba(113, 135, 156, 0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <AntDesign name="arrowleft" size={24} color="#0898A0" />
                </TouchableOpacity>
              )}
              <Text style={styles.goalName}>Target Date</Text>
            </View>
            <Text style={styles.question}>
              Question {currentIndex - 1} of {totalSlides - 3}
            </Text>
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={(currentIndex - 1) / (totalSlides - 3)}
                color="#0898A0"
                style={styles.progressBar}
              />
            </View>
            <View style={{ marginTop: 60 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: "#222222",
                  marginBottom: 10,
                }}
              >
                When do you want to withdraw ?
              </Text>
              <View>
                <Controller
                  control={control}
                  name="date"
                  defaultValue=""
                  render={({ field }) => (
                    <View>
                      {Platform.OS === "ios" ? (
                        <>
                          <DatePicker
                            style={[
                              styles.datePicker,
                              {
                                borderColor: errors.date
                                  ? "red"
                                  : focusedInput === "date"
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
                            }}
                            onDateChange={handleDateChange}
                          />
                        </>
                      ) : (
                        <View
                          style={[
                            styles.datePicker,
                            {
                              borderColor: errors.date
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
                              Choose Date
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
                              {
                                new Date(selectedDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </Text>
                          )}

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
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleSubmit((data) => {
                console.log(data);
                handleNext();
              })}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === totalSlides ? "Finish" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 5:
        return (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 16,
              paddingBottom: 100,

              marginTop: StatusBar.currentHeight,
              width: "100%",
              height: screenHeight,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={styles.header}>
              {currentIndex > 1 && (
                <TouchableOpacity
                  onPress={handlePrevious}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 36 / 2,
                    backgroundColor: "rgba(113, 135, 156, 0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <AntDesign name="arrowleft" size={24} color="#0898A0" />
                </TouchableOpacity>
              )}
              <Text style={styles.goalName}>Review</Text>
            </View>

            <View style={{ marginTop: 24, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#71879C",
                  marginBottom: 5,
                }}
              >
                {name}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#000",
                  marginBottom: 5,
                }}
              >
                ₦{amount}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: "#333333",
                  marginBottom: 10,
                }}
              >
                by{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>

            <View>
              <ChartScreen />
            </View>

            <View
              style={{
                backgroundColor: "#71879C0D",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderRadius: 8,
                marginVertical: 35,
              }}
            >
              <MaterialCommunityIcons
                name="information-outline"
                size={20}
                color="#0898A0"
              />
              <Text
                style={{
                  fontSize: 15,
                  color: "#71879C",
                  width: 250,
                  marginLeft: 30,
                }}
              >
                Returns not guaranteed. Investing involves risk. Read our
                Disclosures.
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: "#71879C",
                textAlign: "center",
                width: 300,
              }}
            >
              These are your starting settings, they can always be updated.
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleSubmit((data) => {
                let myData: {
                  data: {};
                  token: any;
                  handleNext: () => void;
                } = {
                  data: {
                    plan_name: data.name,
                    target_amount: data.target,
                    maturity_date: "2025-01-01",
                  },
                  token,
                  handleNext,
                };
                dispatch(createplan(myData));
              })}
            >
              <Text style={styles.nextButtonText}>Agree & Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#71879C1A",
                borderRadius: 5,
                marginTop: 10,
                padding: 10,
              }}
              onPress={() => {
                setCurrentIndex(1);
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  textAlign: "center",
                  color: "#0898A0",
                }}
              >
                Start Over
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 6:
        return (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 16,
              paddingBottom: 100,

              marginTop: StatusBar.currentHeight,
              width: "100%",
              height: screenHeight,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <CreatePlanDone toggleModal={toggleModal} />
          </View>
        );

      default:
        <View></View>;
    }
    return <View></View>;
  };
  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
      onBackdropPress={toggleModal}
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 0,
      }}
    >
      <SafeAreaView style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <StatusBar barStyle={"dark-content"} translucent />
      </SafeAreaView>
      {renderView()}
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  goalName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 80,
  },
  question: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "400",
    color: "#71879C",
  },
  progressContainer: {
    marginTop: 20,
    width: "100%",
  },
  progressBar: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "#71879C1A",
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
  error: {
    color: "red",
    marginVertical: 2,
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
  nextButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#0898A0",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
});
