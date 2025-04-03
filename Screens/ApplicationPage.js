import React, { useState } from 'react';
import { 
    View, Text, TextInput, Pressable, StyleSheet, ScrollView, 
    Image, Alert, TouchableOpacity, Platform 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase'; // Firestore Import
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function ApplicationPage({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(new Date());
    const [address, setAddress] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmitApplication = async () => {
        if (!fullName || !email || !address || !municipality) {
            Alert.alert('Missing Fields', 'Please fill out all required fields.');
            return;
        }

        setSubmitting(true);

        try {
            await addDoc(collection(db, "applications"), {
                fullName,
                email,
                dob: dob.toISOString().split('T')[0], // Store as YYYY-MM-DD
                address,
                municipality,
                status: "pending",
                appliedAt: Timestamp.now(),
            });

            setSubmitting(false);
            Alert.alert('Application Submitted', 'Your application has been sent for review.');
            navigation.navigate('PendingApproval');

        } catch (error) {
            console.error("Error submitting application:", error);
            setSubmitting(false);
            Alert.alert('Submission Failed', 'Something went wrong. Please try again later.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button & Page Indicator */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Icon */}
            <Image source={require('../assets/profile-icon.png')} style={styles.profileIcon} />

            {/* Title */}
            <Text style={styles.title}>Application</Text>

            {/* Input Fields */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                    style={styles.input} 
                    value={fullName} 
                    onChangeText={setFullName} 
                    placeholder="Enter full name" 
                    placeholderTextColor="#666"
                />
            </View>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder="Enter email" 
                    keyboardType="email-address" 
                    autoCapitalize="none"
                    placeholderTextColor="#666"
                />
            </View>

            {/* Date of Birth Picker */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Date of Birth</Text>
                <Pressable style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateText}>{dob.toDateString()}</Text>
                </Pressable>
                {showDatePicker && (
                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) setDob(selectedDate);
                        }}
                    />
                )}
            </View>

            {/* Address */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Home Address</Text>
                <TextInput 
                    style={styles.input} 
                    value={address} 
                    onChangeText={setAddress} 
                    placeholder="Enter home address" 
                    placeholderTextColor="#666"
                />
            </View>

            {/* Municipality */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Municipality</Text>
                <TextInput 
                    style={styles.input} 
                    value={municipality} 
                    onChangeText={setMunicipality} 
                    placeholder="Enter municipality" 
                    placeholderTextColor="#666"
                />
            </View>

            {/* Submit Button */}
            <Pressable style={styles.button} onPress={handleSubmitApplication} disabled={submitting}>
                <Text style={styles.buttonText}>{submitting ? 'Submitting...' : 'Submit Application'}</Text>
            </Pressable>

            {/* Login Redirect */}
            <Pressable onPress={() => navigation.navigate('LoginPage')}>
                <Text style={styles.link}>Already have an account? Log in here</Text>
            </Pressable>

            {/* Footer Image */}
            <Image source={require('../assets/new-footer-image.png')} style={styles.footerImage} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 50, // Move everything slightly down
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    backButton: {
        fontSize: 24,
        color: '#000',
    },
    pageIndicator: {
        fontSize: 14,
        color: '#555',
    },
    profileIcon: {
        width: 80,
        height: 80,
        marginBottom: 15, // Better spacing
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15, // Improved spacing
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
    datePicker: {
        width: '100%',
        backgroundColor: '#E5E5E5',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#7A947B',
        width: '90%',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
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
    link: {
        fontSize: 14,
        color: '#3D3D3D',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    footerImage: {
        width: '150%', // Ensures full width
        height: 210, // Increased height for better visibility
        resizeMode: 'cover', // Fills width without distortion
    },
});
