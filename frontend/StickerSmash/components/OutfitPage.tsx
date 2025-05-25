import React from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "./Header";
import { sharedStyles, outfitStyles } from "./styles";

interface OutfitPageProps {
  outfitPrompt: string;
  setOutfitPrompt: (prompt: string) => void;
  outfitRecommendation: string;
  isGettingOutfit: boolean;
  onOutfitRequest: () => void;
}

export const OutfitPage: React.FC<OutfitPageProps> = ({
  outfitPrompt,
  setOutfitPrompt,
  outfitRecommendation,
  isGettingOutfit,
  onOutfitRequest,
}) => {
  return (
    <View style={sharedStyles.page}>
      <Header time="👕" date="Outfit Recommendations" />

      <View style={sharedStyles.mainContent}>
        <View style={outfitStyles.outfitCard}>
          <LinearGradient
            colors={["rgba(138, 90, 150, 0.1)", "rgba(74, 20, 140, 0.05)"]}
            style={sharedStyles.cardGradient}
          >
            <Text style={outfitStyles.outfitTitle}>What to Wear</Text>
            <Text style={outfitStyles.outfitSubtext}>
              Get AI-powered outfit recommendations for your sunset adventure
            </Text>
          </LinearGradient>
        </View>

        {/* Prompt Input */}
        <View style={sharedStyles.inputSection}>
          <Text style={sharedStyles.inputLabel}>Ask for Recommendations</Text>
          <View style={outfitStyles.promptWrapper}>
            <TextInput
              style={outfitStyles.promptInput}
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
              outfitStyles.askButton,
              (!outfitPrompt.trim() || isGettingOutfit) && sharedStyles.searchButtonDisabled,
            ]}
            onPress={onOutfitRequest}
            disabled={isGettingOutfit || !outfitPrompt.trim()}
          >
            {isGettingOutfit ? (
              <Animated.View style={sharedStyles.loadingSpinner} />
            ) : (
              <Text style={outfitStyles.askButtonText}>Ask ChatGPT</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Recommendation Display */}
        {outfitRecommendation ? (
          <View style={outfitStyles.recommendationCard}>
            <Text style={outfitStyles.recommendationLabel}>Recommendation</Text>
            <ScrollView style={outfitStyles.recommendationScroll} showsVerticalScrollIndicator={false}>
              <Text style={outfitStyles.recommendationText}>{outfitRecommendation}</Text>
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  );
}; 