import React, { useState } from "react";
import { View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import About from "../../components/About";
import SignUp from "../../components/SignUp";

type SignUpFormData = {
  email: string;
  password: string;
};

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [emailPasswordData, setEmailPasswordData] =
    useState<SignUpFormData | null>(null);

  const [step, setStep] = useState(1);

  const handleEmailPasswordSubmit = (data: SignUpFormData) => {
    setEmailPasswordData(data);
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <SignUp next={handleEmailPasswordSubmit} navigation={navigation} />
        );
      case 2:
        return (
          <About
            signUpData={emailPasswordData}
            prev={prevStep}
            navigation={navigation}
          />
        );

      default:
        <View></View>;
    }
    return <View></View>;
  };

  return renderForm();
};

export default SignUpScreen;
