// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import auth from '@react-native-firebase/auth';

// export default function ResetPasswordPage({ navigation }) {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handlePasswordUpdate = async () => {
//     if (newPassword !== confirmPassword) {
//       Alert.alert("Passwords don't match");
//       return;
//     }

//     try {
//       const user = auth().currentUser;

//       if (!user) {
//         Alert.alert("You must be logged in to reset your password.");
//         return;
//       }

//       await user.updatePassword(newPassword);
//       Alert.alert("Success", "Your password has been updated.");
//       navigation.navigate("LoginPage"); // or wherever
//     } catch (error) {
//       console.error("Password update error:", error.code);
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create a New Password</Text>
//       <TextInput
//         placeholder="New Password"
//         secureTextEntry
//         value={newPassword}
//         onChangeText={setNewPassword}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Confirm New Password"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         style={styles.input}
//       />
//       <Button title="Update Password" onPress={handlePasswordUpdate} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'center' },
//   title: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
//   input: {
//     borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6,
//   },
// });
