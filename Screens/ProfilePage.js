// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function ProfilePage() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>My Profile</Text>
//             <Text style={styles.subtitle}>Manage your profile and account settings here.</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#eff1ef',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#3d3f3d',
//         marginBottom: 10,
//     },
//     subtitle: {
//         fontSize: 14,
//         color: '#808580',
//         textAlign: 'center',
//     },
// });
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebase';

export default function ProfilePage({ navigation }) {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace("AuthStack");
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.subtitle}>Manage your profile and account settings here.</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || "Not available"}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MyReportsPage")}
      >
        <Text style={styles.buttonText}>View My Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff1ef',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2F4236',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#5d615d',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    color: '#5d615d',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#2F4236',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4A7C59',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#eff1ef',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#9b2226',
  },
});
