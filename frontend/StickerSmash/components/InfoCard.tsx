import React from "react";
import { View, Text } from "react-native";
import { sunsetStyles } from "./styles";

interface InfoCardProps {
  label: string;
  value: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ label, value }) => {
  return (
    <View style={sunsetStyles.infoCard}>
      <Text style={sunsetStyles.infoLabel}>{label}</Text>
      <Text style={sunsetStyles.infoValue}>{value}</Text>
    </View>
  );
}; 