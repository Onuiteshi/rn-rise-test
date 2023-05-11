import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

type ScreenProps = {
  onNext: () => void;
  onBack: () => void;
};

const Onboarding: React.FC<ScreenProps> = ({ onNext, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [images] = useState([
    require("../assets/quality.png"),
    require("../assets/superior.png"),
    require("../assets/better.png"),
  ]);
  const [texts] = useState([
    "Quality assets",
    "Superior Selection",
    "Better Performance",
  ]);
  const [subTexts] = useState([
    "Rise invests your money into the best dollar investments around the world.",
    "Our expert team and intelligent algorithms select assets that beat the markets.",
    "You earn more returns, achieve more of your financial goals and protect your money from devaluation.",
  ]);
  const [backgroundColors] = useState(["#FEFAF7", "#FDF4F9", "#F6FFFE"]);
  const [colors] = useState(["#FE7122", "#B80074", "#0898A0"]);

  const handleNext = () => {
    onNext();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleBack = () => {
    onBack();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const isLastIndex = currentIndex === images.length - 1;

  const handleSwipeLeft = () => {
    if (!isLastIndex) {
      handleNext();
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex !== 0) {
      handleBack();
    }
  };

  return (
    // <Swipeable
    //   onSwipeableWillOpen={(event) => {
    //     if (event === "left") {
    //       handleSwipeLeft();
    //     }
    //   }}
    //   onSwipeableWillClose={(event) => {
    //     if (event === "right") {
    //       handleSwipeRight();
    //     }
    //   }}
    // >
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        { backgroundColor: backgroundColors[currentIndex] },
      ]}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Image source={images[currentIndex]} style={styles.image} />
        <View style={styles.indicatorContainer}>
          {images.map((image, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    index === currentIndex ? colors[index] : "#71879C1A",
                  opacity: index === currentIndex ? 1 : 0.5,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={[styles.text, { color: colors[currentIndex] }]}>
          {texts[currentIndex]}
        </Text>
        <Text style={{ fontSize: 15, color: "#222222" }}>
          {subTexts[currentIndex]}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#71879C1A" }]}
          onPress={handleBack}
          disabled={currentIndex === 0}
        >
          <Feather
            name="arrow-left"
            size={24}
            color={currentIndex === 0 ? "#94A1AD" : colors[currentIndex]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#71879C1A" }]}
          onPress={handleNext}
          disabled={currentIndex === images.length - 1}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  currentIndex === images.length - 1
                    ? "#94A1AD"
                    : colors[currentIndex],
              },
            ]}
          >
            Next
          </Text>
          <Feather
            name="arrow-right"
            size={24}
            color={
              currentIndex === images.length - 1
                ? "#94A1AD"
                : colors[currentIndex]
            }
          />
        </TouchableOpacity>
      </View>

      {isLastIndex && (
        <View style={styles.finalButtonsContainer}>
          <TouchableOpacity
            style={[styles.signupButton, { backgroundColor: "#0898A0" }]}
            onPress={() => {}}
          >
            <Text style={styles.signupButtonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.signinButton,
              { backgroundColor: "rgba(113, 135, 156, 0.1)" },
            ]}
            onPress={() => {}}
          >
            <Text style={styles.signinButtonText}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.bottomSpace} />
        </View>
      )}
    </ScrollView>
    // </Swipeable>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 90,

    flexGrow: 1,
    width: windowWidth,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 7 / 3,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#000",
    height: 12, // Thicker indicator for active image
  },
  text: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "500",
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginRight: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  finalButtonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 20,
  },
  signupButton: {
    backgroundColor: "#0898A0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 335,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signinButton: {
    backgroundColor: "rgba(113, 135, 156, 0.1)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: 335,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signinButtonText: {
    color: "#0898A0",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSpace: {
    height: 100,
  },
});

export default Onboarding;
