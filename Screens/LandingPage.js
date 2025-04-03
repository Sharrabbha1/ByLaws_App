import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

export default function LandingPage({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Municipal By-Law Reporting</Text>
                <Text style={styles.subtitle}>By-Law Enforcement App</Text>

                <Pressable
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.navigate('LoginPage')}
                >
                    <Text style={styles.buttonText}>LOG IN</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.applyButton]}
                    onPress={() => navigation.navigate('ApplicationPage')}
                >
                    <Text style={styles.buttonText}>APPLY NOW</Text>
                </Pressable>

                <Pressable>
                    <Text style={styles.link}>Terms and Conditions</Text>
                </Pressable>
            </View>

            <Image
                source={require('../assets/footer-image.png')} // Ensure the correct path
                style={styles.footerImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    content: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 50, // Moves content down slightly
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#4B4B4B',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        width: 220, // Wider buttons
        height: 55, // Slightly taller buttons
        borderRadius: 30, 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: '#3D3D3D',
    },
    applyButton: {
        backgroundColor: '#7A947B',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        fontSize: 14,
        color: '#3D3D3D',
        textDecorationLine: 'underline',
        marginTop: 20,
    },
    footerImage: {
        width: '120%', // Ensures full width
        height: 210, // Increased height for better visibility
        resizeMode: 'cover', // Fills width without distortion
        position: 'absolute',
        bottom: 0,
    },
});
