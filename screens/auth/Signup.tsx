import React, { useState } from "react";
import { View } from "react-native";
import SignUp from "../../components/Signup";
import About from "../../components/About";

type SignUpFormData = {
  email: string;
  password: string;
};

const SignUpScreen: React.FC = () => {
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
        return <SignUp next={handleEmailPasswordSubmit} />;
      case 2:
        return <About signUpData={emailPasswordData} prev={prevStep} />;

      default:
        <View></View>;
    }
    return <View></View>;
  };

  return renderForm();
};

export default SignUpScreen;
