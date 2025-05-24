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
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Fade in and slide up animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.time}>19:42</Text>
              <Text style={styles.date}>Today</Text>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              <View style={styles.sunsetCard}>
                <LinearGradient
                  colors={["rgba(255, 107, 53, 0.1)", "rgba(255, 183, 77, 0.05)"]}
                  style={styles.cardGradient}
                >
                  <View style={styles.sunIcon}>
                    <LinearGradient
                      colors={["#FFB74D", "#FF8A65"]}
                      style={styles.sunGradient}
                    />
                  </View>
                  
                  <Text style={styles.sunsetLabel}>Sunset</Text>
                  <Text style={styles.sunsetTime}>
                    {isLoading ? "--:--" : "19:42"}
                  </Text>
                  <Text style={styles.sunsetSubtext}>
                    {isLoading ? "Calculating..." : "Golden hour starts at 18:45"}
                  </Text>
                </LinearGradient>
              </View>

              {/* Location Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Location</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter city or coordinates"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={location}
                    onChangeText={setLocation}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    style={[
                      styles.searchButton,
                      (!location.trim() || isLoading) && styles.searchButtonDisabled,
                    ]}
                    onPress={handleSearch}
                    disabled={isLoading || !location.trim()}
                  >
                    {isLoading ? (
                      <Animated.View style={styles.loadingSpinner} />
                    ) : (
                      <Text style={styles.searchButtonText}>→</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Additional Info Cards */}
              <View style={styles.infoCards}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>Sunrise</Text>
                  <Text style={styles.infoValue}>06:24</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>Day Length</Text>
                  <Text style={styles.infoValue}>13h 18m</Text>
                </View>
              </View>

              <View style={styles.infoCards}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>Blue Hour</Text>
                  <Text style={styles.infoValue}>20:15</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.infoLabel}>Twilight</Text>
                  <Text style={styles.infoValue}>20:45</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight || 44,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  time: {
    fontSize: 48,
    fontWeight: "200",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  date: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
    fontWeight: "400",
  },
  mainContent: {
    flex: 1,
  },
  sunsetCard: {
    marginBottom: 32,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sunIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 16,
    overflow: "hidden",
  },
  sunGradient: {
    flex: 1,
    borderRadius: 30,
  },
  sunsetLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 4,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sunsetTime: {
    fontSize: 36,
    fontWeight: "200",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: -1,
  },
  sunsetSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "400",
  },
  inputSection: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  searchButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  searchButtonDisabled: {
    opacity: 0.3,
  },
  searchButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  loadingSpinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  infoCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  infoLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 8,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "300",
    letterSpacing: -0.5,
  },
});
