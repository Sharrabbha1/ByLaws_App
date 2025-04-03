import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function AdditionalDetailsPage({ route, navigation }) {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [timeOfViolation, setTimeOfViolation] = useState('');

  // Get violation details from previous page
  const violation = route.params?.violation || { title: "Unknown Violation" };

  // ✅ Handle Report Submission
  const handleSubmit = async () => {
    if (!licensePlate || !vehicleDetails || !timeOfViolation) {
      Alert.alert("Missing Details", "Please fill out all fields before submitting.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "You must be logged in to submit a report.");
      console.error("🚨 User not authenticated.");
      return;
    }

    const newReport = {
      violationType: violation.title,
      status: "Pending",
      licensePlate,
      vehicleDetails,
      timeOfViolation,
      userId: user.uid, // ✅ Store user ID for filtering
      timestamp: new Date().toISOString()
    };

    try {
      const firestore = getFirestore();
      await addDoc(collection(firestore, "reports"), newReport);
      console.log("✅ Report submitted:", newReport);

      Alert.alert("Success", "Your report has been submitted!");
      navigation.navigate("MyReportsPage"); // ✅ Navigate to MyReportsPage
    } catch (error) {
      console.error("🔥 Error submitting report:", error);
      Alert.alert("Error", "Failed to submit the report.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#3d3f3d" />
      </Pressable>

      {/* Page Title */}
      <Text style={styles.title}>Step 3: Provide Additional Details</Text>
      <Text style={styles.subtitle}>{violation.title}</Text>

      {/* License Plate */}
      <Text style={styles.label}>License Plate Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter license plate"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />

      {/* Vehicle Details */}
      <Text style={styles.label}>Vehicle Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter vehicle details (e.g., Color, Make, Model)"
        value={vehicleDetails}
        onChangeText={setVehicleDetails}
      />

      {/* Time of Violation */}
      <Text style={styles.label}>Time of Violation</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter time (e.g., 2:30 PM)"
        value={timeOfViolation}
        onChangeText={setTimeOfViolation}
      />

      {/* Submit Button */}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#eff1ef' },
  backButton: { position: "absolute", top: 20, left: 15, zIndex: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3d3f3d', textAlign: "center" },
  subtitle: { fontSize: 18, color: '#5d615d', marginBottom: 15, textAlign: "center", fontStyle: "italic" },
  label: { fontSize: 16, fontWeight: "bold", color: "#3d3f3d", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#a5aba5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff"
  },
  button: { backgroundColor: '#5A6E5B', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#eff1ef', fontSize: 16, fontWeight: "bold" },
});
