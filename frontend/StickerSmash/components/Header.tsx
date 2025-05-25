import React from "react";
import { View, Text } from "react-native";
import { sharedStyles } from "./styles";

interface HeaderProps {
  time: string;
  date: string;
}

export const Header: React.FC<HeaderProps> = ({ time, date }) => {
  return (
    <View style={sharedStyles.header}>
      <Text style={sharedStyles.time}>{time}</Text>
      <Text style={sharedStyles.date}>{date}</Text>
    </View>
  );
}; 