import React from "react";
import { View } from "react-native";
import { sharedStyles } from "./styles";

interface PageIndicatorsProps {
  currentPage: number;
  totalPages: number;
}

export const PageIndicators: React.FC<PageIndicatorsProps> = ({ currentPage, totalPages }) => {
  return (
    <View style={sharedStyles.pageIndicators}>
      {Array.from({ length: totalPages }, (_, index) => (
        <View
          key={index}
          style={[
            sharedStyles.dot,
            currentPage === index && sharedStyles.activeDot,
          ]}
        />
      ))}
    </View>
  );
}; 