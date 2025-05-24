import React, { useState, useEffect, useRef } from "react";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [outfitPrompt, setOutfitPrompt] = useState("");
  const [outfitRecommendation, setOutfitRecommendation] = useState("");
  const [isGettingOutfit, setIsGettingOutfit] = useState(false);
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scrollViewRef = useRef(null);

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

  const handleOutfitRequest = () => {
    if (outfitPrompt.trim()) {
      setIsGettingOutfit(true);
      // Simulate ChatGPT API call
      setTimeout(() => {
        setOutfitRecommendation(
          "For tonight's sunset viewing, I recommend:\n\n• A light sweater or cardigan (temperature drops after sunset)\n• Comfortable walking shoes with good grip\n• A light jacket or windbreaker\n• Sunglasses for the golden hour\n• A small backpack for your camera and snacks\n\nThe colors orange, burgundy, or earth tones would complement the sunset beautifully in photos!"
        );
        setIsGettingOutfit(false);
      }, 3000);
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const page = Math.round(scrollPosition / width);
    setCurrentPage(page);
  };

  const renderSunsetPage = () => (
    <View style={styles.page}>
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
    </View>
  );

  const renderOutfitPage = () => (
    <View style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.time}>👕</Text>
        <Text style={styles.date}>Outfit Recommendations</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.outfitCard}>
          <LinearGradient
            colors={["rgba(138, 90, 150, 0.1)", "rgba(74, 20, 140, 0.05)"]}
            style={styles.cardGradient}
          >
            <Text style={styles.outfitTitle}>What to Wear</Text>
            <Text style={styles.outfitSubtext}>
              Get AI-powered outfit recommendations for your sunset adventure
            </Text>
          </LinearGradient>
        </View>

        {/* Prompt Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Ask for Recommendations</Text>
          <View style={styles.promptWrapper}>
            <TextInput
              style={styles.promptInput}
              placeholder="e.g., What should I wear for sunset photography in 65°F weather?"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={outfitPrompt}
              onChangeText={setOutfitPrompt}
              multiline
              editable={!isGettingOutfit}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.askButton,
              (!outfitPrompt.trim() || isGettingOutfit) && styles.searchButtonDisabled,
            ]}
            onPress={handleOutfitRequest}
            disabled={isGettingOutfit || !outfitPrompt.trim()}
          >
            {isGettingOutfit ? (
              <Animated.View style={styles.loadingSpinner} />
            ) : (
              <Text style={styles.askButtonText}>Ask ChatGPT</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Recommendation Display */}
        {outfitRecommendation ? (
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationLabel}>Recommendation</Text>
            <ScrollView style={styles.recommendationScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.recommendationText}>{outfitRecommendation}</Text>
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  );

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
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.horizontalScroll}
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
            {renderSunsetPage()}
          </Animated.View>

          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {renderOutfitPage()}
          </Animated.View>
        </ScrollView>

        {/* Page Indicators */}
        <View style={styles.pageIndicators}>
          <View style={[styles.dot, currentPage === 0 && styles.activeDot]} />
          <View style={[styles.dot, currentPage === 1 && styles.activeDot]} />
        </View>
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
  horizontalScroll: {
    flex: 1,
  },
  container: {
    width: width,
    paddingTop: StatusBar.currentHeight || 44,
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  page: {
    flex: 1,
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
  outfitCard: {
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
  outfitTitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  outfitSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "400",
    textAlign: "center",
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
  promptWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  promptInput: {
    minHeight: 80,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "400",
    textAlignVertical: "top",
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
  askButton: {
    backgroundColor: "rgba(138, 90, 150, 0.2)",
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(138, 90, 150, 0.3)",
  },
  askButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
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
  recommendationCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    flex: 1,
  },
  recommendationLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  recommendationScroll: {
    flex: 1,
  },
  recommendationText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "300",
    lineHeight: 24,
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
  pageIndicators: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
    width: 24,
    borderRadius: 4,
  },
});
