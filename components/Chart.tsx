import React from "react";
import { View } from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";

const ChartScreen = () => {
  // Sample data for x-axis and y-axis
  const data = [0, 25000, 50000, 75000, 100000];
  const xLabels = ["2023", "2024", "2025", "2026", "2027"];

  return (
    <View>
      <LineChart
        style={{ height: 300 }}
        data={data}
        svg={{ stroke: "rgba(8, 152, 160, 1)" }} // Color of the line
        contentInset={{ top: 20, bottom: 20 }}
        yMin={0}
        yMax={100000}
        // xLabels={xLabels}
        xAccessor={({ index }) => index}
        yAccessor={({ item }) => item}
      >
        <Grid />
      </LineChart>
    </View>
  );
};

export default ChartScreen;
