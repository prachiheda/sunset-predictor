import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Fade in animation on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isLoading) {
      // Pulsing animation for loading
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isLoading]);

  const handleSearch = () => {
    if (location.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#FF6B35", "#F7931E", "#FFD23F", "#8B5A96", "#4A148C"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[styles.content, { opacity: fadeAnim }]}
        >
          {/* Sun Icon */}
          <Animated.View
            style={[
              styles.sunContainer,
              isLoading && { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View style={styles.sun}>
              <View style={styles.sunCore} />
              {[...Array(8)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.sunRay,
                    {
                      transform: [{ rotate: `${i * 45}deg` }],
                    },
                  ]}
                />
              ))}
            </View>
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>Sunset Predictor</Text>
          <Text style={styles.subtitle}>
            Discover magical sunset times anywhere
          </Text>

          {/* Input Section */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter location (e.g., New York, NY)"
              placeholderTextColor="#FFB74D"
              value={location}
              onChangeText={setLocation}
              editable={!isLoading}
            />
            
            <TouchableOpacity
              style={[
                styles.searchButton,
                isLoading && styles.searchButtonDisabled,
              ]}
              onPress={handleSearch}
              disabled={isLoading || !location.trim()}
            >
              {isLoading ? (
                <Animated.View
                  style={[
                    styles.loadingDot,
                    { transform: [{ scale: pulseAnim }] },
                  ]}
                />
              ) : (
                <Text style={styles.searchButtonText}>Find Sunset</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Loading Text */}
          {isLoading && (
            <Animated.Text
              style={[
                styles.loadingText,
                { opacity: pulseAnim },
              ]}
            >
              Searching for the perfect sunset...
            </Animated.Text>
          )}
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  sunContainer: {
    marginBottom: 40,
  },
  sun: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  sunCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFE082",
    shadowColor: "#FF8F00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  sunRay: {
    position: "absolute",
    width: 4,
    height: 25,
    backgroundColor: "#FFE082",
    borderRadius: 2,
    top: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFE0B2",
    textAlign: "center",
    marginBottom: 50,
    fontStyle: "italic",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  searchButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    minWidth: 150,
    alignItems: "center",
  },
  searchButtonDisabled: {
    opacity: 0.7,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    color: "#FFE0B2",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
});
