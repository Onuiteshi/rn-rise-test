import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  RefreshControl,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  Feather,
  EvilIcons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import Modals from "../../components/Modal";
import { fetchPlans, fetchSession } from "../../store";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Index: React.FC<Props> = ({ navigation }) => {
  const [greeting, setGreeting] = useState("");
  const [isMorning, setIsMorning] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [index, setIndex] = useState(1);
  const [showText, setShowText] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    const fetchUserSession = async () => {
      await dispatch(fetchSession(token));
    };
    const fetchUserPlans = async () => {
      await dispatch(fetchPlans(token));
    };

    fetchUserSession();
    fetchUserPlans();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const hiddenText = "****";

  const toggleText = () => {
    setShowText(!showText);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIndex(1);
  };

  const navigations: any = useNavigation();
  const dispatch: any = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const token = useSelector((state: any) => state.user.token);
  const plans = useSelector((state: any) => state.user.plans);

  //   console.warn(plans);

  const [slide] = useState(["1", "2", "3"]);

  useEffect(() => {
    const currentTime = new Date().getHours();
    setIsMorning(currentTime >= 0 && currentTime < 17);
    if (currentTime >= 0 && currentTime < 12) {
      setGreeting("Good morning");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    const fetchUserSession = async () => {
      await dispatch(fetchSession(token));
    };
    const fetchUserPlans = async () => {
      await dispatch(fetchPlans(token));
    };

    fetchUserSession();
    fetchUserPlans();
  }, []);

  const [cards, setCards] = useState<any>([]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <ImageBackground
        source={require("../../assets/image_33.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "#FFFFFF",
            "rgba(255, 255, 255, 0.0625)",
            "rgba(0, 0, 0, 0)",
          ]}
          style={styles.gradient}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 15 }}>
                {greeting}{" "}
                <Ionicons
                  name={isMorning ? "md-sunny" : "md-moon"}
                  size={16}
                  color={isMorning ? "#FFD700" : "blue"}
                />
              </Text>
              <Text style={{ fontSize: 20 }}>{user?.first_name}</Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#0898A0",
                borderRadius: 16,
                height: 30,
                width: 110,
                paddingVertical: 8,
                paddingHorizontal: 16,
                marginLeft: 10,
              }}
              onPress={() => {
                // Handle button press
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>
                Earn 3% bonus
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "transparent",
                borderRadius: 40 / 2,
                width: 40,
                height: 40,
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="notifications" size={24} color="#0898A0" />
              <View
                style={{
                  position: "absolute",
                  top: 2,
                  right: 4,
                  backgroundColor: "red",
                  borderRadius: 15 / 2,
                  width: 15,
                  height: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 9 }}>9+</Text>
              </View>
            </View>
          </View>

          <View>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Total Balance</Text>
                <Ionicons
                  name={showText ? "eye-off" : "eye"}
                  onPress={toggleText}
                  size={16}
                  color="#0898A0"
                />
              </View>
              <Text style={styles.cardValue}>
                &#x20A6;
                {showText ? user.total_balance.toFixed(2) : hiddenText}
              </Text>
              <View style={styles.separator} />
              <View style={styles.cardFooter}>
                <Text style={[styles.cardFooterText, { color: "#71879C" }]}>
                  Total Gains
                </Text>
                <Text
                  style={[
                    styles.cardFooterText,
                    { color: "#27BF41", marginLeft: 5 },
                  ]}
                >
                  {`\u2197`}
                  0.00%
                </Text>
              </View>
              <View style={styles.indicatorContainer}>
                {slide.map((image, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      {
                        backgroundColor:
                          index === currentIndex ? "#0898A0" : "#71879C1A",
                        opacity: index === currentIndex ? 1 : 0.5,
                        width: index === currentIndex ? 12 : 5,
                      },
                    ]}
                  />
                ))}
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View
        style={{
          paddingBottom: 50,
        }}
      >
        {/* Add Money Button */}
        <TouchableOpacity
          style={[styles.addButton, { marginHorizontal: 16 }]}
          onPress={() => console.log("Add money button pressed")}
        >
          {/* Plus Icon */}
          <Feather name="plus" size={21} color="#0898A0" />
          <Text style={styles.addMoneyText}>Add money</Text>
        </TouchableOpacity>

        {/* Create Plan */}
        <View style={styles.plan}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, color: "#000", fontWeight: "500" }}>
              {plans.item_count > 0 ? "Your plans" : "Create a plan"}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 14,
                  color: plans.item_count > 0 ? "#0898A0" : "#94A1AD",
                  fontWeight: "700",
                }}
              >
                View all plans
              </Text>
              <EvilIcons
                name="chevron-right"
                size={20}
                color={cards.length > 0 ? "#0898A0" : "#94A1AD"}
              />
            </View>
          </View>
          {plans.item_count > 0 ? null : (
            <View>
              <Text style={{ color: "#71879C", fontSize: 15, marginTop: 12 }}>
                Start your investment journey by creating a plan
              </Text>
            </View>
          )}

          <View style={{ marginVertical: 17 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.planAddButtons}
                onPress={toggleModal}
              >
                <Ionicons name="add-circle-outline" size={48} color="#41BCC4" />
                <Text style={styles.planAddText}>
                  Create an investment plan
                </Text>
              </TouchableOpacity>

              {plans.items?.map((plan: any) => (
                // <View key={plan.id} style={styles.planCards}>
                <ImageBackground
                  key={plan.id}
                  style={styles.planCards}
                  source={require("../../assets/plans.png")}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View>
                    <Text style={styles.planCardText}>{plan.plan_name}</Text>
                    <Text
                      style={{ color: "#fff", fontSize: 18, marginVertical: 3 }}
                    >
                      &#x20A6;{plan.target_amount}
                    </Text>
                    <Text style={styles.planCardText}>Mixed assets</Text>
                  </View>
                </ImageBackground>
                // </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={[
              {
                flexDirection: "row",
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 12,
              },
              Platform.OS === "android"
                ? { elevation: 5 }
                : {
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 20,
                    shadowOpacity: 1,
                    shadowColor: "rgba(53, 71, 89, 0.15)",
                  },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: "rgba(113, 135, 156, 0.1)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                <AntDesign name="question" size={15} color="#0898A0" />
              </View>
              <Text style={{ fontSize: 15, color: "#171C22" }}>Need help?</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#0898A0",
                borderRadius: 6,
                width: 120,
                height: 40,
                paddingVertical: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>Contact us</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "#0898A0",
              borderWidth: 2,
              borderColor: "#41BCC4",
              borderRadius: 15,
              padding: 16,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
              TODAY’S QUOTE
            </Text>
            <View
              style={{
                marginVertical: 15,
                backgroundColor: "#fff",
                width: 30,
                height: 1,
              }}
            />
            <View>
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "400" }}>
                We have no intention of rotating capital out of strong
                multi-year investments because they’ve recently done well or
                because ‘growth’ has out performed ‘value’.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
                Carl Sagan
              </Text>
              <TouchableOpacity
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 42 / 2,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="share" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: 30,
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/RISE.png")}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <Modals
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        currentIndex={index}
        setCurrentIndex={setIndex}
        token={token}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    height: 220,
    // flex: 1,
  },
  gradient: {
    // paddingBottom: 50,
    paddingHorizontal: 16,
  },

  card: {
    // ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    padding: 16,
    // marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 15,
    marginRight: 8,
    color: "#71879C",
  },
  cardValue: {
    fontSize: 30,
    color: "#333333",
    fontWeight: "bold",
    marginBottom: 13,
  },
  separator: {
    height: 1,
    width: 197,
    backgroundColor: "rgba(113, 135, 156, 0.1)",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardFooterText: {
    fontSize: 14,
    color: "#808080",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 7 / 2,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#71879C33",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  addMoneyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0898A0",
    marginLeft: 8,
  },
  plan: {
    marginVertical: 15,
    paddingLeft: 16,
  },
  planCards: {
    width: 180,
    height: 240,
    backgroundColor: "#71879C1A",
    borderRadius: 12,
    marginHorizontal: 8,
    padding: 16,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  planCardText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#fff",
  },
  planAddButtons: {
    width: 180,
    height: 240,
    backgroundColor: "#71879C1A",
    borderRadius: 12,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  planAddText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
    marginTop: 8,
    textAlign: "center",
  },
});

export default Index;
