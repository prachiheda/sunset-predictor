import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SunsetPage, OutfitPage, PageIndicators, sharedStyles } from "../components";

const { width } = Dimensions.get("window");

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

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={sharedStyles.gradient}
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
          style={sharedStyles.horizontalScroll}
        >
          <Animated.View
            style={[
              sharedStyles.container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <SunsetPage
              location={location}
              setLocation={setLocation}
              isLoading={isLoading}
              onSearch={handleSearch}
            />
          </Animated.View>

          <Animated.View
            style={[
              sharedStyles.container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <OutfitPage
              outfitPrompt={outfitPrompt}
              setOutfitPrompt={setOutfitPrompt}
              outfitRecommendation={outfitRecommendation}
              isGettingOutfit={isGettingOutfit}
              onOutfitRequest={handleOutfitRequest}
            />
          </Animated.View>
        </ScrollView>

        <PageIndicators currentPage={currentPage} totalPages={2} />
      </LinearGradient>
    </>
  );
}
