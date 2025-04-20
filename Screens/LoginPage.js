import React, { useState } from 'react';
import {
    View, Text, TextInput, Pressable, StyleSheet, Alert,
    TouchableOpacity, Image
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth, db, registerForPushNotificationsAsync } from "../firebase";

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Register User's Device for Notifications After Login
    const saveUserToken = async (uid) => {
        try {
            const pushToken = await registerForPushNotificationsAsync();
            if (pushToken) {
                await setDoc(doc(db, "users", uid), { expoPushToken: pushToken }, { merge: true });
                console.log("Expo Push Token saved:", pushToken);
            }
        } catch (error) {
            console.error("Error saving push token:", error);
        }
    };

    // Handle User Login
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User logged in:", user.email);

            // Register & Save Push Token in Firestore
            await saveUserToken(user.uid);

            Alert.alert("Success", "Login successful!");

            // Navigate to MainApp (Which contains CitizenDashboard)
            navigation.replace("MainApp");

        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert("Login Failed", "Invalid credentials. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            {/* Profile Icon Instead of Logo */}
            <Image source={require('../assets/profile-icon.png')} style={styles.profileIcon} />

            {/* Title */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            {/* Input Fields */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {/* Login Button */}
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            {/* Forgot Password */}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={{ color: '#5A6E5B', marginTop: 10 }}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Back to Home */}
            <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
                <Text style={styles.link}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    backText: {
        fontSize: 24,
        color: '#333',
    },
    profileIcon: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    inputWrapper: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#5A6E5B',
        width: '90%',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#5A6E5B',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    link: {
        fontSize: 14,
        color: '#3D3D3D',
        textDecorationLine: 'underline',
        marginTop: 20,
    },
});
