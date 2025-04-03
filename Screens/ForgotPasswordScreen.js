// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
// import { auth } from '../firebase'; // ✅ your configured Firebase
// import { sendPasswordResetEmail } from 'firebase/auth';

// const ForgotPasswordScreen = () => {
//   const [email, setEmail] = useState('');

//   const handleSendResetEmail = async () => {
//     if (!email) {
//       Alert.alert("Input Required", "Please enter your email address.");
//       return;
//     }

//     try {
//       await sendPasswordResetEmail(auth, email);
//       Alert.alert(
//         "Password Reset Email Sent",
//         `We've sent a password reset link to:\n\n${email}\n\nPlease check your inbox.`
//       );
//     } catch (error) {
//       console.error("Password reset error:", error.code);
//       if (error.code === 'auth/user-not-found') {
//         Alert.alert("Error", "No account found with this email.");
//       } else {
//         Alert.alert("Error", error.message);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <Text style={styles.subtitle}>
//         Enter your registered email and we'll send you a reset link
//       </Text>

//       <TextInput
//         placeholder="Email address"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//         style={styles.input}
//       />

//       <Button title="Send Reset Email" onPress={handleSendResetEmail} />
//     </View>
//   );
// };

// export default ForgotPasswordScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     marginTop: 100,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#2F4236',
//   },
//   subtitle: {
//     fontSize: 14,
//     marginBottom: 20,
//     color: '#5d615d',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 6,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },
// });
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendResetEmail = async () => {
    if (!email) {
      Alert.alert("Input Required", "Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Password Reset Email Sent",
        `We've sent a password reset link to:\n\n${email}\n\nPlease check your inbox.`
      );
      navigation.goBack(); // ✅ Automatically return to previous screen
    } catch (error) {
      console.error("Password reset error:", error.code);
      if (error.code === 'auth/user-not-found') {
        Alert.alert("Error", "No account found with this email.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your registered email and we'll send you a reset link
      </Text>

      <TextInput
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <Button title="Send Reset Email" onPress={handleSendResetEmail} />

      {/* ✅ Cancel button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F4236',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#5d615d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  cancelBtn: {
    marginTop: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#9b2226',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
