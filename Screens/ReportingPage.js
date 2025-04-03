// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { auth } from "../firebase";

// const ReportingPage = ({ navigation }) => {
//   const [imageUri, setImageUri] = useState(null);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const fetchUser = () => {
//       const user = auth.currentUser;
//       if (user) {
//         setUserId(user.uid);
//         console.log("Logged-in user:", user.uid);
//       } else {
//         Alert.alert("Not Logged In", "Please log in first.");
//         navigation.navigate("LoginPage");
//       }
//     };

//     fetchUser();
//   }, [navigation]); // ✅ Ensures user authentication before proceeding

//   // 📷 Capture Image with Camera
//   const captureImage = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Denied", "Camera permission is required.");
//       return;
//     }

//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets?.length > 0) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   // ➡️ Proceed to Next Step with Image
//   const goToNextStep = () => {
//     if (!imageUri) {
//       Alert.alert("No Image Captured", "Please take a photo before proceeding.");
//       return;
//     }

//     navigation.navigate("SearchViolation", { imageUri }); // ✅ Passes image to next step
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Step 1: Capture a Violation</Text>

//       {/* 📷 Take Photo Button */}
//       <TouchableOpacity style={styles.button} onPress={captureImage}>
//         <Text style={styles.buttonText}>📷 Take a Photo</Text>
//       </TouchableOpacity>

//       {/* 🖼️ Display Selected Image */}
//       {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

//       {/* ➡️ Proceed to Next Step */}
//       <TouchableOpacity
//         style={[styles.button, styles.nextButton]}
//         onPress={goToNextStep}
//       >
//         <Text style={styles.buttonText}>➡️ Next Step</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // ✅ Ensure ONLY ONE `export default` statement exists
// export default ReportingPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#eff1ef",
//     padding: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#2F4236",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   button: {
//     width: "90%",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     backgroundColor: "#5A6E5B",
//     marginVertical: 10,
//   },
//   nextButton: {
//     backgroundColor: "#4A7C59",
//   },
//   buttonText: {
//     color: "#eff1ef",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: "cover",
//     borderRadius: 10,
//     marginVertical: 20,
//   },
// });
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const ReportingPage = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [userId, setUserId] = useState(null);

  const storage = getStorage();
  const firestore = getFirestore();

  useEffect(() => {
    const fetchUser = () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        console.log("Logged-in user:", user.uid);
      } else {
        Alert.alert("Not Logged In", "Please log in first.");
        navigation.navigate("LoginPage");
      }
    };

    fetchUser();
  }, [navigation]);

  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera permission is required.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const goToNextStep = async () => {
    if (!imageUri) {
      Alert.alert("No Image Captured", "Please take a photo before proceeding.");
      return;
    }

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const imageRef = ref(storage, `evidence/${userId}_${Date.now()}.jpg`);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      // Store image URL in user document
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { lastUploadedImage: downloadURL });

      // Pass image URL to next step
      navigation.navigate("SearchViolation", { imageUrl: downloadURL });
    } catch (error) {
      console.error("Image upload error:", error);
      Alert.alert("Upload Failed", "Could not upload image. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1: Capture a Violation</Text>

      <TouchableOpacity style={styles.button} onPress={captureImage}>
        <Text style={styles.buttonText}>📷 Take a Photo</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={goToNextStep}
      >
        <Text style={styles.buttonText}>➡️ Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff1ef",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F4236",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#5A6E5B",
    marginVertical: 10,
  },
  nextButton: {
    backgroundColor: "#4A7C59",
  },
  buttonText: {
    color: "#eff1ef",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 20,
  },
});