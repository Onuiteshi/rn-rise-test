import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Completed from "../../components/Completed";
import { useSelector } from "react-redux";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface Props {
  toggleModal: any;
}

const CreatePlanDone: React.FC<Props> = ({ toggleModal }) => {
  const user = useSelector((state: any) => state.user.user);
  return (
    <Completed
      title="You just created your plan."
      subTitle={`Well done, ${user?.first_name}`}
      buttonText="Okay"
      toggleModal={toggleModal}
    />
  );
};

export default CreatePlanDone;

const styles = StyleSheet.create({});
