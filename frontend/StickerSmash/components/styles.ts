import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export const sharedStyles = StyleSheet.create({
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
  cardGradient: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
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

export const sunsetStyles = StyleSheet.create({
  sunsetCard: {
    marginBottom: 32,
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

export const outfitStyles = StyleSheet.create({
  outfitCard: {
    marginBottom: 32,
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
}); 