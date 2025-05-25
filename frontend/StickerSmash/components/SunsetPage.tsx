import React from "react";
import { View, Text, TextInput, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "./Header";
import { InfoCard } from "./InfoCard";
import { sharedStyles, sunsetStyles } from "./styles";

interface SunsetPageProps {
  location: string;
  setLocation: (location: string) => void;
  isLoading: boolean;
  onSearch: () => void;
}

export const SunsetPage: React.FC<SunsetPageProps> = ({
  location,
  setLocation,
  isLoading,
  onSearch,
}) => {
  return (
    <View style={sharedStyles.page}>
      <Header time="19:42" date="Today" />

      <View style={sharedStyles.mainContent}>
        <View style={sunsetStyles.sunsetCard}>
          <LinearGradient
            colors={["rgba(255, 107, 53, 0.1)", "rgba(255, 183, 77, 0.05)"]}
            style={sharedStyles.cardGradient}
          >
            <View style={sunsetStyles.sunIcon}>
              <LinearGradient
                colors={["#FFB74D", "#FF8A65"]}
                style={sunsetStyles.sunGradient}
              />
            </View>
            
            <Text style={sunsetStyles.sunsetLabel}>Sunset</Text>
            <Text style={sunsetStyles.sunsetTime}>
              {isLoading ? "--:--" : "19:42"}
            </Text>
            <Text style={sunsetStyles.sunsetSubtext}>
              {isLoading ? "Calculating..." : "Golden hour starts at 18:45"}
            </Text>
          </LinearGradient>
        </View>

        {/* Location Input */}
        <View style={sharedStyles.inputSection}>
          <Text style={sharedStyles.inputLabel}>Location</Text>
          <View style={sharedStyles.inputWrapper}>
            <TextInput
              style={sharedStyles.input}
              placeholder="Enter city or coordinates"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={location}
              onChangeText={setLocation}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={[
                sharedStyles.searchButton,
                (!location.trim() || isLoading) && sharedStyles.searchButtonDisabled,
              ]}
              onPress={onSearch}
              disabled={isLoading || !location.trim()}
            >
              {isLoading ? (
                <Animated.View style={sharedStyles.loadingSpinner} />
              ) : (
                <Text style={sharedStyles.searchButtonText}>→</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Info Cards */}
        <View style={sunsetStyles.infoCards}>
          <InfoCard label="Sunrise" value="06:24" />
          <InfoCard label="Day Length" value="13h 18m" />
        </View>

        <View style={sunsetStyles.infoCards}>
          <InfoCard label="Blue Hour" value="20:15" />
          <InfoCard label="Twilight" value="20:45" />
        </View>
      </View>
    </View>
  );
}; 