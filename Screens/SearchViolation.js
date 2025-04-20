
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { searchViolations } from "../api";
import { Ionicons } from "@expo/vector-icons";

const SearchViolation = ({ navigation, route }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [expandedViolation, setExpandedViolation] = useState(null);
  const [error, setError] = useState(null);

  const imageUrl = route.params?.imageUrl; // ✅ get image URL from previous step

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async () => {
    try {
      const data = await searchViolations(query);
      setResults(data);
      setError(null);
    } catch (err) {
      setError("Unable to fetch results. Please try again later.");
    }
  };

  const toggleExpand = (violation) => {
    setExpandedViolation(expandedViolation === violation ? null : violation);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#3d3f3d" />
      </Pressable>

      <Text style={styles.stepTitle}>Step 2</Text>

      <Text style={styles.label}>Describe the Violation</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a keyword (e.g., Parking)"
        value={query}
        onChangeText={setQuery}
      />

      <Text style={styles.sectionTitle}>Suggested Violations</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() =>
          query.length > 1 && results.length === 0 ? (
            <Text style={styles.noResults}>No violations found.</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.resultCard,
              expandedViolation?.title === item.title && styles.expandedCard,
            ]}
            onPress={() => toggleExpand(item)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Ionicons
                name={
                  expandedViolation?.title === item.title
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={24}
                color="#3d3f3d"
              />
            </View>
            {expandedViolation?.title === item.title && (
              <View style={styles.cardDetails}>
                <Text style={styles.cardSummary}>{item.summary}</Text>
                <Text style={styles.cardCode}>Code: {item.citation}</Text>
                <Pressable
                  style={styles.nextButton}
                  onPress={() =>
                    navigation.navigate("AdditionalDetailsPage", {
                      violation: item,
                      imageUrl, // pass image URL to the next step
                    })
                  }
                >
                  <Text style={styles.nextButtonText}>NEXT STEP</Text>
                </Pressable>
              </View>
            )}
          </Pressable>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default SearchViolation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#eff1ef",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 50,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3d3f3d",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3d3f3d",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#a5aba5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3d3f3d",
    marginVertical: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
  noResults: {
    textAlign: "center",
    color: "#7a947b",
    fontSize: 14,
    marginVertical: 10,
  },
  resultCard: {
    backgroundColor: "#cbd2cb",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  expandedCard: {
    backgroundColor: "#9bbb9c",
    borderWidth: 1.5,
    borderColor: "#5A6E5B",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3d3f3d",
  },
  cardDetails: {
    marginTop: 10,
  },
  cardCode: {
    fontSize: 14,
    color: "#5d615d",
    marginTop: 5,
    fontWeight: "bold",
  },
  cardSummary: {
    fontSize: 14,
    color: "#5d615d",
    marginTop: 5,
    fontStyle: "italic",
  },
  nextButton: {
    backgroundColor: "#5A6E5B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  nextButtonText: {
    color: "#eff1ef",
    fontSize: 14,
    fontWeight: "bold",
  },
});
